
const AWS = require('aws-sdk')
const Speaker = require('speaker')
const Stream = require('stream')
const fs = require('fs')
const util = require('util')
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
const speak = async (text)=>{
    const params = create_params(text)
    const audio_processed = await util.promisify(polly.synthesizeSpeech.bind(polly))(params)
    if( audio_processed && audio_processed.AudioStream && audio_processed.AudioStream instanceof Buffer){
        fs.writeFile('./audio.mp3', audio_processed.AudioStream, (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('audio file saved')
            }
        })
    }

   const audio_processed1 = await util.promisify(polly.synthesizeSpeech.bind(polly))(create_speak_params(text))
    const bufferStream = new Stream.PassThrough()
    bufferStream.end(audio_processed1.AudioStream)
    bufferStream.pipe(play)

}

module.exports = {
    speak
}