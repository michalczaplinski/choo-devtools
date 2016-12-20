module.exports = {
  entry: {
    index: "./src/index.js",
    test: "./test/index.js"
  },
  output: {
      path: "./dist",
      filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  // workaround for webpack fs problem
  node: {
    fs: "empty"
  }
};
