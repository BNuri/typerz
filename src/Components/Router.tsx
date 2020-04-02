import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import Practice from "../Routes/Practice";
import Manager from "../Routes/Manager";
import Ranking from "./Ranking";
import Footer from "./Footer";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/practice/:id" component={Practice} />
        <Route path="/test/:id" component={Practice} />
        <Route path="/ranking/:id" component={Ranking} />
        <Route path="/manager" exact component={Manager} />
        <Redirect from={"*"} to={"/"} />
      </Switch>
      <Footer />
    </>
  </Router>
);
