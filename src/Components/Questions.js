import React, { Component } from "react";

export default class Questions extends Component {
  ask(question) {
    this.props.emit("ask", question);
  }

  render() {
    const questions = this.props.questions.map((question, i) => {
      return (
        <div style={{backgroundColor: question.q === this.props.currentQuestion.q ? "#24f0c7" : "#4357ad"}}key={i} onClick={() => this.ask(question)}>
          <span>{i + 1}.</span> <span>{question.q}</span>
        </div>
      );
    });

    return (
      <div id="questions">
        <h2>Questions</h2>
        {questions}
      </div>
    );
  }
}
