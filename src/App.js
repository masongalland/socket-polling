import React, { Component } from 'react';

import io from 'socket.io-client';

import Router from './router'
import Header from "./Components/Header"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "disconnected",
      title: "",
      member: {},
      audience: [],
      speaker: '',
      questions: [],
      currentQuestion: false,
      results: {}
    }

    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.updateState = this.updateState.bind(this)
    this.emit = this.emit.bind(this)
    this.joined = this.joined.bind(this)
    this.updateAudience = this.updateAudience.bind(this)
    this.start = this.start.bind(this)
    this.ask = this.ask.bind(this)
    this.updateResults = this.updateResults.bind(this)
  }

  componentDidMount() {
    this.socket = io("/");
    this.socket.on("connect", this.connect)
    this.socket.on("disconnect", this.disconnect)
    this.socket.on("welcome", this.updateState)
    this.socket.on('joined', this.joined)
    this.socket.on('audience', this.updateAudience);
    this.socket.on('start', this.start);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.ask);
    this.socket.on('results',this.updateResults);
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload)
  }

  connect() {
    let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null

    if(member && member.type === 'audience') {
      this.emit("join", member)
    }else if(member && member.type === 'speaker'){
      this.emit('start', {name: member.name, title: sessionStorage.title})
    }

    this.setState({status: "connected"})

  }

  disconnect(){
    console.log('i disconnected')
    this.setState({
      status: 'disconnected',
      title: 'disconnected',
      speaker: ''
    })

  }

  updateState(serverState){
    this.setState(serverState)

  }

  joined (member) {
    sessionStorage.member = JSON.stringify(member)
    this.setState({member})

  }

  updateAudience(newAudience) {
    this.setState({audience: newAudience})

  }

  start(presentation) {
    if( this.state.member.type === 'speaker'){
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation)
  }

  ask(currentQuestion) {
    sessionStorage.answer = ""
    this.setState({currentQuestion, results: {}})

  }

  updateResults(data) {
    this.setState({results: data})

  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        {this.state.title ? <Header {...this.state}/> : null }
        <Router emit={this.emit} {...this.state}/>
      </div>
    );
  }
}

export default App;
