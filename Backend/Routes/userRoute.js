const express = require('express');
const userController = require('../Controllers/userController');

const userRouter = express.Router()

userRouter.post('/', userController.addUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/email',userController.getUserByEmail)

module.exports = userRouter