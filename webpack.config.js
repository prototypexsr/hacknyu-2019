const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/clientApp.jsx",
  output: {
    path: path.resolve(__dirname, "dist/dev"),
    filename: "build.js"
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(jsx?$)|(tsx?$)/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};
