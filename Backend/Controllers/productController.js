const db = require("../models/index");
const User = db.users;
const drug_class = db.drugClass
const product = db.products


// async function createProduct(req,res){
// const productPayload = req.body
// console.log(productPayload)
// await product.create(productPayload)
// .then(async(product)=>{
//     drug_class.findOrCreate(
//         {where:{name: productPayload.drugClass }
// })
// .then(([drugClass])=>{
// product.setDrug_class(drugClass.id)
// })
// }).catch(err =>{
//     console.log("Error", err)
// })
// }

async function createProduct(req, res) {
    const productPayload = req.body;
    console.log(productPayload);
  
    try {
      const createdProduct = await product.create(productPayload);
  
      const [drugClass] = await drug_class.findOrCreate({
        where: { name: productPayload.drugClass },
      });
  
      // Associate the product with the drug class
      await createdProduct.setDrug_class(drugClass);
  
      res.status(201).json(createdProduct);
    } catch (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Product creation failed" });
    }
  }

  async function deleteProduct(req, res) {
    const productId = req.params.productId; // Assuming you get the product ID from the request parameters
  
    try {
      // Attempt to find and delete the product
      const deletedProduct = await db.products.destroy({
        where: { id: productId },
      });
  
      if (deletedProduct) {
        // The product was successfully deleted
        res.status(204).send(); // Respond with a 204 No Content status
      } else {
        // If no product was deleted, it might not exist
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Product deletion failed" });
    }
  }


  async function updateProductQuantity(req, res) { 
  const productId = req.params.productId; // Assuming you receive the product ID as a route parameter
  const newQuantity = req.body.newQuantity; // Assuming you receive the new quantity to update

  try {
    // Find the product by ID
    const product = await db.products.findByPk(productId);

    if (!product) {
      // If the product doesn't exist, respond with a 404 Not Found
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product's quantity
    product.quantity = newQuantity;

    // Save the updated product to the database
    await product.save();

    // Respond with the updated product
    res.status(200).json(product);
  } catch (error) {
    // Handle any errors that occur during the update
    console.error("Error updating product quantity:", error);
    res.status(500).json({ error: "Product quantity update failed" });
  }
}

  
  


module.exports = {createProduct,
                   deleteProduct,
                updateProductQuantity}

