import webpack, { EntryObject } from 'webpack';

import webpackClientConfigFactory from '../webpack/webpack.config.client';
import webpackServerConfigFactory from '../webpack/webpack.config.server';

const webpackClientConfig = webpackClientConfigFactory({dev: false});
const webpackServerConfig = webpackServerConfigFactory({dev: false});

const build = () => {

  const multiCompiler = webpack([webpackClientConfig, webpackServerConfig], () => {
    console.log('done!');
  });

};

build();
