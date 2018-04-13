const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        qr:'./src/js/container/qr.js',
        login:'./src/js/container/login',
        home:'./src/js/container/HomeContainer',
        vendor:['react','react-dom','antd']
    },
    output: {
        path: __dirname+"/dist",
        filename: "[name].js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015','stage-0'],
                        plugins: [['import', {"libraryName": "antd", "style": "css"}]]
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
      /*  new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),*/
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin({
            title: '二维码',
            filename: '../view/qr.html',
            template: './template.html',
            chunks:['qr']
        }),
        new HtmlWebpackPlugin({
            title: '登录注册',
            filename: '../view/login.html',
            template: './template.html',
            chunks:['login','vendor']
        }),
        new HtmlWebpackPlugin({
            title: '主页',
            filename: '../view/home.html',
            template: './template.html',
            chunks:['home','vendor']
        }),
        new ExtractTextPlugin('[name].css')
    ]
};