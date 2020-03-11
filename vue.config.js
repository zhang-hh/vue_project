const path = require('path');
const data = require("./src/mock/data.json");
//__dirname是当前文件所在目录 vue_project
function resolve(dir){
	return path.join(__dirname,dir)
}
module.exports = {
	//代码修改了之后vue脚手架会自动进行编译
	/*true时候不会影响编译，代码的执行，只会在命令行中进行警告
	* error的时候，会中断编译，代码是无法运行的，在命令行也有警告*/
	lintOnSave:false, //跳过eslint代码检查
	//vue 脚手架的配置
	devServer:{
		open:true, //自动打开浏览器
		//mock接口 这样写的mock数据是可以通过http地址栏和axios发送请求处理的
		/*before(app){
			// app相当于我们express中的app,他是一个路由,可以用来接收请求
			app.get('/api/sellers',(req,res) =>{
				res.json({
					errorno:0,
					data:data.sellers,
				})
			})
			app.get('/api/goods',(req,res) =>{
				res.json({
					errorno:1,
					data:data.goods,
				})
			})
			app.get('/api/ratings',(req,res) =>{
				res.json({
					errorno:0,
					data:data.ratings,
				})
			})
		}*/
	},
	//这是webpack的原生配置,在在这里是也可以写devServer属性但是和上边的devServer不是一回事
	configureWebpack:{
		resolve:{
			// 别名配置
			alias:{
				'@':resolve('src'),
				'components':resolve('src/components'),
				'pages':resolve('src/pages')
			}
		}
	},
};