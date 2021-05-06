import React from 'react';
import loadable from "@loadable/component";
import { serverFetch as mainPageServerFetch } from '../pages/MainPage';
import { serverFetch as secondPageServerFetch } from '../pages/SecondPage';

import { ReduxStore } from '../state/store';

type ServerFetch = 
  | ((params: {store: ReduxStore}) => Promise<unknown>)
  | ((params: {match: any, store: ReduxStore}) => Promise<unknown>);

type RoutesConfig = {
  path: string;
  exact?: boolean;
  serverFetch?: ServerFetch;
  component: any; // :-(
}[]

// const makeLoadable = (path: string) => loadable(() => import(path), {
//   fallback: <div>Loading...</div>
// });

const LoadableMainPage = loadable(() => import('../pages/MainPage'), {
  fallback: <div>Loading...</div>
});

const LoadableSecondPage = loadable(() => { console.log('loadable'); return import('../pages/SecondPage')}, {
  fallback: <div>Loading...</div>
});

const routes: RoutesConfig = [
  {
    path: "/",
    exact: true,
    serverFetch: mainPageServerFetch,
    component: LoadableMainPage
  },
  {
    path: "/character/:id",
    serverFetch: secondPageServerFetch,
    component: LoadableSecondPage
  }
];

export default routes;

/*

const routes: RoutesConfig = [
  {
    path: "/",
    exact: true,
    serverFetch: mainPageServerFetch,
    component: makeLoadable('../pages/MainPage')
  },
  {
    path: "/character/:id",
    serverFetch: secondPageServerFetch,
    component: makeLoadable('../pages/SecondPage')
  }
];


*/
