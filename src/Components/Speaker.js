import React, { Component } from 'react'
import Display from './Display';
import JoinSpeaker from './JoinSpeaker';
import Attendance from './Attendance';
import Questions from './Questions';
import Board from './Board';

export default class Speaker extends Component {
    render() {
        return (
            <div id="speaker">
                <Display if={this.props.status === "connected"}>
                    <Display if={this.props.member.name && this.props.member.type === "speaker"} >
                        <Questions questions={this.props.questions} emit={this.props.emit} currentQuestion = {this.props.currentQuestion} />
                        <Board {...this.props}/>
                        <Attendance audience={this.props.audience} />
                    </Display>

                    <Display if={!this.props.member.name} >
                        <h1 className="home">Start!</h1>
                        <JoinSpeaker emit={this.props.emit}/>
                    </Display>

                </Display>
            </div>
        )
    }
}
