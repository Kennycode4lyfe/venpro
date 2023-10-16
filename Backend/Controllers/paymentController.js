const axios = require('axios'); // For making HTTP requests to Paystack
const { cartProducts, orders, users } = require('../models');
const Cart = require('../models/index').Cart;
require("dotenv").config()

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;



async function initializePayment(req, res, token) {
    try {
        const user_id = token._id;
        const user = await users.findOne({ where: { id: user_id } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userOrder = await orders.findOne({
            where: { user_id, status: 'processing' }
        });

        if (!userOrder) {
            return res.status(404).json({ error: "Order not found or not in 'processing' status" });
        }

        const orderTrackingNumber = userOrder.tracking_number;
        const orderAmount = userOrder.total_price * 100; // Amount in kobo

        // Replace with your actual Paystack secret key
        const PAYSTACK_SECRET_KEY = PAYSTACK_SECRET_KEY;

        const paystackResponse = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email: user.email,
                amount: orderAmount,
                callback_url: 'https://yourdomain.com/paystack/callback',
                reference: orderTrackingNumber,
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        res.json(paystackResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initialize payment' });
    }
}




async function verifyPayment(req, res, token) {
    try {
        const user_id = token._id;
        const userEmail = token.email;

        // Retrieve the reference from the query parameters
        const reference = req.query.reference;

        if (!reference) {
            return res.status(400).json({ error: 'Missing reference in query parameters' });
        }

        // Make a GET request to verify the payment
        const verificationResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });

        const verificationData = verificationResponse.data.data;

        if (verificationData.status === 'success') {
            // Payment is successful, you can update your order status or take other actions
            // Example: Update the user's cart and cart products
            const userCart = await Cart.findOne({ where: { user_id: user_id } });

            if (userCart) {
                await cartProducts.destroy({ where: { CartId: userCart.id } });
                await userCart.update({ total: 0 });
            }

            return res.json(verificationData);
        } else {
            // Payment verification failed, handle accordingly
            return res.status(400).json({ error: 'Payment verification failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to verify payment' });
    }
}


module.exports = {initializePayment,
verifyPayment}