const routes = require('express').Router()
const s3 = require('../domain_services/s3')
routes.get('/getrecords/:website', async (req,res,next)=>{
    let category = 'national'
    let website = req.params.website
    if(req.query.category){
        category=req.query.category
    }    
    res.send(await s3.list_objects(website, category))
})


routes.get('/getsignedurl',  (req,res,next)=>{
    const key = req.query.key
    res.send({url: s3.signedUrlS3(key)})
})
module.exports = routes