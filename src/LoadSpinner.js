import React, { Component } from "react";
import Loader from "react-loader-spinner";

class LoadSpinner extends Component {
  render() {
    return (
      <div className="loading">
        <Loader type="TailSpin" color="#00bfff" height="80" width="80" />
      </div>
    );
  }
}

export default LoadSpinner;
