const AWS = require('aws-sdk')
const epoch_ago = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en')
const s3 = new AWS.S3()

const Bucket="quote-unquote"

const writeAudioFile =  (website, date, headline, audioBlob)=>{
    const params = {
        Bucket,
        Key: `${website}/${determineRelativeTime(date)}/${createAwsS3Key(website, date, headline)}`,
        Body: audioBlob
    }
    s3.upload(params, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
}

const determineRelativeTime = (published_date)=>{
const published_date_00 = new Date()
published_date_00.setTime(published_date)
published_date_00.setHours(0)
published_date_00.setMinutes(0)
published_date_00.setSeconds(0)
published_date_00.setMilliseconds(0)

const published_date_24 = new Date()
published_date_24.setTime(published_date)
published_date_24.setHours(24)
published_date_24.setMinutes(0)
published_date_24.setSeconds(0)
published_date_24.setMilliseconds(0)

if(published_date < published_date_00.getTime()){
    return 'yesterday'
}else if(published_date > published_date_24.getTime()){
    return 'tomorrow'
}else if(published_date_00.getTime() < published_date < published_date_24.getTime() ){
    return 'today'
}
}

const createAwsS3Key = (website_name, date, headline)=>{
return `${website_name}_${headline.length}_${date}.mp3`
}

const list_objects = async ()=>{
 const read_params = {
     Bucket
 }

 try{
 const keys = []    
 const records = await s3.listObjectsV2(read_params).promise()
 records.Contents.forEach(record => {
     keys.push(record.Key)
 });
 return keys
 }catch(e){
     return new Error("Error listing objects in bucket")
 }
}


const signedUrlS3 = (Key)=>{
    const signed_url_params= {
        Bucket, 
        Key,
        Expires: 500
    }
    const signed_url = s3.getSignedUrl('getObject', signed_url_params) 
    return signed_url
}

const streamAudio = (Key)=>{
const streaming_params = {
    Bucket, 
    Key
}

}
module.exports = {
    writeAudioFile,
    list_objects,
    signedUrlS3
}