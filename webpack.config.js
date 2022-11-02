/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./bundle.[fullhash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js", "json", "scss"],
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader",
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCss.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      favicon: "static/favicon.ico",
    }),
    new MiniCss({
      filename: "style.[fullhash].css",
    }),
  ],
};
