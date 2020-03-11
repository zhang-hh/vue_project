import Goods from "pages/goods/Goods";
import Sellers from "pages/sellers/Sellers";
import Ratings from "pages/ratings/Ratings";

export default [
	{path:'/api/goods',component:Goods},
	{path:'/api/sellers',component:Sellers},
	{path:'/api/ratings',component:Ratings},
	{path:'/',redirect:'/api/goods'} //重定向是值地址的重定向，所以写的字符串
]