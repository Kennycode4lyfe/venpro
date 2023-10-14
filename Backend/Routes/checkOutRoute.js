const express = require("express");
const storeController = require("../Controllers/stroreController")



const passport = require('passport');
const checkOutRouter = express.Router();

checkOutRouter.post('/', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
    storeController.transferCartToOrder(req, res, token,)
})(req, res, next))


module.exports = checkOutRouter