import React, { Component } from "react";

export default class Header extends Component {
  static defaultProps = {
    status: "disconnected"
  };

  render() {
    return (
      <header>
        <div>
          <h2>{this.props.title}</h2>
          <p>Presented by: {this.props.speaker}</p>
        </div>
        <div className="user-count">
          <p>{this.props.audience.length}</p>
          <i className="fa fa-users" aria-hidden="true"></i>
        </div>
      </header>
    );
  }
}
