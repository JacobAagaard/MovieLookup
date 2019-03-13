import React, { Component } from "react";
import TMDBLogo from "../media/TMDBLogo.svg"; // https://www.themoviedb.org/about/logos-attribution

class About extends Component {
  render() {
    return (
      <div className="aboutPage">
        <h1>About ML</h1>
        <ul className="unstyled">
          <li>
            <img src={TMDBLogo} alt="TheMovieDB logo" />
            <pre style={{ color: "#01d277" }}>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </pre>
          </li>
        </ul>
      </div>
    );
  }
}

export default About;
