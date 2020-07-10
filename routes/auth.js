const  passport = require('passport');
const routes = require('express').Router()

routes.get('/logged', (req,res,next)=>{
    res.send("dpne")
})
routes.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }))



routes.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/logged');
  });


  routes.get('/logout', (req, res, next)=>{
    req.logOut()
    res.redirect('/')
  })
  module.exports = routes