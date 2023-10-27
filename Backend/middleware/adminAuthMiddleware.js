const passport = require('passport');

const handleAction = (action,authMethod) => async (req, res,next) => {
  passport.authenticate(authMethod, (err,user,info) => {
    action(req, res,{err,user,info});
  })(req, res,next);
};

module.exports = handleAction;
