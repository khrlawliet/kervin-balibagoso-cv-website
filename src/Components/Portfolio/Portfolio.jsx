import React from 'react';
import './Portfolio.css';
import Category from './Category';

const Portfolio = () => {
   
    return (
        <div className="portfolio">
            <h1>Portfolio</h1>
            <br/>
            <div className="portfolio__cat">
            <Category title = "Basic"/>
            <Category title = "Intermediate"/>
            <Category title = "Advance"/>
            </div>
            
        </div>
    )
}

export default Portfolio
