import React, { Component } from "react";

export default class JoinSpeaker extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  start() {
    const speakerName = this.refs.name.value;
    const title = this.refs.title.value;
    this.props.emit("start", { name: speakerName, title: title });
  }

  render() {
    return (
      <form
        id="speaker-join-form"
        className="join-form"
        action="javascript:void(0)"
        onSubmit={this.start}
      >
        <input
          className="form-control"
          placeholder="Name"
          ref="name"
          required
        />

        <input
          id="speaker-title-input"
          className="form-control"
          placeholder="Title"
          ref="title"
          required
        />
        <button className="submit-btn">Enter</button>
      </form>
    );
  }
}
