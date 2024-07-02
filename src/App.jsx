import React from 'react';
import "./App.css";
import { Route,withRouter } from 'react-router-dom'
import Router from "./views";

const App = () => {

  return (
    <div className="App">
          <Route path="/" component={Router.Main} />
    </div>
  );
}

export default withRouter(App);