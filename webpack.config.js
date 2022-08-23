const path    = require('path');
const webpack = require('webpack');

function interpreterConfig(
    mode     = 'development',
    filename = 'js-interpreter.js',
    devtool = false
) {
    return {
        mode,
        externals: {
            'vm': 'commonjs vm'
        },
        module: {
            rules: [
                {
                    test: require.resolve("./original-repo/interpreter.js"),
                    loader: 'exports-loader',
                    options: {
                        type: 'commonjs',
                        exports: 'Interpreter',
                    },
                }
            ]
        },
        entry : path.resolve(__dirname, 'src', 'js-interpreter.js'),
        output: {
            filename,
            globalObject : 'this',
            library      : 'JSInterpreter',
            libraryExport: 'default',
            libraryTarget: 'umd',
            path         : path.resolve(__dirname, 'lib'),
        },
        devtool: devtool ? 'cheap-source-map' : false,
    };
}

function cliConfig(
    mode     = 'development',
    filename = 'js-interpreter.js',
    devtool = false
) {
    return {
        mode,
        externals: {
            'vm': 'commonjs vm'
        },
        module: {
            rules: [
                {
                    test: require.resolve("./original-repo/interpreter.js"),
                    loader: 'exports-loader',
                    options: {
                        type: 'commonjs',
                        exports: 'Interpreter',
                    },
                }
            ]
        },
        entry : path.resolve(__dirname, 'src', 'cli.js'),
        target: 'node',
        output: {
            filename,
            path    : path.resolve(__dirname, 'lib'),
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: '#!/usr/bin/env node',
                raw   : true,
            }),
        ],
        devtool: devtool ? 'cheap-source-map' : false,
    };
}

module.exports = [
    interpreterConfig('development', 'js-interpreter.js', false),
    interpreterConfig('production', 'js-interpreter.min.js', true),
    cliConfig('development', 'cli.js', false),
    cliConfig('production', 'cli.min.js', true),
];
