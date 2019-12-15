import React, {Component} from 'react';
import "../../css/AboutUs.css"
import {MediaCard} from './Cards';
import persons from '../../../config/names.json';

class About extends Component {
    render() {
        return (
            <div className="grid">
                <div className="spacer"/>
                <div className="aboutsection">
                    <h1>About Us</h1>
                    <h3>Who We Are</h3>
                    <p>Hi there! We are a group of multi-talented software developers who have come together to combine
                        our talents to create this beautiful & functional website. You can view our individual
                        portfolios below. Don't
                        forget to check out our websites too.;
                    </p>
                    <h3>What 354TheStars is</h3>
                    <p>
                        Together with each member of our team, we broke down the many tasks into
                        smaller manageable components fitted for each member's specialized skill and this is the result;
                        a
                        modern and enticing e-commerce platform where visitors can shop and browse for all kinds of
                        products.
                        Whatever you need, we have it!.
                    </p>
                </div>
                <div className="spacer"/>
                <h3>What We Do</h3>
                {persons.map(person => (
                    <MediaCard person={person}/>
                ))}
                <div className="clear"></div>
                <div className="spacer"/>
            </div>
        )
    }
}

export default About;


  







