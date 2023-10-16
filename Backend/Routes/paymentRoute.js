const express = require("express");
const paymentController = require("../Controllers/paymentController")



const passport = require('passport');
const paymentRouter = express.Router();

paymentRouter.post('/initialize', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
    paymentController.initializePayment(req, res, token,)
})(req, res, next))

paymentRouter.get('/verify', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
    paymentController.verifyPayment(req, res, token,)
})(req, res, next))


module.exports = paymentRouter