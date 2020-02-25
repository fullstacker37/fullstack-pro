const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname,
		filename: './release/bundle.js'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader'
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, './release'), // 将所有path片段连接在一起
		open: true, // 自动打开浏览器
		port: 9000
	}
}

// console.log(__dirname);
// console.log(path.join(__dirname, './release'));
// console.log(path.join(__dirname, 'hahah'));