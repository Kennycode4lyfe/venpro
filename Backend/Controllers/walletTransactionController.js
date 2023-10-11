const { TokenExpiredError } = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const wallet = db.wallet
const wallet_transactions = db.walletTransaction

async function getAllWalletTransctsById(req,res){
try{
await wallet_transactions.find({where:{user_id:token.user_id}})
.then((wallet_transactions=>{
    res.status(200).json({wallet_transactions})
})).catch(()=>{throw new Error})
}catch(error){
console.log(error)
}
}

