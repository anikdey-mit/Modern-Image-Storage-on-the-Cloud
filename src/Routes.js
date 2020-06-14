import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchByTags from "./SearchByTags";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Routes() {
  return (
    <Switch>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default Routes;