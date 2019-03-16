const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  watch: true,
  mode: "development",
  performance: { hints: false },
  devtool: "cheap-module-eval-source-map"
});
