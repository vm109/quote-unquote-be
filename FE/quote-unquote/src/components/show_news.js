import React,{Component} from 'react'
import './show_news.css'
import 'bootstrap/dist/css/bootstrap.css'
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
        const records = await fetch(`${process.env.REACT_APP_BE_HOST}/readpaper/${this.props.location.state.website_slug}`)
        const audioList = await this.getAudioList(await records.json())
        this.setState({...this.state,audio: audioList, isLoaded: true })
        
    }

    async getSecuredLink(key){
        const signed_url = await fetch(`${process.env.REACT_APP_BE_HOST}/s3/getsignedurl/?key=${key}`)
        return await signed_url.json()
    }

    handleOnClickSourceButton(url){
        window.open(url)
    }

    async getAudioList(records){
        let audioList = []
        for( const [index,record] of records.entries()){
            const secure_url = await this.getSecuredLink(record.audio_file)
        audioList.push(
        <div class="news_row" key={index}>
            <h2 class="news_title">{record.title}</h2>
            <div class="description"><span>Description</span>{record.description}</div>
            <button onClick={()=>this.handleOnClickSourceButton(record.url)} class="source_url btn btn-warning"><span>Source</span></button>
            <audio controls="controls" preload="auto" id="audio_player">
             <source src={secure_url.url}/> 
             </audio>
        </div>
    )
    }

    return audioList
    }
    render(){
        return <>
        <div>
        <p>Listen to {this.state.website_details.website_name}</p>
        </div>
    <div>{this.state.audio}</div>
        </>
    }
}

export default NewsPage