import React, { Component } from "react";
import logo from "../media/MovieLookup_transparent.png";
import Search from "../Search";

const {
  REACT_APP_MOVIEDB_API_KEY: MOVIEDB_API_KEY,
  REACT_APP_OMDB_API_KEY: OMDB_API_KEY
} = process.env;

const LATEST_MOVIE_URL =
  "https://api.themoviedb.org/3/movie/latest?api_key=" + MOVIEDB_API_KEY;
const OMDB_API_URL = "http://img.omdbapi.com/?apikey=" + OMDB_API_KEY;
//Add movie id, maybe change to generic omdb url

class Home extends Component {
  state = {
    l_title: "",
    l_id: 0,
    l_imdb_id: 0,
    l_overview: "",
    l_img_url: ""
  };
  componentDidMount() {
    fetch(LATEST_MOVIE_URL)
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
      })
      .then(() => {
        if (this.isImdbIdValid()) {
          let posterURL = OMDB_API_URL + "&i=" + this.state.l_imdb_id;
          fetch(posterURL)
            .then(response => {
              if (!response.ok) {
                return;
              } else {
                this.setState({
                  l_img_url: posterURL
                });
              }
            })
            .catch(e => console.log(e.message));
        } else {
          console.log("No valid img url");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  isImdbIdValid() {
    return this.state.l_imdb_id !== null;
  }
  isImgFound() {
    return this.state.l_img_url !== "";
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
        <hr />
        <div className="latestMovie">
          <h2>Random Movie</h2>
          {this.isImgFound() && (
            <a href={this.state.l_img_url}>
              <img src={this.state.l_img_url} alt="IMDB poster" />
            </a>
          )}
          <h3>
            <a
              className="unstyled"
              href={`https://www.imdb.com/title/${this.state.l_imdb_id}`}
            >
              {this.state.l_title}
            </a>
          </h3>
          <pre>Details: {this.state.l_overview}</pre>
        </div>
      </div>
    );
  }
}

export default Home;
