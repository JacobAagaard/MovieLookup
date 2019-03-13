//Thanks to: https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./Suggestions";

const {
  REACT_APP_MUSICGRAPH_API_KEY: API_KEY,
  REACT_APP_MUSICGRAPH_API_URL: API_URL
} = process.env;

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
          if (this.state.query.length % 2 === 0) {
            //this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  };

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

export default Search;
