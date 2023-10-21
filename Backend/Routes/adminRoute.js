const express = require('express');
const adminRouter = express.Router();
const userController = require('../Controllers/userController');
const { isUserAdmin } = require('../middleware/isUserAdmin');
const passport = require('passport');
const { users } = require('../models');

adminRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    
    isUserAdmin(req,res,user)

  })(req, res, next);
});

module.exports = adminRouter;
