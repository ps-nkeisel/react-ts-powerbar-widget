const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const packageJSON = require('./package');

const ROOT = path.resolve(__dirname, 'app');
const DEV_ENV = process.env.NODE_ENV === 'development';

/** Create Environment variables */
const env = {
  NODE_ENV: process.env.NODE_ENV,
  VERSION: packageJSON.version,

  API_URL: process.env.API_URL || `https://${DEV_ENV ? 'apitest' : 'api'}.vuukle.com`,
  SESSION_COOKIE_NAME: 'token',
};

/** 💬 Log Environment Variables */
console.log('================== ENVIRONMENT ========================');
console.log(`Environment: `);
Object.keys(env).forEach((key) => {
  console.log(`${key}: ${env[key]}`);
});
console.log('=======================================================');

/** 📦 Webpack Config */
module.exports = {
  mode: DEV_ENV ? 'development' : 'production',
  devtool: DEV_ENV ? 'cheap-module-eval-source-map' : false,
  context: ROOT,
  target: 'web',
  entry: ['./index.tsx'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new tsconfigPathsPlugin()],
    modules: [ROOT, 'node_modules'],
    alias: {
      /**
       * Replace react with inferno.
       * Additionally, it loads inferno in dev mode based on environment
       */
      react: DEV_ENV
        ? path.resolve(__dirname, './tools/inferno-compat-dev.tsx')
        : path.resolve(__dirname, './tools/inferno-compat.tsx'),
      'react-dom': DEV_ENV
        ? path.resolve(__dirname, './tools/inferno-compat-dev.tsx')
        : path.resolve(__dirname, './tools/inferno-compat.tsx'),
    },
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        sourceMap: true,
        terserOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
  module: {
    rules: [
      // Preloader
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      { enforce: 'pre', test: /\.tsx?$/, exclude: /node_modules/, use: 'tslint-loader' },
      // Loaders
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { configFile: path.resolve(__dirname, '.babelrc') },
      },
      {
        test: /\.tsx?$/,
        include: /node_modules/,
        loader: 'babel-loader',
        options: { configFile: path.resolve(__dirname, '.babelrc') },
      },
    ],
  },
  plugins: [
    // Check for duplicate imports
    new DuplicatePackageCheckerPlugin(),
    // Simplifies creation of HTML files to serve webpack bundles.
    new HtmlWebpackPlugin({
      template: './index.ejs',
      filename: DEV_ENV ? 'index.html' : 'powerbar.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
      },
      // Inline sources only for prod build
      ...(DEV_ENV ? {} : { inlineSource: '.(js|css)$' }),
    }),
    // Create Environment Variables
    new webpack.DefinePlugin(
      Object.keys(env).reduce((current, keyValue) => {
        current[`process.env.${keyValue}`] = JSON.stringify(env[keyValue]);
        return current;
      }, {})
    ),
    // Additional Plugins based on environment
    ...(DEV_ENV
      ? []
      : [
          // Bundles HTML with inline JS/CSS, so we can have everything in one HTML file
          new HtmlWebpackInlineSourcePlugin(),
        ]),
  ],
  // Dev Server Config
  devServer: {
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
};
