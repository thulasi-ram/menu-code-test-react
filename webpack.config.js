const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
});

module.exports = {
    entry: ['./src/App.js'],
    module: {
        rules: [
            {
                // using babel-loader for ts files: https://stackoverflow.com/a/68281449/6323666
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env', 
                                '@babel/preset-react', 
                                '@babel/preset-typescript'
                            ].map(require.resolve),
                        },
                    },
                ],
            },
        ],
    },
    output: {
        path: path.join(__dirname, '/public/webpack/'),
        filename: 'bundle.js',
    },
    plugins: [htmlPlugin],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
