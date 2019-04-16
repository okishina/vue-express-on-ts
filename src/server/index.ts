import express from "express";
import webpack from "webpack";
import path from "path";
import history from "connect-history-api-fallback";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setWebpackDev();
    this.setConfig();
    this.setStaticFiles();
  }

  public run(): void {
    this.app.listen(3000, () => {
      console.log("\nServer start on port http://localhost:3000");
    });
  }

  private setWebpackDev(): void {
    if (this.app.get("env") === "development") {
      const config = require("@vue/cli-service/webpack.config");
      const compiler = webpack(config);
      this.app.use(
        require("webpack-dev-middleware")(compiler, {
          publicPath: config.output.publicPath
        })
      );
      this.app.use(require("webpack-hot-middleware")(compiler));
    }
  }

  private setConfig(): void {
    this.app.use(history());
  }

  private setStaticFiles(): void {
    this.app.use("/", express.static(path.join(__dirname, "../../dist")));
    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../../dist/index.html"));
    });
  }
}
