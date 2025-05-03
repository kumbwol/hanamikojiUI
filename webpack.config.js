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
    devServer: {
        static: {
            directory: path.join(__dirname, './'), // serves index.html from root
        },
        compress: true,
        port: 3000, // or any port you want
        open: true, // opens browser automatically
    },
    devtool: 'source-map'
};
