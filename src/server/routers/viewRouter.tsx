import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  StaticRouter
} from 'react-router-dom';

import App from '../../client/App';

const viewRouter = (req: Request, res: Response) => {
  const markup = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );

  // FIXME: use webpack manifest for access to assets
  const responseString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Title of the document</title>
      <link rel="stylesheet" href="http://localhost:8081/static/client.css">
    </head>
    <body>
    
    <div id="app-root">${markup}</div>
    
      <script src="http://localhost:8081/static/client.js"></script>
    </body>
    </html>
  `;

  res.send(responseString);
};

export default viewRouter;

