const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const path = require('path')

const _DevOrPro = process.env.NODE_ENV.indexOf('development') != -1
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('_DevOrPro:', _DevOrPro)

module.exports = {
    mode: _DevOrPro ? 'development' : 'production',
    devtool: _DevOrPro ? 'source-map' : false, // 能够将已转换的代码映射到原始的文件使浏览器可以重构原始源并在调试器中显示重建的原始源，方便调试，生成环境需要关闭这个功能配置
    performance: {
        hints: _DevOrPro ? false : 'warning', // 配置如何展示性能提示
    },
    watchOptions: {
        ignored: ['**/node_modules']
    },
    entry: [
        './src/main.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录的路径
        publicPath: '/', // 此输出目录对应的公开 URL
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        clean: true // 清空输出目录，webpack5开始可以直接配置清空，不再需要安装CleanWebpackPlugin
    },
    // 在项目中我们导入文件的时候，发现有.js结尾的文件在导入时可以不写后缀，而.vue、.scss的不行，这些都是由webpack的解析选项设置决定的
    resolve: {
        // 导入时想要省略的扩展名列表。注意，不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
        // 配置别名alias，比如常见的@/
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        // 忽略某些通过引入外部js得到全局的变量
        // externals: {
        //     'BMapGL': 'BMapGL',
        // }
    },
    devServer: {
        host: '127.0.0.1', // 启动服务器域名
        port: '8080', // 启动服务器端口号
        open: false, // 是否自动打开浏览器
        compress: true, // 启用gzip压缩
        hot: true, // 使用HMR在模块改变的时候进行局部的替换更新 默认是true
        historyApiFallback: true,
        proxy: {
            '/api/v1': {
                target: 'http://127.0.0.1:7001/api/v1', // 代理目标地址
                secure: false, // 接受在 HTTPS 上运行且证书无效的后端服务器
                changeOrigin: true, // 服务器源跟踪
                pathRewrite: { '^/api/v1': '' } // 路径重写
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@import "/src/assets/css/global.scss";`,
                            sassOptions: {
                                includePaths: [__dirname]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']]
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            additionalData: `@import "/src/assets/css/global.less";`,
                            lessOptions: {
                                includePaths: [__dirname]
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 60 * 1024 // 小于60kb的图片会被base64处理
                    }
                },
                // 配置资源输出位置和名称
                generator: {
                    // 将图片文件输出到 imgs 目录中
                    // 将图片文件命名 [name][hash:6][ext][query]
                    // [name]: 之前的文件名称
                    // [hash:6]: hash值取6位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: 'imgs/[name][hash:6][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset",
                generator: {
                    filename: 'fonts/[name]_[hash:6][ext]' // 指定打包后文件存放的文件夹和文件名
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|test)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        inline: true
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '页面标题',
            template: './public/index.html'
        }),
        new DefinePlugin({
            BASE_URL: '"/"',
            __VUE_OPTIONS_API__: true, // 是否支持optionsApi
            __VUE_PROD_DEVTOOLS__: false // 在生产环境下是否支持devtools
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new VueLoaderPlugin()
    ]
}
