const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const argv = require('yargs-parser')(process.argv.slice(2));
const pro = argv.mode == 'production' ? true : false;  //  区别是生产环境和开发环境
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 主题路径
const THEME_PATH = './src/common';
// 获取所有的主题
const resolveToThemeStaticPath = fileName => path.resolve(THEME_PATH, fileName);
// 过滤出来less 的文件
const themeFileNameSet = fs.readdirSync(path.resolve(THEME_PATH)).filter(fileName => /\.styl/.test(fileName));

// 排除主css打包时包含其他主题的样式
const themePaths = themeFileNameSet.map(resolveToThemeStaticPath);
const extractLess = new ExtractTextWebpackPlugin({filename: 'css/[name].[chunkhash].css'})

let plugins = [];
if (pro) {
    //  线上环境
    plugins.push(
        new CleanWebpackPlugin(),
        extractLess,
        new webpack.ProvidePlugin({
            moment: "moment",
            "window.moment": "moment"
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh-cn/),
        /**
         * 不去加载不用的locale
         * https://github.com/moment/moment/issues/2517
         * 减少200kb
         */
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh-cn/),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
            chunks: ['vendor', 'index',],  //  引入需要的chunk
            inject: true,
            // excludeChunks: ['themes']
        }),
    )
} else {
    //  开发环境
    plugins.push(
        extractLess,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),  // 热更新，热更新不是刷新
        new webpack.ProvidePlugin({
            moment: "moment",
            "window.moment": "moment"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['vendor', 'index',],  //  引入需要的chunk
            inject: true,
            // excludeChunks: ['themes']
        }),

    )
}
module.exports = {
    entry: {
        index: './src/index.js',
        redTheme: ["./themes/redTheme.js"],
        skyTheme: ["./themes/skyTheme.js"],
        cyanTheme: ["./themes/cyanTheme.js"],
        blueTheme: ["./themes/blueTheme.js"],
        greenTheme: ["./themes/greenTheme.js"],
        orangeTheme: ["./themes/orangeTheme.js"],
        purpleTheme: ["./themes/purpleTheme.js"],
        yellowTheme: ["./themes/yellowTheme.js"],
        defaultTheme: ["./themes/defaultTheme.js"],
        wineRedTheme: ["./themes/wineRedTheme.js"],
        blueGreyTheme: ["./themes/blueGreyTheme.js"],
        lightGreenTheme: ["./themes/lightGreenTheme.js"],
    },
    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: pro ? '[name].[chunkhash].js' : '[name].js',      // 打包后的文件名称
        path: path.resolve('build'),
        publicPath: "/"
        //  我们将会在 server 脚本使用 publicPath，
        //  以确保文件资源能够正确地 serve 在 http://localhost:3000 下，稍后我们会指定 port number(端口号)。接下来是设置自定义 express server：
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.(less|css)$/,     // 解析less
                exclude: themePaths,
                use: extractLess.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                }
                            }
                        }
                    ], // 从右向左解析
                })
            },
            {
                test: /\.styl$/,     // 解析scss
                use: extractLess.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', "stylus-loader"] // 从右向左解析
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            },
            // ...themeLoaderSet
        ]
    },
    plugins: plugins,
    resolve: {
        // 别名
        alias: {
            component: path.join(__dirname, 'src/component'),
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.styl', '.less']
    },
    // 疑问2？注释打开，我的build 文件夹里的主题css 就是空了
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                // utils: {
                //     // 抽离自己写的公共代码，utils里面是一个公共类库
                //     chunks: 'initial',
                //     name: 'utils',  //  任意命名
                //     minSize: 0    // 只要超出0字节就生成一个新包
                // }
            }
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true
    },
    devtool: pro ? '' : 'inline-source-map'
}