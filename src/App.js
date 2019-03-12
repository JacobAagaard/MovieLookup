import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Pages/Public";
import Private from "./Pages/Private";
import Courses from "./Pages/Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";
import LoadSpinner from "./LoadSpinner";
import About from "./About";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history), //history is passed from Router that wraps this component. Thus links Auth to react-router
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() => {
      this.setState({ tokenRenewalComplete: true });
    });
  }

  render() {
    const { auth } = this.state;
    if (!this.state.tokenRenewalComplete) return <LoadSpinner />;
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home auth={auth} {...props} />} //Allows Home component to work with auth, and spread remaining props into it
          />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute
            path="/course"
            component={Courses}
            scopes={["read:courses"]}
          />
          <Route path="/about" component={About} />
        </div>
      </AuthContext.Provider> //Shorthand syntax for <React.Fragment>
    );
  }
}

export default App;
