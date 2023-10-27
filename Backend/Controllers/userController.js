const db = require("../models");
const ranString = require("randomstring");
const fs = require("fs")
const cloudinary = require('cloudinary').v2
const User = db.users;
const bcrypt = require('bcrypt')
const wallet = db.wallet
const jwt = require('jsonwebtoken');
require('dotenv').config

cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})




async function signup(req, res) {
  const ref = ranString.generate(10);
  console.log(req.user)
  const user = await User.findOne({where:{username: req.user.username}})
  console.log(req.user)
  const passedUserDetails = req.user

  try {
   const updatedUser = await User.update({ref:ref,role:req.body.role},{where:{
     username:user.username 
    }})
    passedUserDetails.ref = updateUser.ref
    delete passedUserDetails.password
    console.log(passedUserDetails)
    res.status(201).json(passedUserDetails);
  } catch (err) {
    console.log(err);
  }

}


  async function login(req, res, {err,user,info}) {
    console.log(req.user)
    try {
      if (err) {
          return next(err);
      }
      if (!user) {
          const error = new Error('Username or password is incorrect');
          return next(error);
      }

      req.login(user, { session: false },
          async (error) => {
              if (error) return next(error);

              const body = { id: user.id, username: user.username };
              //You store the id and username in the payload of the JWT. 
              // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
              // DO NOT STORE PASSWORDS IN THE JWT!
              const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

              return res.json({ token });
          }
      );
  } catch (error) {
      return next(error);
  }
  }


  async function getUser(req, res,token) {
    try {
      const userDetails = await db.users.findOne({where:{username:token.username},attributes:{exclude:['password']}});
      res.status(201).json(userDetails);
    } catch (err) {
      console.log(err);
      // next(err);
    }
  }

async function getAllUsers(req, res,token) {
  console.log(token)
  console.log(token)
  try {
    const users = await db.users.findAll();
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    // next(err);
  }
}

async function getUserById(req, res, next) {
  const id = req.params.id;

  try {
    const user = await User.findOne({ where: { ref: id } });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateUser(req, res,token) {
  
  const updates = req.body;

  try {
    console.log(token.username)    
    const user = await User.update(updates, { where: { username: token.username } });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const userEmail = req.body.email;
  try {
    const user = await User.destroy({ where: { email: userEmail } });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function verifyUser(req, res, next) {
  const userRef = req.params.index;
  console.log(userRef)
  try {
    if(!userRef){
        return res.send('invalid link')
      }
    const user = await User.update(
      { email_verified: true },
      { where: { ref: userRef } }
    );

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    next(err);
  }
}


async function changePassword(req, res, token) {
  const username = token.username; // Assuming the username is stored in the token
  const newPassword = req.body.new_password;
  const confirmPassword = req.body.confirm_password;

  try {
      // Find the user by their username
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
          return res.status(404).send('User does not exist');
      }

      if (newPassword !== confirmPassword) {
          return res.status(400).send('Passwords do not match');
      }

      // Hash the new password before updating it in the database
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await user.update({ password: newHashedPassword });

      return res.status(200).send('Password changed successfully');
  } catch (err) {
      console.error(err);
      return res.status(500).send('An error occurred while changing the password');
  }
}





  async function uploadImage(req, res, token) {
    const userProfile = token.username
    // console.log(req.file)
    const filePath = req.file.path
    try{
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath,{
      folder:"venpro",
      public_id: userProfile
    })

    fs.unlink(filePath,(err)=>{
      if(err) return
    })

    await User.update({image:cloudinaryResponse.url},{where:{
      username:userProfile
    }})
    return res.status(200).json({
      message:'File uploaded successfully',
      status:true,
      url: cloudinaryResponse.url
    })
  }
  catch(err){
    next(err)
  }
  }

module.exports = {
  signup,
  login,
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser,
  changePassword,
  uploadImage
};
