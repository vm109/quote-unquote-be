const routes = require('express').Router()
const s3 = require('../domain_services/s3')
routes.get('/getrecords', async (req,res,next)=>{
    res.send(await s3.list_objects())
})


routes.get('/getsignedurl',  (req,res,next)=>{
    console.log(req.query)
    const key = req.query.key
    res.send({url: s3.signedUrlS3(key)})
})
module.exports = routes