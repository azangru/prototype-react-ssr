// maybe try this? https://www.npmjs.com/package/nodemon-webpack-plugin

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('razzle-start-server-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.dev ? 'development' : 'production',
    target: 'node',
    watch: true,
    entry: {
      main: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, '../src/server/index.ts')
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: 'server.js'
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    externals: [nodeExternals({
      allowlist: 'webpack/hot/poll?1000'
    })],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.WEBPACK_DIRECTORY': JSON.stringify(__dirname)
      }),
      new StartServerPlugin()
    ]
  };
}
