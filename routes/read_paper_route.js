const routes = require('express').Router()
const readPaper = require('../services/read_paper')

const RSS = {
    hindu:{
    ap: 'https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss',
    national: 'https://www.thehindu.com/news/national/feeder/default.rss'
    },
    washpost:{
    national: 'http://feeds.washingtonpost.com/rss/rss_innovations?itid=lk_inline_manual_41'
    }
}
const websites = Object.keys(RSS)
routes.get('/readpaper/:website', (req, res, next) => {
    let rss_link = ""
    const website = req.params.website
    let category = "national"
    if(!websites.includes(website)){
        res.send({msg:"Please contact the Admin for the list of websites"})
    }
    if (req.query && req.query.category) {
        category = req.query.category
        if(!RSS[website][category]){
            res.send({msg:`Sorry we did not find news for ${category} in ${website}`})
        }else{
            rss_link = RSS[website][category]
        }
    } else {
        rss_link = RSS[website][category]
    }

    readPaper.read_paper(rss_link,website, category).then(rss => res.send(rss)
    ).catch(err => res.send(err))

})


module.exports = routes