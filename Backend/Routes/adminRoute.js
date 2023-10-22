const express = require('express');
const adminRouter = express.Router();
const adminController = require('../Controllers/adminController')
const handleAdminAction = require("../middleware/adminAuthMiddleware")


adminRouter.post('/login', handleAdminAction(adminController.adminLogin,'login'))

adminRouter.get('/users', handleAdminAction(adminController.getAllUsers,'jwt'))

adminRouter.get('/user/:id', handleAdminAction(adminController.getAllUsers,'jwt'))

adminRouter.put('/user/:id', handleAdminAction(adminController.updateUser,'jwt'))

adminRouter.delete('/user', handleAdminAction(adminController.deleteUser,'jwt'))



module.exports = adminRouter;




