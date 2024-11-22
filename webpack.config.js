const path = require("path");

const { DefinePlugin } = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

/** @type {import('webpack').Configuration} */
module.exports = {
    devtool: "source-map",
    entry: "./src/index.tsx",
    mode: NODE_ENV || "production",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        assetModuleFilename: "assets/[name].[contenthash][ext]",
        chunkFilename: "[name].[contenthash].js",
        hashDigestLength: 16,
        clean: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(tsx?)$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            logLevel: "warn",
                            configFile: "tsconfig.app.json"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|ttf|eot|ico)$/,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: ".env",
            systemvars: true
        }),
        new DefinePlugin(
            Object.entries({
                ...process.env,
                VERSION: require("./package.json").version
            })
                .map((x) => ({ ["process.env." + x[0]]: JSON.stringify(x[1]) }))
                .reduce((x, y) => Object.assign(x, y), {})
        ),
        new HtmlWebpackPlugin({
            title: "enishi" + (NODE_ENV === "development" ? " - dev" : ""),
            minify:
                NODE_ENV === "production"
                    ? {
                          caseSensitive: true,
                          collapseBooleanAttributes: true,
                          collapseInlineTagWhitespace: true,
                          collapseWhitespace: true,
                          decodeEntities: true,
                          preserveLineBreaks: true,
                          useShortDoctype: true
                      }
                    : false,
            excludeChunks: ["firebase-messaging-sw"],
            filename: "index.html",
            template: "src/index.html"
        }),
        new CopyPlugin({
            patterns: [{ from: "static", to: "" }]
        }),
        ...(NODE_ENV === "production"
            ? [
                  new ESLintPlugin(),
                  // new BundleAnalyzerPlugin(),
                  new DuplicatePackageCheckerPlugin()
              ]
            : [])
    ],
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial"
        }
    },
    devServer: {
        open: true,
        hot: true,
        historyApiFallback: true,
        static: "static",
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        },
        port: 4200
    }
};
