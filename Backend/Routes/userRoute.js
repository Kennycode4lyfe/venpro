const express = require("express");
const userController = require("../Controllers/userController");
const passport = require("passport");
const mail = require("../middleware/mail");
const userRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "../public/uploads" });
const actionHandler = require("../middleware/adminAuthMiddleware");

userRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  userController.signup
  // mail
);

userRouter.post("/login", actionHandler(userController.login, "login"));
userRouter.get("/profile", actionHandler(userController.getUser, "jwt"));
userRouter.put(
  "/profile/update",
  actionHandler(userController.updateUser, "jwt")
);
userRouter.put(
  "/profile/change-password",
  actionHandler(userController.changePassword, "jwt")
);

// userRouter.get("/:index", userController.verifyUser);
// userRouter.post('/index/profile-picture',upload.single('avatar'), async (req, res,next) => passport.authenticate('jwt', (err, token) => {
//     userController.uploadImage(req, res, token)
// })(req, res,next))

module.exports = userRouter;
