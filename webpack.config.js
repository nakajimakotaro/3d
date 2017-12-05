module.exports = {
    entry: {
        "script": "./src/script.ts",
    },
    output: {
        filename: "script.js",
        path: __dirname + "/public/",
    },
    devtool: 'source-map',
    devServer: {
        contentBase: 'public/',
        inline: true,
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},
        ]
    },
    plugins: []
};
