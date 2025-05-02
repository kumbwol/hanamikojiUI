const path = require('path');

module.exports = {
    entry: './game/src/Main.ts',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build'),
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ]
    },
    devtool: 'source-map'
};
