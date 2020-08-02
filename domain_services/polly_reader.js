
const AWS = require('aws-sdk')
const util = require('util')
const s3 = require('./s3')
const polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

const create_params =(text)=> {
    return {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Aditi'
    }
}

const speak = async (website, category, date,headline)=>{
    const params = create_params(headline)
    const audio_processed = await util.promisify(polly.synthesizeSpeech.bind(polly))(params)
    if( audio_processed && audio_processed.AudioStream && audio_processed.AudioStream instanceof Buffer){
        s3.writeAudioFile(website, category, date, headline, audio_processed.AudioStream)
    }
}

module.exports = {
    speak
}