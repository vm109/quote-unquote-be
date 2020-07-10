const routes = require('express').Router()

routes.get('/', (req,res,next)=>{
   res.send(JSON.parse('{ "message":"welcome"}'))
})


module.exports = routes