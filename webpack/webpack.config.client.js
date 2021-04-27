const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const webpackConfigDir = env.webpackConfigDir || __dirname;
  return {
    mode: env.dev ? 'development' : 'production',
    watch: true,
    entry: {
      client: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.resolve(webpackConfigDir, '../src/client/index.tsx')
      ]
    },
    output: {
      path: path.resolve(webpackConfigDir, '../dist'),
      filename: 'client.js'
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
  };
}
