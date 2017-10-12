const path = require('path');

module.exports = {
    entry: './client/scripts/src/game.js',
    output: {
        path: path.resolve(__dirname, 'client/scripts/dist'),
        filename: 'game.dist.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }

}