const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require("path");

require('dotenv').config()
const pass = process.env.GM_PASS


module.exports= async(req,res,next)=>{
let transporter = await nodemailer.createTransport({service:'gmail',
auth:{
    user:'kennydemola2@gmail.com',
    pass:pass
}})

const templatePath = path.join("/","Users","HP","Desktop","venpro", "Backend", "views", "welcome.ejs")

const output =await ejs.renderFile(templatePath, { user: req.body })

let mailOptions = {
    from: '"Adediran Kehinde" <kennydemola2@gmail.com>',
    to: req.body.email,
    subject: 'verify your email',
    text:`This is your one time password 7634` ,
    html:output
}

await transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
    console.log(err)
    return err
    }
    next()
})
}

