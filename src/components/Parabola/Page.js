import React, { Component } from "react";
import PropTypes from "prop-types";
import Parabola from "./index";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default class ParabolaPage extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  render() {
    var values = queryString.parse(this.props.location.search);

    var props = Object.assign(
      {
        a: { x: 360, y: 5 },
        b: { x: 5, y: 50 },
        c: { x: 380, y: 390 },
        showControlPoints: false,
        showSegments: false,
        showStepPoints: false,
        showStrings: false,
        showParabola: true,
        numPoints: 20
      },
      values
    );

    if (props.showControlPoints)
      props.showControlPoints = props.showControlPoints !== 0;

    return (
      <div>
        <svg height="400" width="400">
          <Parabola {...props} />
        </svg>
      </div>
    );
  }
}
