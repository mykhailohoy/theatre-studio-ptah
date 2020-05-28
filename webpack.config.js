var path = require("path");

module.exports = {
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.jpg$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: '[path][name].[ext]',
          // context: path.resolve(__dirname, "../"),
          // outputPath: 'dist/',
          publicPath: '/',
          useRelativePaths: true
        }
      }
    ]
  }
};