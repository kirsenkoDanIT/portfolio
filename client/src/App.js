import React from 'react';
import './App.css';
import { Header } from './commons';
import { LoginForm, RegisterForm } from './components';

const App = () => (
  <>
    <Header />
    <LoginForm />
    <RegisterForm />
  </>
);

export default App;
