//Thanks to: https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
import React, { Component } from "react";
import Suggestions from "./Suggestions";

const { REACT_APP_MOVIEDB_API_KEY: API_KEY } = process.env;

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          let queryString = this.state.query.toString();
          queryString.replace(" ", "+");
          queryString.trim();
          console.log(queryString);
          this.getMovieDBInfo();
        } else if (!this.state.query) {
        }
      }
    );
  };

  getMovieDBInfo = () => {
    let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${
      this.state.query
    }`;
    fetch(SEARCH_URL)
      .then(response => {
        return response.json();
      })
      .then(JsonObj => {
        this.setState({
          results: JsonObj.results
        });
      });
  };

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <br />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

export default Search;
