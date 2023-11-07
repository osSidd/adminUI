const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.jsx",
    mode:"development",
    module:{
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {presets: ["@babel/env"]},
            },
            {
                test: /\.s[ac]ss$/i,
                use:["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {extensions: ["*",".jsx", ".js"]},
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist",
        filename: "bundle.js",
        clean:true,
    },
    devServer:{
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin({
        template: './public/index.html',
    })]
}