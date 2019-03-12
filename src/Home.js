import React, { Component } from "react";
import logo from "./media/MovieLookup_transparent.png";
import Search from "./Search";

class Home extends Component {
  render() {
    return (
      <div className="homePage">
        <img
          src={logo}
          alt="Movie Lookup logo"
          style={{ height: 150, width: 150 }}
        />
        <Search />
      </div>
    );
  }
}

export default Home;
