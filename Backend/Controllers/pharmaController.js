const userModel = require('../models/index').users
const pharmaModel = require('../models/index').pharmacy


async function createPharmacy(req,res,token){
const pharmaPayload = req.body
const user = token.username
// console.log(typeof(user))
try{
const userDetails = await userModel.findOne({where:{username:user}})
const userId = userDetails.id
console.log(userId)
const pharmacy = await pharmaModel.create({...pharmaPayload,user_id:userId})

res.status(200).json(pharmacy)
}
catch(err){
res.send(err)
}
}



module.exports= { createPharmacy}