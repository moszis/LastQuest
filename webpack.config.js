const path        = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        name: "client",
        entry: './client/scripts/game.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'client.dist.js'
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        }
    },
    {
        name: "server",
        entry: './server.js',
        context: __dirname,
        node: {
           __dirname: true
        },
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'server.dist.js'
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },
        externals: [nodeExternals()]
    }

];