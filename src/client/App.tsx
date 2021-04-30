import React, { StrictMode } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

import './App.css';

const App = () => {

  return (
    <StrictMode>
      <Switch>
        <Route exact path="/">
          <FirstPage />
        </Route>
        <Route path="/second">
          <SecondPage />
        </Route>
      </Switch>
    </StrictMode>
  );
}

export default App;
