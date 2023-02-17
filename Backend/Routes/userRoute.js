const express = require('express');
const userController = require('../Controllers/userController');
const mail = require('../middleware/mail')
const userRouter = express.Router()


userRouter.post('/', userController.addUser, mail)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/index/:id',userController.getUserById)
userRouter.get('/:index',userController.verifyUser)

module.exports = userRouter