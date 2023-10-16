const axios = require('axios'); // For making HTTP requests to Paystack
const { cartProducts } = require('../models');
const { Cart } = require('../models/cartModel');
// For generating unique transaction references

require("dotenv").config()
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;


async function initializePayment(req, res, token) {
    try {
        const user_id = token.user_id;
        const userEmail = token.email;

        // Retrieve the order for the user with status 'processing'
        const userOrder = await orders.findOne({ where: { user_id: user_id, status: 'processing' } });

        if (!userOrder) {
            return res.status(404).json({ error: "Order not found or not in 'processing' status" });
        }

        const orderTrackingNumber = userOrder.tracking_number;
        const orderAmount = userOrder.total_price * 100; // Amount in kobo

        // Replace with your actual Paystack secret key
        

        // Make a POST request to initialize the payment
        const paystackResponse = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email: userEmail,
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

        // Send the Paystack response to the frontend

        res.json(paystackResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initialize payment' });
    }
}


async function verifyPayment(req, res) {
    try {
        const user_id = token.user_id;
        const userEmail = token.email;
        const userCart  = Cart.findOne({where:{user_id:user_id}})

        // Replace with your actual Paystack secret key
        const PAYSTACK_SECRET_KEY = 'your_secret_key';

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

        const verificationData = verificationResponse.data;

        if (verificationData.status === 'success') {
            // Payment is successful, you can update your order status or take other actions
            // Example: Update the order status to 'completed'
            // const order = await Order.findOneAndUpdate({ reference: reference }, { status: 'completed' });
            await cartProducts.destroy({where:{CartId:userCart.id}})
            await userCart.update({total:0})
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