const db = require("../models");
const User = db.users;
const cart = db.Cart

async function getCartById(req,res){
    try{
        await cart.find({where:{user_id:req.user.id}})
        .then(cart=>{res.status(200).json({cart})})
    }catch(error){
        console.log(error)
    }
}

async function clearUserCart(req,res){
    try{
        await cart.find({where:{user_id:req.user.id}})
        .then(cart=>{res.status(200).json({cart})})
    }catch(error){
        console.log(error)
    }
}