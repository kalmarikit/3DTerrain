const path = require('path')
module.exports = {
    watch: true,
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    devServer: {
        port: 5500,
        historyApiFallback: true,
        hot: true,
    },
};
