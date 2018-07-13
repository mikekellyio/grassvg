import React, { Component } from "react";
import PropTypes from "prop-types";
import Parabola from "../../Parabola";
import perpendicular from "../../perpendicular";

import randomColor from "randomcolor";

export default class GrassBlade extends Component {
  static propTypes = {
    a: PropTypes.object, //of the form: {x: 0, y: 0}
    b: PropTypes.object, //of the form: {x: 0, y: 0}
    c: PropTypes.object, //of the form: {x: 0, y: 0}
    numPoints: PropTypes.number,
    showControlPoints: PropTypes.bool,
    showRibs: PropTypes.bool,
    showSkeleton: PropTypes.bool,
    scaleFactor: PropTypes.number
  };

  state = {
    color: randomColor({ hue: "green", luminosity: "dark" })
  };

  render() {
    var parabola = new Parabola(this.props.a, this.props.b, this.props.c);

    var line = parabola.line(this.props.numPoints || 10);

    var color = this.state.color;

    var points = [];
    var left = [];
    var right = [];
    for (var i = 1; i < line.length; i++) {
      var rib = perpendicular(line[i - 1], line[i], this.props.scaleFactor);
      left.push(rib.x1 + "," + rib.y1);
      right.push(rib.x2 + "," + rib.y2);
      points.push(rib);
    }
    right.reverse();

    var outline = (
      <polyline
        points={
          line[0].join(",") + " " + left.join(" ") + " " + right.join(" ")
        }
        strokeWidth="1"
        stroke="#444"
        fill={color}
      />
    );

    var ribs = points.map(function(p, i) {
      return (
        <line className="rib" {...p} strokeWidth="2" stroke="#999" key={i} />
      );
    });

    var controlPoints = (
      <g className="controlPoints">
        <circle cx={this.props.a.x} cy={this.props.a.y} r="5" fill="red" />
        <circle cx={this.props.b.x} cy={this.props.b.y} r="5" fill="red" />
        <circle cx={this.props.c.x} cy={this.props.c.y} r="5" fill="red" />
      </g>
    );

    //line is still not right at this point
    var skeleton = (
      <polyline
        className="skeleton"
        points={line.join(" ")}
        strokeWidth="3"
        stroke="green"
        fill="none"
      />
    );
    return (
      <g className="grassBlade">
        {this.props.showControlPoints && controlPoints}
        {this.props.showRibs && ribs}
        {this.props.showSkeleton && skeleton}
        {!(this.props.showSkeleton || this.props.showRibs) && outline}
      </g>
    );
  }
}
