import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
} from 'react-router-dom';
import { Header } from './commons';
import { HomePage, LoginForm, RegisterForm, Profile } from './components';
import { Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
});

const App = () => (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
);

export default App;
