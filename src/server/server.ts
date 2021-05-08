import express from 'express';
import path from 'path';

import { starWarsGraphqlProxy } from './proxy';

import viewRouter from './routers/viewRouter';

const app = express();

app.use('/starwars-graphql', starWarsGraphqlProxy);
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.use('/static', express.static(path.resolve(__dirname, '../')));
app.get('*', viewRouter);


export default app;
