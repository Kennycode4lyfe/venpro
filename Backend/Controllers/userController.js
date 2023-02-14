const db = require('../models')
const ranString = require('randomstring')

const User = db.users


async function addUser(req,res,next){
const ref = ranString.generate(6)
userInfo = req.body
try{
const user = await User.create({...userInfo,ref})
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

    async function getUserById(req,res,next){
        const id =req.params.id
        
         try{
        const user = await User.findOne({where:{ref:id}})
        
         res.status(201).json(user)
         }
         catch(err){
             console.log(err)
             next(err)
         }
         }


         async function updateUser(req,res,next){
            const userEmail = req.body.email
            const updates = req.body
            
             try{
            const user = await User.update({where:{email:userEmail}})
            
             res.status(201).json(user)
             }
             catch(err){
                 console.log(err)
                 next(err)
             }
             }


         async function deleteUser(req,res,next){
            const userEmail = req.body.email
            
             try{
            const user = await User.destroy({where:{email:userEmail}})
            
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
    getUserById,
    deleteUser,
}