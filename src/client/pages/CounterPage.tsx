import React from 'react';
import loadable from "@loadable/component";
import { Helmet } from 'react-helmet-async';

const CounterPage = () => {
  return (
    <>
      <Helmet>
        <title>Client-side counter</title>
      </Helmet>
      <h1>An obligatory counter</h1>
      <LoadableCounter />
    </>
  );
};

const LoadableCounter = loadable(() => import('../components/Counter'), {
  ssr: false,
  fallback: <span>Loading...</span>
});

export default CounterPage;
