const express = require('express');
const userController = require('../Controllers/userController');

const userRouter = express.Router()

userRouter.post('/', userController.addUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/index/:id',userController.getUserById)

module.exports = userRouter