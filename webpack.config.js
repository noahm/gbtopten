'use strict';

const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
    entry: {
        app: './client-src/main.tsx',
        vendor: Object.keys(packageJson['dependencies']),
    },
    output: {
        path: 'public/js',
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.webpack.js', '.web.js'],
    },
    module: {
        loaders: [
            { loader: 'json-loader', test: /\.json$/ },
            { loader: 'ts-loader', test: /\.tsx?$/, exclude: /node_modules/ },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],
};
