import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import GrassPage from "../GrassBlade/Page";
import ParabolaPage from "../Parabola/Page";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/field" render={props => <GrassPage {...props} />} />
            <Route
              path="/parabola"
              render={props => <ParabolaPage {...props} />}
            />
            <Redirect to={{ pathname: "/field", search: "?numBlades=500" }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
