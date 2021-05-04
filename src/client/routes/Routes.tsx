import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import routes from './routesConfig';

const Routes = () => {
  return (
    <Switch>
      { routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact || false}
            render={() => (
              <route.component/>
            )} 
          
          />
       ))
      }
    </Switch>
  );

};

export default Routes;
