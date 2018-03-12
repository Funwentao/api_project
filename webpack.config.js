const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },
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
        }),
        new ExtractTextPlugin('[name].css')
    ]
};