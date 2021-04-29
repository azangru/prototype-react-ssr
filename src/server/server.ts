import express from 'express';

import viewRouter from './routers/viewRouter';

const app = express();

app.get('/', viewRouter);


export default app;
