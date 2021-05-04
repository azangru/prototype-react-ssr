import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider, FilledContext } from 'react-helmet-async';

import routesConfig from '../../client/routes/routesConfig';

import App from '../../client/App';
import getReduxStore from '../../client/state/store';

const viewRouter = async (req: Request, res: Response) => {
  const reduxStore = getReduxStore();
  const helmetContext = {};

  const dataRequirements =
    routesConfig
      .filter( route => matchPath(req.url, route) ) // filter matching paths
      // .map( route => route.component ) // map to components
      .filter( route => (route.component as any).serverFetch ) // check if components have data requirement
      .map( route => {
        const match = matchPath(req.url, route);
        return (route.component as any).serverFetch({ match, store: reduxStore });
      }); // dispatch data requirement

  await Promise.all( dataRequirements );


  const markup = renderToString(
    <Provider store={reduxStore}>
      <StaticRouter location={req.url} context={{}}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </Provider>
  );

  const helmet = (helmetContext as FilledContext).helmet;

  // FIXME: use webpack manifest for access to assets
  const responseString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="stylesheet" href="http://localhost:8081/static/client.css">
    </head>
    <body>
    
    <div id="app-root">${markup}</div>
    
      <script>
        window.__PRELOADED_STATE__ = ${serialize(reduxStore.getState())}
      </script>
      <script src="http://localhost:8081/static/client.js"></script>
    </body>
    </html>
  `;

  res.send(responseString);
};

export default viewRouter;

