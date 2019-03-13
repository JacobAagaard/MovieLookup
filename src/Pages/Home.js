import React, { Component } from "react";
import logo from "../media/MovieLookup_transparent.png";
import Search from "../Search";

class Home extends Component {
  state = {
    l_title: "",
    l_id: 0,
    l_imdb_id: 0,
    l_overview: ""
  };
  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/latest?api_key=83027f18b7cd334b113faa6eddd334ba&language=en-US"
    )
      .then(response => {
        return response.json();
      })
      .then(JsonObj => {
        this.setState({
          l_title: JsonObj["title"],
          l_id: JsonObj["id"],
          l_imdb_id: JsonObj["imdb_id"],
          l_overview: [JsonObj["overview"]]
        });
        console.log(JsonObj["title"]);
      });
  }
  render() {
    return (
      <div className="homePage">
        <img
          src={logo}
          alt="Movie Lookup logo"
          style={{ height: 150, width: 150 }}
        />
        <Search />
        <h2>Latest Movie</h2>
        <ul className="unstyled">
          <h3>{this.state.l_title}</h3>
          <p>Details: {this.state.l_overview}</p>
        </ul>
      </div>
    );
  }
}

export default Home;
