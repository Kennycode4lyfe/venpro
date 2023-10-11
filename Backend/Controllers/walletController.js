const { TokenExpiredError } = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const wallet = db.wallet


async function getAllWallets(req,res){
try{
await wallet.findAll()
.then((wallets)=>{
    console.log(wallets)
    res.status(200).json(wallets)
}).catch(err=>console.log(err))
}catch(error){
    console.log(error)
}
}

async function getAwallet(req, res){
    try{
        await wallet.find({where:{user_id:token.user_id}})
        .then((wallet)=>{
            res.status(200).json({wallet})
        }).catch(err=>console.log(err))
    }catch(error){
        console.log(error)
    }
}


async function fundWallet(req, res){
    try{
        const accountTopUp = req.body.amount
        await wallet.update({balance:accountTopUp,where:{user_id:token.user_id}})
        .then((wallet)=>{
            res.status(200).json({wallet})
        }).catch(err=>console.log(err))
    }catch(error){
        console.log(error)
    }
}

async function updateWalletBalance(req,res){
    try{
        await wallet.findAndUpdate({where:{user_id:token.user_id}})
        .then((wallet)=>{
            res.status(200).json({wallet})
        }).catch(err=> console.log(err))
    }catch(error){
        console.log(error)
    }
}