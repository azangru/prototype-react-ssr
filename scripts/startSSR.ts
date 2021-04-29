import webpack, { EntryObject } from 'webpack';
import path from 'path';
import nodemon from 'nodemon';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackClientConfigFactory from '../webpack/webpack.config.client';
import webpackServerConfigFactory from '../webpack/webpack.config.server';

const environment = process.env.NODE_ENV || 'dev';
const webpackClientConfig = webpackClientConfigFactory({dev: true});
const webpackServerConfig = webpackServerConfigFactory({dev: true});

const app = express();

// FIXME: should be able to pass the port dynamically (e.g. process.env.WEBPACK_PORT)
// Better yet, should be able to detect that a port is occupied and use a free one instead
const WEBPACK_PORT = 8081;

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

const start = async () => {
  (webpackClientConfig.entry as EntryObject).client = [
      `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
      ...(webpackClientConfig.entry as any).client,
  ];

  webpackClientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  webpackClientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

  const publicPath = webpackClientConfig.output.publicPath;

  webpackClientConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  webpackServerConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  let hasStartedNodemon = false; // poor man's `once`;

  const multiCompiler = webpack([webpackClientConfig, webpackServerConfig], () => {
    if (!hasStartedNodemon) {
      runNodemon();
      hasStartedNodemon = true;
    }
  });

  const [clientCompiler, serverCompiler] = multiCompiler.compilers;


  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: webpackClientConfig.output.publicPath,
      stats: webpackClientConfig.stats
    })
  );

  app.use(webpackHotMiddleware(clientCompiler));

  // app.use('/static', express.static(paths.clientBuild));

  app.listen(WEBPACK_PORT);
};

const runNodemon = () => {
  const serverBuildDirectory = path.resolve(__dirname, '../dist/server')
  const script = nodemon({
    script: `${serverBuildDirectory}/server.js`,
    watch: [
      serverBuildDirectory
    ],
    delay: 200,
  });

  script.on('restart', () => {
    console.log('Server-side app has been restarted.');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    console.log('An error occured. Exiting');
    process.exit(1);
  });
};

start();
