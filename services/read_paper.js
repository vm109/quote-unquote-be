const feed = require('rss-to-json')
const polly_reader = require('../domain_services/polly_reader')



const read_paper = async (rss_link,website, category)=>{
    try{
    const rss = await feed.load(rss_link)
    rss.items.forEach(async (item) => {
        try{
        await polly_reader.speak(website, category, item['created'],item['title']) 
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
    read_paper
}