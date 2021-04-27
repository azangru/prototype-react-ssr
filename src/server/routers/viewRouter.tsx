import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../../client/App';

const viewRouter = (req: Request, res: Response) => {
  const markup = renderToString(
    <App />
  );

  const responseString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Title of the document</title>
    </head>
    <body>
    
    <div id="app-root">${markup}</div>
    
    <script src="/client.js"></script>
    </body>
    </html>
  `;

  res.send(responseString);
};

export default viewRouter;



// const markup = renderToString(
//   <StaticRouter context={context} location={req.url}>
//     <App routes={routes} initialData={data} />
//   </StaticRouter>
// );
