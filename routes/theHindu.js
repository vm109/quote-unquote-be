const routes = require('express').Router()
const theHindu = require('../services/theHindu')

routes.get('/hindu', (req, res, next) => {
    if (req.query && req.query.category) {
        theHindu.read_hindu(req.query.category).then(rss => res.send(rss)
        ).catch(err => res.send(err))

    } else {
        theHindu.read_hindu('national').then(rss => res.send(rss)).catch(err => res.send(err))
    }
})


module.exports = routes