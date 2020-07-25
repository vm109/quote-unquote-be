const feed = require('rss-to-json')
const polly_reader = require('../domain_services/polly_reader')
const website = 'hindu'
const theHindu_rss = {
    ap: 'https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss',
    national: 'https://www.thehindu.com/news/national/feeder/default.rss'
}

const read_hindu = async (category)=>{
    try{
    const rss = await feed.load(theHindu_rss[category])
    rss.items.forEach(async (item) => {
        try{
        await polly_reader.speak(website, item['created'],item['title']) 
        }catch(e){
            return new Error(e)
        }
    });
    return rss
    }catch(e){
        return new Error(e)
    }
}

module.exports = {
    read_hindu
}