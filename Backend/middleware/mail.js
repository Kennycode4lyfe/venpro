const nodemailer = require('nodemailer')
module.exports=(req,res)=>{
let transporter = nodemailer.createTransport({service:'gmail',
auth:{
    user:'',
    pass:''
}})

let mailOptions = {
    from: '"Contact" <kennydemola2@gmail.com>',
    to: req.email,
    subject: 'verify your email',
    text:'',
    html:output
}
}