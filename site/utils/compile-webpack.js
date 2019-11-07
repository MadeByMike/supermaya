const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MemoryFileSystem = require("memory-fs");
const mfs = new MemoryFileSystem();

const fs = require("fs");
const path = require("path");

const getWebpackFiles = compiler =>
  new Promise((resolve, reject) => {
    compiler.outputFileSystem = mfs;
    compiler.inputFileSystem = fs;
    compiler.resolvers.normal.fileSystem = mfs;
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        const errors =
          err || (stats.compilation ? stats.compilation.errors : null);
        console.log(errors);
        reject(errors);
        return;
      }
      const { compilation } = stats;
      const files = Object.keys(compilation.assets).reduce((acc, key) => {
        acc[key] = compilation.assets[key].source();
        return acc;
      }, {});
      resolve(files);
    });
  });

const resolveEntries = targets =>
  Object.keys(targets).reduce((acc, key) => {
    acc[key] = path.resolve(__dirname, "../../", targets[key]);
    return acc;
  }, {});

const getWebpackConfig = targets => ({
  mode: "production",
  devtool: "source-map",
  entry: resolveEntries(targets),
  output: {
    path: path.resolve(__dirname, "../../memory-fs/js/"),
    globalObject: "window"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
    // ToDo: add more rules and loaders?
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      KEYSTONE_API: "",
      BUILD_NUMBER: Date.now()
    })
  ]
});

module.exports = {
  compileWebpackTargets: targets =>
    getWebpackFiles(webpack(getWebpackConfig(targets)))
};
