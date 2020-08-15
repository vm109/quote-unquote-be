import React, {Component} from 'react'
import {FaNewspaper} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Link } from 'react-router-dom'
import './home_page.css'

class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            websites : []
        }
    }

    async componentDidMount(){
        const websites = await fetch(`${process.env.REACT_APP_BE_HOST}/getwebsites`)
        this.setState({websites: this.displayListOfWebsites(await websites.json()) })
    }   

    displayListOfWebsites(websites){
        let displayWebsites = []
        let color_switch = "yellow"
        for (const [index,website] of websites.entries()){
            displayWebsites.push(
            <div class="paper_row">
            <IconContext.Provider value={{ color: color_switch, className: "global-class-name" ,style: { verticalAlign: 'middle' }}}>
            <Link to={{pathname: website.location, state: {website_name: website.name, website_slug: website.slug}}}><FaNewspaper size="10em"/><br/><span>{website.name}</span></Link>
            </IconContext.Provider>
            </div>    
            )
            if(color_switch==="yellow"){
                color_switch ="grey"
            }else{
                color_switch = "yellow"
            }
        }
        return displayWebsites
    }
    render(){
        return <>
        <div>
            <p>Welcome to our quote-unquote</p>
    <div>{this.state.websites}</div>
        </div>
       </>
    }
}

export default HomePage