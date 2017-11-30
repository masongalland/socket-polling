import React, { Component } from "react";
import Display from "./Display";

import { Bar } from "react-chartjs-2";

export default class Board extends Component {
  render() {
    let data = {
      labels: Object.keys(this.props.results),
      datasets: [
        {
          backgroundColor: ["#23F0C7", "#4357AD", "#ffe426", "#D81159"],
          data: Object.values(this.props.results)
        }
      ]
    };
    let options = {
      legend: { display: false },
      scales: {
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ gridLines: { display: false } }]
      }
    };
    return (
      <div id="scoreboard">
        <Display
          if={this.props.status === "connected" && this.props.currentQuestion && Object.keys(this.props.results).length > 0}
        >
          <h2>Results</h2>
          <Bar data={data} options={options} ref="chart" />
        </Display>

        <Display
          if={this.props.status === "connected" && Object.keys(this.props.results).length < 1}
        >
          <h2>Awaiting Results...</h2>
        </Display>
      </div>
    );
  }
}
