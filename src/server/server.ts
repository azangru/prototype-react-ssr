import express from 'express';
import path from 'path';

import { starWarsGraphqlProxy } from './proxy';

import viewRouter from './routers/viewRouter';

const app = express();

app.use('/starwars-graphql', starWarsGraphqlProxy);
app.use('/static', express.static(path.resolve(__dirname, '../')));
app.get('*', viewRouter);


export default app;
