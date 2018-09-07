const path = require('path');
const webpack = require('webpack');
// 在内存中生成HTML页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	// 入口
	entry: './src/index.js',
	// 出口
	output:{
		path:path.join(__dirname,'./dist'),//输出的地址
		filename:'bundle.js' //输出的文件名
	},
	// webpack-dev-server 配置命令
	devServer: {
		open: true, //自动打开浏览器
		port: 8088, //运行的端口
		contentBase: 'src', //托管的根目录
		hot: true //启用热更新(第一步)
	},
	plugins: [ //配置插件的节点(插件都放在这里面)
		//new一个热更新的模板对象(第二步)
		new webpack.HotModuleReplacementPlugin(),
		//创建一个在内存中生成HTML页面的插件
		new htmlWebpackPlugin({
			template: path.join(__dirname,'./src/index.html'), //指定模板页面
			filename: 'index.html'//指定生成页面的名称
		})
	],
	module: { //这个节点配置所有第三方模块加载器
		rules:[
			// 配置处理.css文件的第三方loader规则
			{test: /\.css$/,use: ['style-loader','css-loader']},
			// 配置处理.less文件的第三方loader规则
			{test: /\.less$/,use: ['style-loader','css-loader','less-loader']},
			// 配置处理.sass文件的第三方loader规则
			{test: /\.scss$/,use: ['style-loader','css-loader','sass-loader']},
			// 处理图片路径的loader
			// limit给定的值是图片的大小，单位是byte，图片的原始尺寸大于等于limit值，则不会转换成base64格式的字符串，反之会转成base64的字符串
			// name=[name].[ext]固定写法，图片的原始名称和类型
			{test:/\.(jpg|png|gif|jpeg|bmp)$/,use:'url-loader?limit=594558&name=[hash:8]-[name].[ext]'},
			// 处理字体图片的loader
			{test:/\.(ttf|eot|svg|woff|woff2)/,use:'url-loader'},
			// 配置babel，用于转换高级语法
			{test: /\.js$/,use:'babel-loader',exclude: /node_modules/},
			{test: /\.vue$/,use:'vue-loader'}
		]
	},
	resolve: {
		alias: { //修改Vue被导入包的路径(完整版)
			"vue$": "vue/dist/vue.js"
		}
	}
}