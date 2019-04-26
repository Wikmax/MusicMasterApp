const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './app/app.jsx',
    output: {
        path: path.resolve(__dirname, '.build'),
        filename: 'index.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg|jpg)$/,
                use: 'file-loader'
            },
            {
                test: /\.png|jpg$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        mimetype: 'image/png',
                        mimetype: 'image/jpg'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    devServer: {
        contentBase: './build',
        historyApiFallback :true
    }
}

module.exports = config;