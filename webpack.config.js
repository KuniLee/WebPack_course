const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

const config = {
    context: path.resolve(__dirname,'src'),
    mode: "development",
    entry: {
        main: "./index.js",
        analytics: "./analytics.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HTMLWebpackPlugin({
            // title: "Webpack Course",
            template: "./index.html"
        }),
        new CleanWebpackPlugin()
    ]
}

module.exports = config