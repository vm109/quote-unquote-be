const feed = require('rss-to-json')
const polly_reader = require('../domain_services/polly_reader')



const read_paper = async (rss_link,website, category)=>{
    try{
    const rss = await feed.load(rss_link)
    let rss_with_audio = []
    const promises = rss.items.map( async (item)=>{
        const audio_file = await polly_reader.speak(website, category, item['created'],item['title']);
        rss_with_audio.push({...item, audio_file})
    })
    await Promise.all(promises)
    return rss_with_audio
    }catch(e){
        return new Error(e)
    }
}

module.exports = {
    read_paper
}