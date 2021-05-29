import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register/Register';
// import Registers from './Registers/Registers';
import Navbar from './Navbar/Navbar';
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
          {/* <Registers /> */}
        </Route>
        <Route path="/:name/registrar">
          <Register />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
