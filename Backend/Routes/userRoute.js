const express = require('express');
const userController = require('../Controllers/userController');
const mail = require('../middleware/mail')
const userRouter = express.Router()


userRouter.post('/',mail, userController.addUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/index/:id',userController.getUserById)

module.exports = userRouter