
const AWS = require('aws-sdk')
const Speaker = require('speaker')
const Stream = require('stream')
const fs = require('fs')
const util = require('util')
const s3 = require('./s3')
const polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

const play = new Speaker({
    channels: 2,
    bitDepth: 16, 
    sampleRate: 8000,
})

const create_params =(text)=> {
    return {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Joanna'
    }
}

const create_speak_params =(text) =>{
    return {
    Text: text,
    OutputFormat: 'pcm',
    VoiceId: 'Brian'
}
}
const speak = async (website,date,headline)=>{
    const params = create_params(headline)
    const audio_processed = await util.promisify(polly.synthesizeSpeech.bind(polly))(params)
    if( audio_processed && audio_processed.AudioStream && audio_processed.AudioStream instanceof Buffer){
        s3.writeAudioFile(website, date, headline, audio_processed.AudioStream)
    }
}

module.exports = {
    speak
}