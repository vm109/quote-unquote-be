const feed = require('rss-to-json')
const polly_reader = require('../domain_services/polly_reader')

const theHindu_rss = {
    ap: 'https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss',
    national: 'https://www.thehindu.com/news/national/feeder/default.rss'
}

const read_hindu = async (category)=>{
    try{
    const rss = await feed.load(theHindu_rss[category])
    await polly_reader.speak(rss.items[0]['title'])
    return rss
    }catch(e){
        console.log(e)
        return new Error(e)
    }
}

module.exports = {
    read_hindu
}