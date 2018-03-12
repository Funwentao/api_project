const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        qr:'./src/js/container/qr.js'
    },
    output: {
        path: __dirname+"/dist",
        filename: "[name].js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['react', 'es2015','stage-0']
                    }
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test:/\.sass$/,
                loader: "style-loader!css-loader!sass-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            title: '二维码',
            filename: '../view/qr.html',
            template: './template.html',
            chunks:['qr']
        })
    ]
};