import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="aboutPage">
        <h1>About ML</h1>
        <pre>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            alt=""
          />{" "}
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </pre>
      </div>
    );
  }
}

export default About;
