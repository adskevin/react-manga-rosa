import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register/Register';
import Registers from './Registers/Registers';
import Registry from './Registry/Registry';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import GenerateLink from './GenerateLink/GenerateLink';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/registros">
          <Navbar />
          <Registers />
        </Route>
        <Route path="/registro/:id">
          <Navbar />
          <Registry />
        </Route>
        <Route path="/:name/registrar">
          <Register />
        </Route>
        <Route path="/generateLink">
          <Navbar />
          <GenerateLink />
        </Route>
        <Route path="/">
          <Navbar />
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
