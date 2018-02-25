/**
 * @author arielmzg@163.com
 * @date  2018-2-19
 * @webpack 配置文件
 */
const path=require('path');
const process=require('process');
const webpack=require('webpack');
const glob=require('glob');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const BUILD=path.join(__dirname,'dist');
const URL='127.0.0.1';
const PORT=process.env.PORT||1024+Math.floor(64510*Math.random());

const webpackConfig={
    // entry:{
    //     index:'./src/index.js',
    //     test:'./src/test.js'
    // },
    entry:{
        common:['react','react-dom']
    },
    output:{
        filename:'js/[name].[hash].js',
        path:BUILD, 
        publicPath:'/' 
        // __dirname+'dist' √
        // path:'/dist', X(绝对路径，可能和电脑的根路径有关)
    },
    resolve:{
        extensions: [ '.js','.jsx', '.json','.css','pcss' ],
    },
    module:{
        rules:[
            // {
            //     test: /\.jsx?$/,
            //     use: ['react-hot-loader/webpack'],
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                // 移动entry chunk中的*.css文件独立
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.(png|svg|jpg|git)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(BUILD),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/common.js',
            children:true,
        }),

        // extract-text-webpack-plugin 的loader和plugin是一起使用的
        // loader相当于处理提取css文件，plugin相当于输入css文件
        new ExtractTextWebpackPlugin({
            // 修改输出css文件名，传入getPath作为参数
            filename:  (getPath) => {
              return getPath('css/[name].css');
            },
            allChunks: true
        }),
        // new HtmlWebpackPlugin({
        //     title:'webpack configs',
        //     filename:'entry/reactTest.html',
        //     template:path.join(__dirname,'src/index.html'),
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ 
            // 坑啊。。。。
            // 这边忘记加http:// 一直在本地找127.0.0.1 。。。。。
            url: `http://${URL}:${PORT}/entry/reactTest.html`, 
            publicPath:'/'
        })
    ],
    devServer:{
        host: URL,
        port: PORT,
        hot:true,
    }
}

const entryList=glob.sync(path.join(__dirname,'src/entry/*.js'));
console.log(entryList);
const entryName=entryList.map((name)=>{
    return path.basename(name,'.js');
});
console.log(entryName);

entryName.forEach((name)=>{
    console.log(name);
    const entry=webpackConfig.entry;  //entry在前面需要定义为对象
    
    // entry: {[entryChunkName: string]: string|Array<string>}
    entry[name]=[path.join(__dirname,`src/entry/${name}.js`)];
    entry[name].unshift('react-hot-loader/patch');

    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            title:`${name} Page`,
            filename:`entry/${name}.html`,
            template:path.join(__dirname,'src/index.html'),

            // 限制加载的chunk
            // 如果不加这句：index.html和reactTest.html中都引入index.js和reactTest.js
            chunks:['common',name]
        })
    )
});


module.exports=webpackConfig;