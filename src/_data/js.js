const webpack = require("webpack");
const MemoryFileSystem = require("memory-fs");
const fs = require("fs");
const path = require("path");
const { scripts } = require("./site");

const getWebpackFiles = compiler =>
  new Promise((resolve, reject) => {
    const mfs = new MemoryFileSystem();
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

const resolvedEntries = Object.keys(scripts).reduce((acc, key) => {
  acc[key] = path.resolve(__dirname, "../../", scripts[key]);
  return acc;
}, {});

const webpackConfig = {
  entry: resolvedEntries,
  output: {
    path: path.resolve(__dirname, "../../memory-fs/js/"),
    filename: "[name]",
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
      }
    ]
  }
};
module.exports = getWebpackFiles(webpack(webpackConfig));
