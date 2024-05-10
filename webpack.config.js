const path = require("path");
module.exports = {
  entry: "./src/index.js", // Update with the entry point of your React app
  output: {
    path: path.resolve(__dirname, "dist"), // Update with your desired output directory
    filename: "bundle.js",
  },
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
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"), // Update with your public directory
    port: 3000, // Specify the port number you want to use
  },
};
