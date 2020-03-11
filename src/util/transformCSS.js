/*函数名:transformCSS
* 作用是:
*       -设置元素的 transform 变形
*       -获取元素的 transform 变形值
* 事例
*   设置变形
*       #box div translateX 200px
*       transformCSS(box,'translateX',200) ==> box.style.transform = 'translate(200px)'
*       transfromCSS(box,'scale',2)
*       transformCSS(box,'rotate'.45deg)
*
*   获取元素的变形样式值
*       var x = transformCSS(box,'translate') ==> 200
*    根据参数的不同函数的功能不同*/
//封装的函数会样式层叠,必须有一个东西保存下来上一次的设置的属性
/*仓库中应该是:  {translateX:200,scale:2}*/

//但是不能读取css设置的transform属性
export function transformCSS(ele, type, value) {
	if (ele.store === undefined){
		ele.store = {}//不能每调用一次函数就创建一次对象
	}
	//设置
	if (arguments.length === 3) {
		//type是一个变量,我们希望用变量的值作为属性名,必须用中括号语法
		ele.store[type] = value;
		var str = '';
		for (var i in ele.store) {
			switch (i) {
				case 'translateX':
				case 'translateY':
				case 'translateZ':
					str +=  i+ '(' + ele.store[i] + 'px)';
					break;
				case 'scale':
				case 'scaleX':
				case 'scaleY':
				case 'scaleZ':
					str +=  i+ '(' + ele.store[i] + ')';
					break;
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
					str +=  i+ '(' + ele.store[i] + 'deg)';
					break;
			}
		}
		//    设置样式
		ele.style.transform = str;
	}
	//读取
	if(arguments.length ===2){
		//如果 store 中存在了了该属性则返回,如果不存在则返回默认值
		//    translate 0 rotate 0 scale 1
		if(ele.store[type] !== undefined){
			return ele.store[type];
		}else {
			//判断变量的值是不是 scale 系列  前五个字符是不是scale
			if(type.substr(0,5) === 'scale'){
				return 1;
			} else {
				return 0;
			}
		}
	}

}