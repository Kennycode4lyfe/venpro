const nodemailer = require('nodemailer')
require('dotenv').config()


const pass = process.env.GM_PASS
module.exports= async(req,res,next)=>{
let transporter = await nodemailer.createTransport({service:'gmail',
auth:{
    user:'kennydemola2@gmail.com',
    pass:pass
}})

const output = `
<p>You have a new contact request</p>
<h3>Contact Details</h3>
<ul>  
  <li>Name: ${req.body.first_name}</li>
  <li>Company: ${req.body.last_name}</li>
</ul>
<h3>Message</h3>
<p>Welcome to venpro</p>
`;


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

