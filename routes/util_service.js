const routes = require('express').Router()

website_cache = [
{name:'The Hindu', location:'/hindu', slug: 'hindu', categories: []},
{name:'The Washington Post', location:'/washpost', slug: 'washpost'},
{name:'The NewYork Times', location:'/nyctimes', slug:'tnytimes'}]

find_websites_cache = ()=>{
    if(website_cache.length > 0){
        return website_cache
    }else{
        //TODO maintain websites in SSM or S3 and return those values
        // Save the values from remote to websites_cache for further calls
    }
}
routes.get('/getwebsites', (req, res, next)=>{
    const websites = find_websites_cache()
    res.send(websites)
})

module.exports = routes