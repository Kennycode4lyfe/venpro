const passport = require('passport');

const handleAction = (action,authMethod) => async (req, res) => {
  passport.authenticate(authMethod, (err,user,info) => {
    action(req, res, user);
  })(req, res);
};

module.exports = handleAction;
