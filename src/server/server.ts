import express from 'express';

import { setupDevServer } from  './webpack-dev-server';

import viewRouter from './routers/viewRouter';

const app = express();
setupDevServer(app); // FIXME: should be only done in dev

app.get('/', viewRouter);


export default app;
