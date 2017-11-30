import React, { Component } from "react";
import Display from "./Display";
import Board from "./Board";

export default class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      answer: undefined
    };
  }
  componentWillMount() {
    this.setUpChoices();
  }

  componentWillReceiveProps() {
    this.setUpChoices();
  }

  setUpChoices() {
    let choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ choices: choices, answer: sessionStorage.answer });
  }

  select(choice) {
    this.setState({ answer: choice });
    sessionStorage.answer = choice;
    this.props.emit("answer", {
      question: this.props.question,
      choice: choice
    });
  }

  render() {
    const colors = ["#23F0C7", "#4357AD", "#ffe426", "#D81159"];
    const choices = this.state.choices.map((choice, i) => {
      return (
        <div
          className="choice"
          style={{ backgroundColor: colors[i] }}
          key={i}
          onClick={() => this.select(choice)}
        >
          {choice}.) {this.props.question[choice]}
        </div>
      );
    });
    console.log(this.props);
    console.log(this.state);
    return (
      <div id="currentQuestion">
        <Display if={this.state.answer}>
          <h2>You answered: </h2>
          <p style={{ backgroundColor: colors[this.state.choices.indexOf(this.state.answer)] }} className="choice">{this.state.answer}.)  {this.props.question[this.state.answer]}</p>
          <Board {...this.props} />
        </Display>

        <Display if={!this.state.answer}>
          <h2 className="asked-question">{this.props.question.q}</h2>
          <div className="choices">{choices}</div>
        </Display>
      </div>
    );
  }
}
