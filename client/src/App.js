import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";


const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Redirect path="/" to="/register" />
      </Switch>
    </div>
  );
};

export default App;
