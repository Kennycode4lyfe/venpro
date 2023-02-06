const express = require('express');
const userController = require('../Controllers/userController');

const userRouter = express.Router()

userRouter.post('/', userController.addUser)

module.exports = userRouter