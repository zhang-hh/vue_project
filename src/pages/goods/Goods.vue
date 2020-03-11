<template>
    <div class="goods">
    <!--食物的类型的滑屏区域-->
        <div class="typeWrap" ref="typeWrap">
            <ul class="typeList" ref="typeList">
                <!--在vue中要记得class经常要用-->
                <!--在循环当中active是当当前的currentIndex和循环的index相等时选中-->
                <li class="typeItem" v-for="(item,index) in goods"
                :key="index"
                :class="{active:currentIndex===index}"
                @click="handleTypeItem(index)"
                >
                    <Icon :size="3" :type="item.type" class="icon" v-if="item.type>=0"></Icon>
                    <span class="text">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <!--食物列表的滑屏区域-->
        <div class="foodsWrap" ref="foodsWrap">
            <ul class="foodsList" ref="foodsList">
                <li class="foodsItem" v-for="(good,index) in goods" :key="index">
                    <h2 class="title">{{good.name}}</h2>
                    <ul class="foodList">
                        <li class="foodItem" v-for="(food,index) in good.foods" :key="index">
                            <Food :food="food" ></Food>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--购物车组件-->
        <Cart class="cart"
        :seller="seller"
        :selectFoods="selectFoods"
        @clearAll="clearAll"
        >
        </Cart>
    </div>
</template>

<script>
/*实现右侧列表的联动功能
*   1.定义一个数组存放右侧列表的每一项的位置
*       注意渲染问题,需要使用$nextTIck
*   2.拿到右侧的实时滑动的距离
*        注意:better-scoll是默认不派发scroll钩子的
*        要通过配置new BScroll(this.$refs.foodsWrap,{probeType:3});
*        probeType会实时触发
*   3.判断一下实时位置 坐落在第一步拿到数组那个区间
*   这个区间对应的下标就是我们应该选中那一项
*   4.左侧的列表在被选中的时候左侧的列表要尽可能的往上顶到头
*       我们对滑屏的初始化是在nextNick中做的
*       那在vue初始化渲染的时候,滑屏是没有被注册的,
*       所以我们要在先判断一下滑屏是否已经被注册
*  this.typeScroll && this.typeScroll.scrollToElement(targetLi,200)
*   5.点击左侧的列表的时候右边的列表要自动的同步到相应的位置
*       默认情况下better-scoll是不会派发click事件的
*      new BScroll(this.$refs.typeWrap,{click:true});
* */
	import Icon from "../../components/icon/Icon";
	import BScroll from 'better-scroll'
	import Food from "../../components/food/Food";
import Cart from "../../components/cart/Cart";
	export default {
		name: "Goods",
		components: {Cart, Food, Icon},
		props:{
		    seller:Object
		},
		data(){
		    return{
		        goods:[],
			    locations:[], //代表存放右侧列表的每一项的位置数组
			    scrollY:0,//代表右侧列表的实时滑动的位置
		    }
		},
		computed:{
			//最后要进行计算当前的currentIndex,根据scrollY和 locations来确定currentIndex
			currentIndex(){
			    let {scrollY,locations} = this;
			    let index  = locations.findIndex((location,index) =>{
			        //判断实时的滑动位置是数组的那个区间
			        return scrollY >= location && scrollY< locations[index+1]
			    });
			    //左侧的列表要尽可能的往上顶到头
			    //对于下一次的index的改变,当前这个oldIndex可以被认为是上一次的index
			    if (this.oldIndex!== index) {
                    //说明了index产生了变换
			    	this.oldIndex = index;
			    	//index 改变的时候就要找到当前的li
			    	let targetLi = this.$refs.typeList.children[index];
			    	//在这里我们出现问题了 拿不到this.foodsScroll,
			    	// 因为计算属性字初始化渲染的时候,就执行了了一次,此时的滑屏没有注册
				    this.typeScroll && this.typeScroll.scrollToElement(targetLi,200)

			    }

				return index;
			},
			/*购物车的选中食物是根据遍历goods的所有商品看看有没有count属性的*/
			selectFoods(){
			    let selectFoods = [];
			    this.goods.forEach((good) =>{
			        good.foods.forEach((food) =>{
			            if (food.count > 0) selectFoods.push(food)
			        })
			    })

			    return selectFoods;
			}
		},
		methods:{
            //初始化滑屏
            _initScroll(){
	            //    让左侧的列表元素产生滑屏
	            this.typeScroll = new BScroll(this.$refs.typeWrap,{click:true});
	            //   让右侧的列表元素产生滑屏

	            /*foodsScroll 为什么不需要在data中进行注册?
	            *   因为foodsScroll他不是一个想要在界面上显示的数据
	            *   而且这个footsScroll他不是其他数据所需要的依赖
	            *   所以foodsSrcoll不需要具备响应式的能力,就不用在data中注册
	            *
	            *   那为什么locations和scrollY也不需要在界面上显示,要在data中进行注册呢?
	            *   因为他们是currentIndex的依赖,currentIndex是要在界面是显示的
	            * */

	            this.foodsScroll=new BScroll(this.$refs.foodsWrap,{
	                probeType:3,
	                click: true
	            });
	            /*这个scroll钩子在默认情况下是不会执行的,probeType的默认值是0*/
	            //{x,y}对象的解构赋值
	            this.foodsScroll.on('scroll',({x,y}) =>{
		            this.scrollY = Math.abs(y)
	            })
            },
            _initLocation(){
            //    1.拿到每一个li节点
                let foodsItems = this.$refs.foodsList.children;
                let location = 0;
                let locations = [location];
                //2.将foodsItem转化为一个真数组,进行循环
	            Array.from(foodsItems).forEach((foodItem) =>{
		            location += foodItem.offsetHeight;
		            locations.push(location)
	            });
	            this.locations = locations;

            },
            //点击右侧的列表,左侧自动滑屏
			handleTypeItem(index){
				const location = this.locations[index];
				this.foodsScroll.scrollTo(0,-location)
			},
			//清空购物车
			clearAll(){
			  this.selectFoods.forEach((selectFood) =>{
                  //selectFoods里面拿到的也是一个一个的food,selectFood和上边的food是一个,将food的count属性变为0,
                  // 计算属性就会重新计算,就不会往选中队列存了
				  selectFood.count = 0
			  })
			}
		},
		async mounted() {
		//代表vue渲染的节点,刚刚被挂载到DOM树上!!但是可能界面还没有渲染成功
        /*vue数据驱动视图更新的逻辑是：data变化 --> nextTick触发 --> 更新vdom --> 新旧vdom对比 --> 生成dom更新视图。
            js单线程的原因，nextTick里面写的代码会在生成dom这步后面执行，所以一般在这里拿最新的dom
            
            但是如果在这里用一个匿名函数的话,里面的回调是异步函数,那就成了先执行的是nextTick的回调,在执行匿名函数的回调,
            执行nextTick的回调的时候数据还没成功回来,就拿不到Array.from(foodsItems)
        */
            
            const {status,data} = await this.myAxios.get('api/goods');
            if (status) this.goods = data;
		//	获取右侧列表的每一项的位置去组装一个数组.
		//	将回调延迟到下一次的DOM的更新循环之后执行
            this.$nextTick(() =>{
	            this._initScroll();
	            this._initLocation();
            })
        //    为购物车添加事件注册总线
            this.bus.$on('addCount',(food) =>{
                if (food.count)food.count++;
                //count属性没有在data中注册,为对应的food添加一个响应式数据count
                else this.$set(food,'count',1)
            })
			this.bus.$on('reduceCount',(food) =>{
				if (food.count)food.count--;
			})
		}
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/extend.styl"
.goods
    display flex
    position absolute
    left 0
    right 0
    bottom 46px
    top 174px
    overflow hidden
    .typeWrap
        flex 0 0 80px //不用分配空间,给一个基准值
        .typeList
            @extend .clearfix
            .typeItem
                one-px(rgba(7,17,27,.1))
                height 54px
                background-color #f3f5f7
                display flex
                align-items center
                justify-content center
                &:after   /*使用了混合之后就会加上了一个after伪类,通过改变他自己的伪类改变宽度*/
                    /*为什么没有居中成功?因为当时定义混合的时候是写的相对定位的
                    所以虽然宽度变短了但是位置没有改变的,可以将定位的样式重置,在块级元素居中*/
                    width 56px
                    left 0
                    right 0
                    margin 0 auto
                &.active
                    background-color pink //当前选中的li
                .icon
                    vertical-align top
                .text
                    font-size 12px
                    line-height 14px
                    font-weight 200
                    color gray
    .foodsWrap
        flex 1 //让foodsWrap分配富裕空间分配前的是百分之0
        .foodsList
            @extend .clearfix
            .foodsItem
                .title
                    height 26px
                    background-color #f3f5f7
                    border-left 3px solid #d9dde1
                    font-size 12px
                    line-height 26px
                    color rgba(147,153,159,1)
                .foodList
                    .foodItem
                        padding 18px
                        .food
                            one-px(rgba(7,17,27,.1))
                        &:last-child //应该是最后一个的li
                            .food
                                broder-none()



</style>