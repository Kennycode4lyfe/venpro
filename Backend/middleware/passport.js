const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/index').users
const walletModel = require('../models/index').wallet
const cartModel = require('../models/index').Cart
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET || 'something_secret',
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
        },
        async (token, done) => {
            try {
                console.log(token.user)
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);


// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req,username,password,done) => {
            try {
                console.log(req.body)
               let first_name = req.body.first_name
              let  last_name = req.body.last_name
              let  email = req.body.email
                const user = await UserModel.create({ first_name,last_name, username, password,email }
            ).then(async(user)=>{
                console.log(user)
                await walletModel.create({user_id:user.id})
                await cartModel.create({user_id:user.id})
            })
                return done(null, user, { message: 'User created successfully'});
            } catch (error) {
                console.log(error)
                done(error);
            }
        }
    )
);

// This middleware authenticates the user based on the username and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await UserModel.findOne({where:{username:username} });
                // console.log(user)

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);
                // console.log(validate)
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);


