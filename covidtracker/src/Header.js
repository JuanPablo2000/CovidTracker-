import React from 'react'
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import image from './images/JPBC.jpg';



function Header() {
    return (
        <div className="header">

       
        <div className="header__container">
            <div className="header__logo">
                <p>Juan Pablo Brenes <span>💻🔥</span></p>
            </div>
           
            <div className="header__avatar">
                <div className="header__picture">
                <a href="https://hopeful-elion-47ddb9.netlify.app/"> <Avatar src={image} /></a>
                </div>
                
                
            </div>
            
        </div> 
        <div className="header__title">
            <h1>Covid-19 Tracker <span id="covid">☣</span></h1>
        </div>
      
        </div>
       
    )
}

export default Header
