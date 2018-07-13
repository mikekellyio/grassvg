import React, { Component } from "react";
import PropTypes from "prop-types";
import GrassBlade from "../GrassBlade";

export default class Field extends Component {
  static propTypes = {
    height: PropTypes.string,
    bladeHeightVariance: PropTypes.number,
    width: PropTypes.string,
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
    var height = this.props.height;
    var bladeHeightVariance = this.props.bladeHeightVariance;
    var blades = [];
    for (var i = 1; i <= count; i++) {
      blades.push({
        a: this.point(
          i * offset,
          Math.random() * bladeHeightVariance +
            (height - bladeHeightVariance || height - height / 4) -
            40
        ),
        b: this.point(i * offset, Math.random() * 10 + 20),
        c: this.point(
          i * offset + Math.random() * 100,
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
      <svg width={this.props.width} height={this.props.height}>
        {blades}
      </svg>
    );
  }
}
