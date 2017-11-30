import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
  }

  join() {
    const memberName = this.refs.name.value;
    this.props.emit("join", { name: memberName });
  }

  render() {
    return (
      <div id="join-wrapper">
        <form className="join-form" action="javascript:void(0)" onSubmit={this.join}>
          <input
            className="form-control"
            placeholder="Name"
            ref="name"
            required
          />
          <button className="submit-btn">Enter</button>
        <Link id="start-presentation" to="/speaker">Start Presentation</Link>
        </form>
      </div>
    );
  }
}
