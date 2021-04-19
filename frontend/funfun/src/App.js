import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";

import ScrolltoTop from "./components/common/ScrollToTop";

import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <ScrolltoTop />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact={true} component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
