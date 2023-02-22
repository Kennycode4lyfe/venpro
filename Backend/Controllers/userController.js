const db = require("../models");
const ranString = require("randomstring");
const fs = require("fs")
const cloudinary = require('cloudinary').v2

require('dotenv').config

cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})


const User = db.users;

async function signup(req, res, next) {
  const ref = ranString.generate(10);
  const user = await User.findOne({where:{username: req.user.username}})
  const passedUserDetails = req.user

  try {
   const updatedUser = await User.update({ref:ref},{where:{
     username:user.username 
    }})
    passedUserDetails.ref = updateUser.ref
    delete passedUserDetails.password
    console.log(passedUserDetails)
    res.status(201).json(passedUserDetails);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  const userInfo = req.body;
  try {
    const users = await User.findAll({ attributes: ["first_name", "email"] });
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    next(err);
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

async function updateUser(req, res, next) {
  const userEmail = req.body.email;
  const updates = req.body;

  try {
    const user = await User.update({ where: { email: userEmail } });

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

async function changePassword(req, res, next) {
    const userEmail = req.body.email;
    try {
      const user = await User.findOne(
        { where: { email: userEmail } }
      );
      if(user.email_verified===false){
        return res.send('Email not verified')
      }
      
      res.redirect("/home");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async function uploadImage(req, res, next) {
    console.log(req.file)
    const filePath = req.file.path
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath)

    fs.unlink(filePath,(err)=>{
      if(err) return
    })
    return res.status(200).json({
      message:'File uploaded successfully',
      status:true,
      url: cloudinaryResponse.url
    })
  }

module.exports = {
  signup,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser,
  changePassword,
  uploadImage
};
