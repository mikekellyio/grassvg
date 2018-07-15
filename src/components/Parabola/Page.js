import React, { Component } from "react";
import PropTypes from "prop-types";
import Parabola from "./index";
import queryString from "query-string";
import sizeMe from "react-sizeme";

class ParabolaPage extends Component {
  static propTypes = {
    location: PropTypes.object,
    size: PropTypes.object
  };

  updateDimensions = () => {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName("body")[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height =
        w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ width: width, height: height });
    // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
  };
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    var values = queryString.parse(this.props.location.search);

    var height = this.props.size.height;
    var width = this.props.size.width;

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

    var xVals = [props.a.x, props.b.x, props.c.x].sort();
    var cpDifference = xVals[2] - xVals[0];

    var centeringOffset = width / 2 - (xVals[0] + cpDifference / 2);
    centeringOffset = centeringOffset < 0 ? 0 : centeringOffset;
    props.a.x = props.a.x + centeringOffset;
    props.b.x = props.b.x + centeringOffset;
    props.c.x = props.c.x + centeringOffset;

    var yVals = [props.a.y, props.b.y, props.c.y].sort();
    cpDifference = yVals[2] - yVals[0];

    centeringOffset = height / 2 - (yVals[0] + cpDifference / 2);
    centeringOffset = centeringOffset < 0 ? 0 : centeringOffset;
    props.a.y = props.a.y + centeringOffset;
    props.b.y = props.b.y + centeringOffset;
    props.c.y = props.c.y + centeringOffset;

    if (props.showControlPoints)
      props.showControlPoints = props.showControlPoints !== "0";
    if (props.showSegments) props.showSegments = props.showSegments !== "0";
    if (props.showStepPoints)
      props.showStepPoints = props.showStepPoints !== "0";
    if (props.showStrings) props.showStrings = props.showStrings !== "0";
    if (props.showParabola) props.showParabola = props.showParabola !== "0";

    return (
      <svg height={height} width={width}>
        <Parabola {...props} />
      </svg>
    );
  }
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(
  ParabolaPage
);
