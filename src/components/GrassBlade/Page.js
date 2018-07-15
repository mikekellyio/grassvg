import React, { Component } from "react";
import PropTypes from "prop-types";
import Field from "../Field";
import queryString from "query-string";
import { SizeMe } from "react-sizeme";

export default class GrassPage extends Component {
  static propTypes = {
    location: PropTypes.object
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
    const values = queryString.parse(this.props.location.search);
    var props = Object.assign(
      { numBlades: 200, bladeHeightVariance: 200, slop: 50 },
      values
    );
    props.numBlades = parseInt(props.numBlades, 10);
    if (props.showRibs) props.showRibs = props.showRibs !== 0;
    if (props.showSkeleton) props.showSkeleton = props.showSkeleton !== 0;
    if (props.showControlPoints)
      props.showControlPoints = props.showControlPoints !== 0;

    return (
      <SizeMe monitorHeight={true} monitorWidth={true} refreshRate={32}>
        {({ size }) => (
          <Field height={size.height} width={size.width} {...props} />
        )}
      </SizeMe>
    );
  }
}
