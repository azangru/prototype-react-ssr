import React, { StrictMode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Routes from './routes/Routes';

import './App.css';

const App = () => {

  return (
    <StrictMode>
      <Meta />
      <Navigation />
      <Routes />
    </StrictMode>
  );
}

const Navigation = () => (
  <nav>
    <Link to="/">Main</Link>
    {'   '}
    <Link to="/counter">Counter</Link>
  </nav>
);


const Meta = () => (
  <Helmet defaultTitle="Test React Server-Side Rendering" />
)

export default App;
