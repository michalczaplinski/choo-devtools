module.exports = {
    entry: "./src/index.js",
    output: {
        path: "./dist",
        filename: "bundle.js"
    }
    // module: {
    //     loaders: [
    //         { test: /\.css$/, loader: "style!css" }
    //     ]
    // }
};
