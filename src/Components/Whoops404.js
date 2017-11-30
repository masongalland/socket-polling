import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Whoops404 extends Component {
    render() {
        return (
            <div>
                <h1>Whoops...</h1>
                <p>We cannot find the page that you have requested. Were you looking for one of these: </p>

                <Link to="/">Join as Audience</Link>
                <Link to="/speaker">Start the presentation</Link>
                <Link to="/board">View the board</Link>
            </div>
        )
    }
}
