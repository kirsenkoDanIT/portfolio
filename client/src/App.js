import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import "./App.css";
import { Header } from "./commons";
import { HomePage, LoginForm, RegisterForm, Profile } from "./components";
import { Container } from "@material-ui/core";

const App = () => (
  <>
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Container>
    </Router>
  </>
);

export default App;
