import React from 'react';
import "./App.css";
import { Route,Routes } from 'react-router-dom'
import Router from "./views";

const App = () => {

  return (
    <div className="App">
          <Route exact path="/" component={Router.Main} />
    </div>
  );
}

export default App;