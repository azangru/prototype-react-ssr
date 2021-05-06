import path from 'path';
import webpack, { Configuration } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import LoadablePlugin from '@loadable/webpack-plugin';

export default (env: Record<string, unknown>): Configuration => {
  return {
    mode: env.dev ? 'development' : 'production',
    watch: true,
    devtool: "eval-cheap-source-map",
    entry: {
      client: [
        path.resolve(__dirname, '../src/client/index.tsx')
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/static/',
      filename: '[name].js',
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        // images and fonts
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin(),
      new WebpackManifestPlugin({
        writeToFileEmit: true
      }),
      new LoadablePlugin({
        writeToDisk: true
      })
    ]
  };
}
