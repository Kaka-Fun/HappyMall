const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置， dev / online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);


// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, title) {
    return {
        template :  './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title   : title,
        inject : true,
        hash : true,
        chunks : ['common', name]
    }
};
const config = {
    entry: { //入口
        'common':['./src/page/common/index.js'], //全局样式，逻辑
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
        'result':['./src/page/result/index.js']
    },
    output: { //出口
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: { //引入外部变量
      'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader')},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({ //通用模块
            name : 'common',
            filename : 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ] 
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;