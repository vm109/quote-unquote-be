const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')

const welcome = require('./routes/welcome')
const google_auth_setup = require('./auth/authenticate_config')
const google_auth = require('./routes/auth')
const theHindu = require('./routes/read_paper_route')
const s3Service = require('./routes/s3_service_route')
const utilService = require('./routes/util_service')
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

app.use(cors())
app.use(passport.initialize())
app.use('/',google_auth)

//app.use(authenticationMiddleware(whitelist))
app.use('/',welcome)
app.use('/',theHindu)
app.use('/s3', s3Service)
app.use('/', utilService)
app.listen(port,()=>{
    console.log('quote-unquote started running on 8080')
})