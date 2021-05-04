import express from 'express';

import { starWarsGraphqlProxy } from './proxy';

import viewRouter from './routers/viewRouter';

const app = express();

app.use('/starwars-graphql', starWarsGraphqlProxy);
app.get('*', viewRouter);


export default app;
