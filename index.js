const express = require('express')
const app = express()
const passport = require('passport')

const welcome = require('./routes/welcome')
const google_auth_setup = require('./auth/authenticate_config')
const google_auth = require('./routes/auth')
const theHindu = require('./routes/theHindu')
const port = 8080

const whitelist = ['/']
const authenticationMiddleware = (whitelist=[]) =>(req,res,next)=>{
    if(whitelist.find(url => url === req.url)){
        next()
    }
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

app.use(passport.initialize())
app.use('/',google_auth)

//app.use(authenticationMiddleware(whitelist))
app.use('/',welcome)
app.use('/',theHindu)
app.listen(port,()=>{
    console.log(process.env)
    console.log('quote-unquote started running on 8080')
})