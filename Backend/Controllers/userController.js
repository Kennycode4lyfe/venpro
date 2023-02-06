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


module.exports ={
    addUser
}