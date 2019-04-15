import express from "express";
import webpack from "webpack";
import path from "path";

const app = express();

if (app.get("env") === "development") {
  const config = require("@vue/cli-service/webpack.config");
  const compiler = webpack(config);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: config.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use("/", express.static(path.join(__dirname, "../../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(3000, () => {
  console.log("Server start on port 3000");
});
