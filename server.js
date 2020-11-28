const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const app = express();
const compiler = webpack(webpackConfig);

const api = require('./api/rest');

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 20000
}));

app.use(express.static(path.join(__dirname, 'src')));

app.use('/api', api);

app.listen(8080, '127.0.0.1', () => {});

module.exports = app;
