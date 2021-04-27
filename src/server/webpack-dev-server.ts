import { Express } from 'express';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackClientConfigFactory from '../../webpack/webpack.config.client';

export const setupDevServer = (app: Express) => {
  const webpackClientConfig = webpackClientConfigFactory({
    dev: true,
    webpackConfigDir: process.env.WEBPACK_DIRECTORY
  }) as Configuration;
  
  const compiler = webpack(webpackClientConfig, () => {
    console.log("COMPILED!");
  });
  
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackClientConfig.output.publicPath,
    })
  );
  
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 1 * 1000,
    })
  );
};
