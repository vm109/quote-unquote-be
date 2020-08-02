import React,{Component} from 'react'

class NewsPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            audio: [],
            website_details:{}
        }
    }

    
    async componentDidMount(){
        
        this.setState({...this.state, website_details: this.props.location.state})
        const records = await fetch(`${process.env.REACT_APP_BE_HOST}/s3/getrecords/${this.props.location.state.website_slug}/?category=national`)
        const audioList = await this.getAudioList(await records.json())
        this.setState({...this.state,audio: audioList, isLoaded: true })
        
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
        <p>Listen to {this.state.website_details.website_name}</p>
        </div>
    <ul>{this.state.audio}</ul>
        </>
    }
}

export default NewsPage