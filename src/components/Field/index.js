import React, { Component } from "react";
import PropTypes from "prop-types";
import GrassBlade from "../GrassBlade";

export default class Field extends Component {
  static propTypes = {
    height: PropTypes.number,
    bladeHeightVariance: PropTypes.number,
    width: PropTypes.number,
    numBlades: PropTypes.number,
    slop: PropTypes.number,
    numPoints: PropTypes.number,
    showControlPoints: PropTypes.bool,
    showRibs: PropTypes.bool,
    showSkeleton: PropTypes.bool,
    scaleFactor: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = { blades: this.blades(this.props.numBlades, 5) };
  }

  state = {
    blades: []
  };

  componentWillReceiveProps(newProps) {
    if (this.props.numBlades !== newProps.numBlades)
      this.setState({ blades: this.blades(this.props.numBlades, 5) });
  }

  blades = (count, offset) => {
    var height = this.props.height || 600;
    var width = this.props.width || 1200;
    var bladeHeightVariance = this.props.bladeHeightVariance;
    var blades = [];
    var centeringOffset = (width - offset * count) / 2;
    for (var i = 1; i <= count; i++) {
      var x = i * offset + centeringOffset;
      blades.push({
        a: this.point(
          x,
          Math.random() * bladeHeightVariance +
            (height - bladeHeightVariance || height - height / 4) -
            40
        ),
        b: this.point(x, Math.random() * 10 + 20),
        c: this.point(
          x + Math.random() * 100,
          Math.random() * (bladeHeightVariance || 100)
        )
      });
    }
    //sort the blades back to front so they look right
    blades.sort(function(a, b) {
      return a.a.y > b.a.y ? 1 : a.a.y === b.a.y ? 0 : -1;
    });
    return blades;
  };

  p = k => {
    var neg = Math.random() > 0.5 ? 1 : -1,
      slop = this.props.slop || 30,
      p = k + Math.random() * slop * neg;

    return p > 0 ? p : 5;
  };

  point = (x, y) => {
    return { x: this.p(x), y: this.p(y) };
  };

  render() {
    var grassProps = Object.assign(
      {
        numPoints: 20,
        showSkeleton: false,
        showRibs: false,
        scaleFactor: 8
      },
      this.props
    );
    var blades = this.state.blades.map(function(cp, i) {
      return <GrassBlade a={cp.a} b={cp.b} c={cp.c} key={i} {...grassProps} />;
    });

    return (
      <svg>
        <defs>
          <filter id="lightBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2,2" />
          </filter>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4,4" />
          </filter>
        </defs>
        {this.props.numBlades >= 200 && (
          <g>
            <g className="blurred" transform="translate(-75 -35)">
              <g transform="translate(-75 -35)">{blades}</g>
              <g transform="translate(75 -35)">{blades}</g>
            </g>
            <g className="lightlyBlurred">
              <g transform="translate(-50 20)">{blades}</g>
              <g transform="translate(50 20)">{blades}</g>
            </g>
            <g transform="translate(0 80)">{blades}</g>
          </g>
        )}
        {this.props.numBlades < 200 && <g>{blades}</g>}
      </svg>
    );
  }
}
