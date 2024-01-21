const express = require("express");
const pharmaController = require("../Controllers/pharmaController")
const productController = require("../Controllers/productController");
const actionHandler = require('../middleware/adminAuthMiddleware')

const passport = require('passport');
const pharmaRouter = express.Router();

pharmaRouter.post('/', actionHandler(pharmaController.createPharmacy,'jwt'))
pharmaRouter.delete('/', actionHandler(pharmaController.deletePharmacy,'jwt'))
pharmaRouter.put('/', actionHandler(pharmaController.updatePharmacy,'jwt'))
pharmaRouter.post('/product', actionHandler(productController.createProduct,'jwt'))
pharmaRouter.delete('/product', actionHandler(productController.deleteProduct,'jwt'))
pharmaRouter.put('/product', actionHandler(productController.updateProductQuantity,'jwt'))





// pharmaRouter.post('/', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
//     pharmaController.createPharmacy(req, res, token)
// })(req, res, next))



// pharmaRouter.delete('/', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
//     pharmaController.deletePharmacy(req, res, token)
// })(req, res, next))

// pharmaRouter.put('/', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
//     pharmaController.updatePharmacy(req, res, token)
// })(req, res, next))

// pharmaRouter.get('/',pharmaController.getAllPharmacies)

// // pharmaRouter.post('/product', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
// //     pharmaController.addProducts(req, res, token)
// // })(req, res, next))

// // pharmaRouter.post('/product', productController.createProduct)
// pharmaRouter.post('/product', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
//     productController.createProduct(req, res, token)
// })(req, res, next))

// // pharmaRouter.get('/product', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
// //     pharmaController.getProducts(req, res, token)
// // })(req, res, next))

// pharmaRouter.delete('/product', async (req, res, next) => passport.authenticate('jwt', (err, token) => {
//     pharmaController.deleteProducts(req, res, token)
// })(req, res, next))

module.exports = pharmaRouter