const path = require("path");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

module.exports = {
  entry: "./src/index.ts",
  target: "web",
  mode: "development",
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new ResolveTypeScriptPlugin()],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
};
