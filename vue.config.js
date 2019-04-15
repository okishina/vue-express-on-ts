const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  publicPath: "",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, "src/client/public"),
          to: path.join(__dirname, "dist"),
          toType: "dir",
          ignore: ["index.html", ".DS_Store"]
        }
      ])
    ]
  },
  chainWebpack: config => {
    let temp = config
      .entry("app")
      .clear()
      .add(path.join(__dirname, "./src/client/main.ts"));
    if (process.env.NODE_ENV === "development") {
      temp.add("webpack-hot-middleware/client");
    }
  }
};
