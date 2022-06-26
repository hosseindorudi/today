const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  return {
    mode,
    entry: "./src/index.js",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    output: {
      path: path.join(__dirname, "/build"),
      filename: "bundle.[contenthash].js",
      clean: true,
      publicPath: "/",
    },
    devServer: {
      historyApiFallback: true,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   "process.env": { NODE_ENV: JSON.stringify(mode) },
      // }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  };
};
