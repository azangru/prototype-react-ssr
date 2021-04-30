// maybe try this? https://www.npmjs.com/package/nodemon-webpack-plugin

import path from 'path';
import webpack, { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env: Record<string, unknown>): Configuration => {
  return {
    mode: env.dev ? 'development' : 'production',
    target: 'node',
    watch: true,
    entry: {
      server: path.resolve(__dirname, '../src/server/index.ts')
      // main: [
      //   'webpack/hot/poll?1000',
      //   path.resolve(__dirname, '../src/server/index.ts')
      // ]
    },
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: 'server.js',
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|gif|png|jpe?g)$/,
          type: 'asset/resource'
        },
        {
          test: /.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    externals: [nodeExternals()],
    // externals: [nodeExternals({
    //   allowlist: 'webpack/hot/poll?1000'
    // })],
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin(),
      // new webpack.DefinePlugin({
      //   'process.env.WEBPACK_DIRECTORY': JSON.stringify(__dirname)
      // }),
      // new StartServerPlugin()
    ]
  };
}
