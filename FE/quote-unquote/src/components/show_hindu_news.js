import React,{Component} from 'react'

class HinduNews extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false,

        }
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextState)
        if(nextState && nextState.key){
            return false
        }
        return true
    }
    componentDidMount(){
        fetch(`${process.env.REACT_APP_BE_HOST}/s3/getrecords`).then(records => records.json())
        .then(records_json=> this.setState({items: records_json, isLoaded: true }))
    }

    getSecuredLink(key){
        fetch(`${process.env.REACT_APP_BE_HOST}/s3/getsignedurl/?key=${key}`).then( url => url.json()).then(url_json => 
            this.setState({...this.state, key: url_json.url}))
    }

    getNewsRecords(){
        let records = []
        for( const [index,record] of this.state.items.entries()){
            this.getSecuredLink(record)
        records.push(
        <li key={index}>
            <audio controls="controls" preload="auto" id="audio_player">
             <source src={record}/> 
             </audio>
        </li>
    )
    }
        return records
    }
    render(){
        return <>
        <div>
            Listen to Hindu
        </div>
        <ul>{this.getNewsRecords()}</ul>
        </>
    }
}

export default HinduNews