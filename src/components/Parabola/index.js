import React, { Component } from "react";
import PropTypes from "prop-types";
import ParabolaUtil from "../../Parabola";
import randomColor from "randomcolor";

export default class Parabola extends Component {
  static propTypes = {
    a: PropTypes.object, //of the form: {x: 0, y: 0}
    b: PropTypes.object, //of the form: {x: 0, y: 0}
    c: PropTypes.object, //of the form: {x: 0, y: 0}
    numPoints: PropTypes.number,
    showControlPoints: PropTypes.bool,
    showSegments: PropTypes.bool,
    showStepPoints: PropTypes.bool,
    showStrings: PropTypes.bool,
    showParabola: PropTypes.bool
  };

  render() {
    var { a, b, c } = this.props;
    var numPoints = this.props.numPoints || 10;
    var colors = randomColor({
      luminosity: "bright",
      count: numPoints
    });
    var parabola = new ParabolaUtil(a, b, c);

    var line = parabola.line(numPoints);
    var steppoints = this.props.showStepPoints
      ? parabola.stepPoints(numPoints)
      : [];
    var stringPoints = this.props.showStrings
      ? parabola.strings(numPoints)
      : [];

    var showParabola =
      this.props.showParabola || this.props.showParabola === undefined;

    var cpColors = randomColor({ luminosity: "bright", count: 3 });
    var controlPoints = (
      <g className="controlPoints">
        <circle cx={a.x} cy={a.y} r="5" fill={cpColors[0]} />
        <text x={a.x - 5} y={a.y + 18} fontSize="14px">
          A
        </text>
        <circle cx={b.x} cy={b.y} r="5" fill={cpColors[1]} />
        <text x={b.x - 5} y={b.y + 18} fontSize="14px">
          B
        </text>
        <circle cx={c.x} cy={c.y} r="5" fill={cpColors[2]} />
        <text x={c.x - 5} y={c.y + 18} fontSize="14px">
          C
        </text>
      </g>
    );

    var segments = (
      <polyline
        points={[[a.x, a.y], [b.x, b.y], [c.x, c.y]]
          .map(p => p.join(","))
          .join(" ")}
        strokeWidth={1}
        stroke="#aaa"
        fill="none"
      />
    );

    var parabolaSvg = (
      <polyline
        className="skeleton"
        points={line.map(p => p.join(",")).join(" ")}
        strokeWidth="2"
        stroke="#444"
        fill="none"
      />
    );

    var strings = (
      <g className="strings">
        {!this.props.showSegments && segments}
        {stringPoints.map((string, i) => (
          <polyline
            className="string"
            points={[string["q"].join(","), string["r"].join(",")].join(" ")}
            fill="none"
            stroke={colors[i]}
            strokeWidth={1}
            key={i}
          />
        ))}
        {stringPoints.map((string, i) => (
          <circle
            cx={string.p[0]}
            cy={string.p[1]}
            r="2"
            fill={colors[i]}
            key={i}
          />
        ))}
      </g>
    );

    var stepPoints = (
      <g className="stepPoints">
        {!this.props.showSegments && segments}
        {steppoints.map((p, i) => (
          <circle
            cx={p[0]}
            cy={p[1]}
            r="2"
            fill={colors[i % numPoints]}
            key={i}
          />
        ))}
      </g>
    );

    return (
      <g className="parabola">
        {showParabola && parabolaSvg}
        {this.props.showSegments && segments}
        {this.props.showStrings && strings}
        {this.props.showStepPoints && stepPoints}
        {this.props.showControlPoints && controlPoints}
      </g>
    );
  }
}
