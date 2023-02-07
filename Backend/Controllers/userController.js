const db = require('../models')

const User = db.users

async function addUser(req,res,next){
userInfo = req.body
try{
const user = await User.create(userInfo)
res.status(201).json(user)
}
catch(err){
    console.log(err)
    next(err)
}
}

async function getAllUsers(req,res,next){
   const userInfo = req.body
    try{
    const users = await User.findAll({attributes:['first_name','email']})
    res.status(201).json(users)
    }
    catch(err){
        console.log(err)
        next(err)
    }
    }

    async function getUserByEmail(req,res,next){
        const userEmail = req.body.email
        // `${userEmail}`
         try{
        const user = await User.findOne({where:{email:userEmail}})
        // const users = await User.findAll()
         res.status(201).json(user)
         }
         catch(err){
             console.log(err)
             next(err)
         }
         }




module.exports ={
    addUser,
    getAllUsers,
    getUserByEmail
}