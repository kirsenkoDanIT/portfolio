import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import './App.css';
import { Header } from './commons';
import { LoginForm, RegisterForm, HomePage } from './components';

const App = () => (
  <>
    <Router>
      <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />>
          <Route path='/login' component={LoginForm} />>
          <Route path='/register' component={RegisterForm} />>
        </Switch>
    </Router>
  </>
);

export default App;
