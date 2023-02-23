const express = require("express");
const userController = require("../Controllers/userController");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mail = require("../middleware/mail");
const userRouter = express.Router();
const multer = require('multer')
const upload = multer({ dest:"../public/uploads" })



userRouter.post("/signup",passport.authenticate('signup', { session: false }), userController.signup, mail);
userRouter.post('/login', async (req, res, next) => passport.authenticate('login', (err, user, info) => {
    userController.login(req, res, { err, user, info})
})(req, res, next))
userRouter.get("/", userController.getAllUsers);
userRouter.get("/index/:id", userController.getUserById);
userRouter.get("/:index", userController.verifyUser);
userRouter.get("/index", userController.changePassword)
userRouter.post("/index/profile-picture",passport.authenticate('jwt',{session:false}),upload.single('avatar'), userController.uploadImage)

module.exports = userRouter;
