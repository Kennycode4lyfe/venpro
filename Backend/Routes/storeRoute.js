const express = require("express");
const storeController = require("../Controllers/stroreController")



const passport = require('passport');
const storeRouter = express.Router();


storeRouter.post('/:productID/:quantity', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
    storeController.buyProducts(req, res, token,)
})(req, res, next))




module.exports = storeRouter
