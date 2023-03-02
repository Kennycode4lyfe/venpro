const express = require("express");
const pharmaController = require("../Controllers/pharmaController");
const passport = require('passport');
const pharmaRouter = express.Router();


pharmaRouter.post('/pharmacy', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
    pharmaController.createPharmacy(req, res, token)
})(req, res, next))


module.exports = pharmaRouter