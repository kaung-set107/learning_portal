import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ value, max }) => {
  return <progress value={value} max={max} />;
};

ProgressBar.prototype = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};

export default ProgressBar;
