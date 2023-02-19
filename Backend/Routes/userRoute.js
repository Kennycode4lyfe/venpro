const express = require("express");
const userController = require("../Controllers/userController");
const mail = require("../middleware/mail");
const userRouter = express.Router();
const multer = require('multer')
const upload = multer({ dest:"../public/uploads" })

userRouter.post("/", userController.addUser, mail);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/index/:id", userController.getUserById);
userRouter.get("/:index", userController.verifyUser);
userRouter.get("/index", userController.changePassword)
userRouter.post("/index/profile-picture",upload.single('avatar'), userController.uploadImage)

module.exports = userRouter;
