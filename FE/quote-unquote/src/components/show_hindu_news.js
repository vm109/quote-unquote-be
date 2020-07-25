import React,{Component} from 'react'

class HinduNews extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            audio: []
        }
    }

    
    async componentDidMount(){
        const records = await fetch(`${process.env.REACT_APP_BE_HOST}/s3/getrecords`)
        const audioList = await this.getAudioList(await records.json())
        console.log(audioList)
        this.setState({audio: audioList, isLoaded: true, })

    }

    async getSecuredLink(key){
        
        const signed_url = await fetch(`${process.env.REACT_APP_BE_HOST}/s3/getsignedurl/?key=${key}`)
        return await signed_url.json()
    }

    async getAudioList(records){
        let audioList = []
        for( const [index,record] of records.entries()){
            const secure_url = await this.getSecuredLink(record)
        audioList.push(
        <li key={index}>
            <audio controls="controls" preload="auto" id="audio_player">
             <source src={secure_url.url}/> 
             </audio>
        </li>
    )
    }

    return audioList
    }
    render(){
        return <>
        <div>
            Listen to Hindu
        </div>
    <ul>{this.state.audio}</ul>
        </>
    }
}

export default HinduNews