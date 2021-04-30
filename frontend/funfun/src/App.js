import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";

import ScrolltoTop from "./components/common/ScrollToTop";
import Header from "./components/common/Header";

import Home from "./routes/Home";

import Login from "./routes/User/Login";
import Join from "./routes/User/Join";
import FindID from "./routes/User/FindID";
import FindPW from "./routes/User/FindPW";


import "./routes/css/reset.css";
import './routes/css/home.css';
import './routes/css/user.css';


function App() {
  return (
    <Router>
      <ScrolltoTop />
      <div className="wrapper">
      <Header/>
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/login" exact={true} component={Login}/>
          <Route path="/join" exact={true} component={Join}/>
          <Route path="/findid" exact={true} component={FindID}/>
          <Route path="/findpw" exact={true} component={FindPW}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
