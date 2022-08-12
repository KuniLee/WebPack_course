const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const optimization = ()=>{
    const config = {
        //chunkIds:'named',
        runtimeChunk: devMode ? 'single': false,
        splitChunks: {
        chunks: "all"
    },
        minimize: false
    }
    if (!devMode){
        config.minimize = true
        config.minimizer = [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
    }
    return config
}

const thePlugins = () => {
    return [
      new HTMLWebpackPlugin({
          template: "./index.html",
          minify: !devMode
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
      }),
      new CopyPlugin({
          patterns: [
              {
                  from: path.resolve(__dirname, "src/favicon.ico"),
                  to: path.resolve(__dirname, 'dist')
              }
          ]
      }),
      new ESLintWebpackPlugin(),

  ]
    // if (!devMode){
    //     base.push( new BundleAnalyzerPlugin())
    // }


}

const sccLoaders = extra =>{
    const loaders = [MiniCssExtractPlugin.loader, "css-loader"]
    if (extra){
        loaders.push(extra)
    }
    return loaders
}

const config = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: "./index.js",
        //analytics: "./analytics.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".json", ".png"],
        alias: {
            "@models": path.resolve(__dirname, 'src/models'),
            "@": path.resolve(__dirname, 'src'),
        },
    },
    optimization: optimization(),
    plugins: thePlugins(),
    devtool: devMode ? "source-map" : false,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
            test: /\.css$/,
            use: sccLoaders(),
             },
            {
                test: /\.s[ac]ss$/,
                use:  sccLoaders( "sass-loader"),
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader'],
            }]
    },
    devServer: {
        port: 4200,
        compress: true,
        open: true,
    }
}


module.exports = config

