import React, { Component } from 'react'

export default class Display extends Component {
    render() {
        return (
            <div>
                {this.props.if ? <div>{this.props.children}</div> : null}
            </div>
        )
    }
}
