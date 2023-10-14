const { Op } = require('sequelize');
const db = require('../models/index')
const sequelize = db.sequelize

const cart = db.Cart
const Cart_products = db.cartProducts
const products = db.products
const orders = db.orders
const OrderProducts = db.orderProducts

// async function buyProducts(req, res, token) {
//     const productID = req.params.productID;
//     const userID = token._id;
//     const quantityToBuy = req.params.quantity;
//     try {
//         const stockProduct = await products.findOne({ where: { id: productID } });
 
//         if (!stockProduct || stockProduct.quantity < quantityToBuy) {
//             res.status(400).send({ "error": "Product is out of stock or does not exist" });
//             return;
//         }
 
//         const userCart = await cart.findOne({ where: { user_id: userID } });
 
//         const updatedPriceTotal = userCart.total + (stockProduct.drug_price * quantityToBuy);
 
//         const t = await sequelize.transaction();
//         try {
//             const userCartProducts = await Cart_products.findOrCreate({
//                 where: { CartId: userCart.id, ProductId: productID },
//                 defaults: { quantity: quantityToBuy },
//                 transaction: t
//             }
//             );
 
//             await userCart.update({ total: updatedPriceTotal }, { transaction: t });
//             await t.commit();
 
//             res.status(200).send({ "message": "Product purchased successfully" });
//         } catch (err) {
//             await t.rollback();
//             console.log({ "error": err });
//             res.status(500).send({ "error": "An error occurred" });
//         }
//     } catch (err) {
//         console.log({ "error": err });
//         res.status(500).send({ "error": "An error occurred" });
//     }
//  }



async function buyProducts(req, res, token) {
    const productID = req.params.productID;
    const userID = token._id;
    const quantityToBuy = parseInt(req.params.quantity); // Parse the quantity as an integer.

    try {
        const stockProduct = await products.findOne({ where: { id: productID, quantity: { [Op.gte]: quantityToBuy } } });
        const stockProductAvailable = stockProduct.quantity - stockProduct.reserved_quantity
        const isStockProductAvailable = stockProductAvailable > quantityToBuy
        if (!(stockProduct && isStockProductAvailable)) {
            res.status(404).send({ error: "Product not found or out of stock" });
            return;
        }

        const userCart = await cart.findOne({ where: { user_id: userID } });
        const updatedPriceTotal = userCart.total + (stockProduct.drug_price * quantityToBuy);

        const t = await sequelize.transaction();

        try {
            let userCartProducts = await Cart_products.findOne({
                where: { CartId: userCart.id, ProductId: productID },
                transaction: t,
            });

            if (!userCartProducts) {
                // If the product isn't in the cart, create a new entry with the provided quantity.
                userCartProducts = await Cart_products.create({
                    CartId: userCart.id,
                    ProductId: productID,
                    quantity: quantityToBuy,
                }, { transaction: t });
            } else {
                // If the product is already in the cart, update the quantity.
                const newQuantity = userCartProducts.quantity + quantityToBuy;
                await userCartProducts.update({ quantity: newQuantity }, { transaction: t });
            }

             // Update the reserved quantity in the product table.
             const newReservedQuantity = stockProduct.reserved_quantity + quantityToBuy;
             await stockProduct.update({ reserved_quantity: newReservedQuantity }, { transaction: t });
 

            await userCart.update({ total: updatedPriceTotal }, { transaction: t });
            await t.commit();

            res.status(200).send({ message: "Product purchased successfully" });
        } catch (err) {
            await t.rollback();
            console.log({ error: err });
            res.status(500).send({ error: "Transaction failed" });
        }
    } catch (err) {
        console.log({ error: err });
        res.status(500).send({ error: "An error occurred" });
    }
}




async function transferCartToOrder(req,res,token) {
    const userId = token._id
    const userCart =  await cart.findOne({where:{user_id:userId}})
    
    if (!userCart) {
        throw new Errors("User's cart not found.");
    }

    const orderPayLoad = req.body
    try {
        
        const userOrder = await orders.create({ user_id: userId, cart_id: userCart.id,total_price:userCart.total });


    

        // Find all products in the user's cart.
        const cartProducts = await Cart_products.findAll({ where: { CartId: userCart.id } });

        // Iterate through the products in the cart and create records in the order.
        for (const cartProduct of cartProducts) {
            const { ProductId, quantity } = cartProduct;
            console.log(cartProduct)
            console.log(userOrder.id)
            // Create a new record in the OrderProducts table.
            await OrderProducts.create({
                OrderId: userOrder.id,
                ProductId,
                quantity,
            });

           
        }

        
    } catch (error) {
        console.log({ error });
        throw new Error("Failed to transfer products from cart to order.");
    }
}




module.exports = {buyProducts,
transferCartToOrder}