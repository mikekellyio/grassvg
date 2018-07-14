import React, { Component } from "react";
import PropTypes from "prop-types";
import Field from "../Field";
import queryString from "query-string";
import { SizeMe } from "react-sizeme";

export default class GrassPage extends Component {
  static propTypes = {
    location: PropTypes.object
  };

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
      <SizeMe monitorHeight monitorWidth>
        {({ size }) => (
          <Field height={size.height} width={size.width} {...props} />
        )}
      </SizeMe>
    );
  }
}
