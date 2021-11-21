const path = require('path')
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        // 打包后的文件中不用箭头函数,是webpack自己生成的,没有经过babel转化,所以IE不兼容
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    "mode": "development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            "chrome": "87",
                                            "ie": "11"
                                        },
                                        "corejs": "3",
                                        // 按需引用corejs
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node-modules/
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    // 从下向上执行loader
                    "style-loader",
                    "css-loader",
                    {
                        // 引入postcss(相当于js的babel)
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env",
                                    {
                                        browsers: 'last 2 versions'
                                    }
                                ]
                            }
                        }
                    },
                    "less-loader"
                ],
                exclude: /node-modules/
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}