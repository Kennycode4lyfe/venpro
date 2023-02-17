const express = require('express')
require('dotenv').config()
const { requiresAuth } = require('express-openid-connect');
const bodyParser = require('body-parser')
const userRouter = require('./Routes/userRoute')
const middleWare = require('./auth')
const PORT = process.PORT || 3000

const app = express()

//set view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(express.static('public'));



app.use(middleWare)
app.use('/user',userRouter)



// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.get('/profile', requiresAuth(), (req, res) => {
    console.log(req.oidc.user)
    console.log(req)
    res.send(JSON.stringify(req.oidc.user));
});



app.get('/home', (req, res) => {
 res.send('hello')
})

app.use((err,req,res,next)=>{
res.status(500).send('something broke')
})

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})