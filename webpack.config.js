const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const isProduction = env.production;

  return {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index'),
    target: 'web',
    output: {
      filename: `index.js?v${Date.now()}`,
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.less$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.less'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/home', 'index.pug'),
        filename: './index.html',
      }),
      new CopyPlugin({
        patterns: [{ from: './public/', to: './' }],
      }),
      new MiniCssExtractPlugin({
        filename: `index.css?v${Date.now()}`,
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      port: '3001',
      hot: true,
    },
  };
};
