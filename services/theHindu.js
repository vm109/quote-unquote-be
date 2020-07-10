const feed = require('rss-to-json')

const theHindu_rss = {
    ap: 'https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss',
    national: 'https://www.thehindu.com/news/national/feeder/default.rss'
}

const read_hindu = async (category)=>{
    const rss = await feed.load(theHindu_rss[category])
    return rss
}

module.exports = {
    read_hindu
}