<template>
    <div>
        <div class="cart">
            <div class="left" @click="flodFn">
                <div class="outCircle">
                    <div class="inCircle" :class="{active: totalCount>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <span class="bubble" v-show="totalCount">{{totalCount}}</span>
                </div>
                <div class="totalPrice" :class="{active:totalPrice>0}">
                    <span>￥{{totalPrice}}</span>
                </div>
                <div class="deliveryPrice">
                    <span>另需配送费￥{{seller.deliveryPrice}}元</span>
                </div>
            </div>
            <div class="right"
                 :class="{active:this.seller.minPrice<=this.totalPrice}"
            >
                <span v-if="rightText">{{rightText}}</span>
            </div>
            <div class="balls">
                <transition
                        v-for="ball in balls"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"
                >
                    <i class="ball" v-show="ball.show"></i>
                </transition>
            </div>
        </div>
        <!--cart是一个fixed定位的元素,尽量不要在fixed里面在fixed和absolute定位  -->
        <div class="list" v-show="showList" >
            <div class="header">
                <span class="cartContent">购物车</span>
                <span class="clearCart" @click="clearAll">清空</span>
            </div>
            <div class="content" ref="listContent">
                <ul>
                    <li class="item" v-for="selectFood in selectFoods">
                        <span class="left">{{selectFood.name}}</span>
                        <div class="right">
                            <span class="price">￥{{selectFood.count *selectFood.price}}</span>
                            <Contorl class="contorl" :food="selectFood"></Contorl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--mask出来的时候一定是购物车有东西,再次点击直接将相应式数据修改了,计算属性就会重新计算-->
        <div class="mask" v-show="showList" @click="flod=true"></div>
    </div>
</template>

<script>
    import {transformCSS} from '../../util/transformCSS'
    import Contorl from "../control/Control";
    import BScroll from 'better-scroll';
	export default {
		name: "Cart",
		components: {Contorl},
		props:{
            selectFoods:Array,
            seller:Object,
		},
		data(){
		    return{
		        balls:[
			        {show:false,name:1},
			        {show:false,name:2},
			        {show:false,name:3},
			        {show:false,name:4},
			        {show:false,name:5},
		        ],
			    dropBalls:[],//存放正在降落的小球
			    //代表折叠  list是否要出现与折叠是相反的,,为什么这么设计??
			    /*因为不能单单点购物车就出现,当购物车里面没有东西的时候,就不能点开.
			    * 默认购物车是没有东西的,所有list不能出现*/
			    flod:true,
		    }
		},
		mounted() {
		    this.bus.$on('ballAmination',(target) =>{
		    //    实现整个小球动画
		        this.dropBall(target)
		    })
		},
		methods:{
			dropBall(target){
			    /*实现小球动画
			    *   1.每一次点击从小球数组中挑出一个不再运动的小球
			    *       运动中的小球show:true
			    *       没有运动的小球 show.flase
			    *   2.确定小球的起始位置
			    *   3.进行动画
			    *   4.动画收尾
			    * */
                for (let i=0;i<this.balls.length;i++){
                    let ball = this.balls[i];
                    if (!ball.show) {
                        //此处我们改变show的值会触发小球的动画逻辑
                    	ball.show = true;
                    	/*为了使beforeEnter中可以读到target的信息
                    	* 函数与函数之间的通信,大概率会使用到对象的属性*/
                    	ball.target = target; //真正的DOM节点
                    	//将运动的小球推入降落降落小球对列(一步一步创建一个队列)
	                    this.dropBalls.push(ball)
                    	return;
                    }
                }
			},
			// hooks 钩子 enter时候调用,从隐藏到显示的会调用下边的三个钩子
			/*beforeEnter:动画第一帧
			* enter开始动画
			* afterEnter:动画结束*/
			beforeEnter(el){
				// 确定最新要运动的小球的起始位置
                let count = this.balls.length;
                //count--的值是4,3,2,1,0,在这里会自动数据类型转换
                /*在这里为啥不是从5开始,因为虽然减减在后,先赋值再操作,
                但是由于没有没有赋值操作,就从4开始了*/
                while (count--){
                    let ball = this.balls[count];
                    if (ball.show){
                    //当前的最新的运动小球,确定当前的位置
                        //视口的高度
                        let viewH =document.documentElement.clientHeight;
                        //拿到当前元素距离四周的长度
                        let targetRect = ball.target.getBoundingClientRect();
                        let x = targetRect.left -28;
                        let y = viewH-targetRect.top - 45;
	                    /*在这里vue会自动传一个当前的元素el*/
	                    transformCSS(el,'translateX',x);
	                    transformCSS(el,'translateY',-y);
                        break; //找到最新运动的小球之后就跳出循环
                    }
                }
			},
			enter(el){
			    /*手动强制让浏览器再徐渲染一次
			    *   当我们通过DOM的api获取元素的尺寸时,浏览器会为了返回最精确的值,重新强制刷新渲染队列*/
			    let hook = el.offsetHeight;
			    /*在执行这行代码的时候浏览器初次渲染还没有成功*/
			    //可加可不加,这样更加保险
			    this.$nextTick(() =>{
				    transformCSS(el,'translateX',0)
				    transformCSS(el,'translateY',0)
			    })

			},
			afterEnter(el){
			    //循环小球队列,将会最先运动结束的小球放入循环中
			    // shift()方法从数组中删除第一个数组,并返回该元素的值
			    const ball = this.dropBalls.shift();
			    if (ball.show){
			        ball.show = false;
			        //这一步是为了让小球快速隐藏掉,
			        // 虽然小球在下一次vue渲染的时候会隐藏但是体验不太好(数据驱动之前改掉)
			        el.style.display = 'none';
			    }
			},
            //清空购物车
			clearAll(){
			    this.$emit('clearAll')
			},
			//点击购物车是否出现遮罩
			flodFn(){
			    //先点击购物车再点加号的时候会突然弹出
			    if (this.totalCount<=0)return //不在执行flodFn的后边代码
			    this.flod = !this.flod;
			}
		},
		computed:{
			totalCount(){
				let totalCount = 0;
                this.selectFoods.forEach((selectFood) =>{
	                totalCount += selectFood.count
                })
                return totalCount;
			},
		    totalPrice(){
		        let totalPrice = 0;
			    this.selectFoods.forEach((selectFood) =>{
				    totalPrice += selectFood.price * selectFood.count
			    });
		        return totalPrice;
		    },
			rightText(){
			    if (this.totalPrice===0) return `￥${this.seller.minPrice}起送`
			    else if (this.totalPrice < this.seller.minPrice)
			    return `还差￥${this.seller.minPrice-this.totalPrice}起送`
			    else return '去结算'
			},
			/*
                list的隐藏与显示 是由两个因素来控制!!!
                    1. 用户是否点击了购物车
                        抽象出来一个数据:flod(折叠!!!)
                    2. 购物车当中是否有数据
                        totalCount

                list的显示与隐藏 与 flod数据应该是相反的
                    flod:true 折叠   showList:false
                    flod:false 未折叠   showList:true

                正常操作:
                    先点+号按钮; 购物车中加入了数据
                    用户想看购物车详情, 点击购物车出现列表

                细节1:
                    有没有可能用户先点击购物车;让flod状态变为了false( )
                    又点击了+号 导致列表无缘无故的打开

                    怎么解决:
                        在购物车中没有数据的时候 flod状态也不能产生改变

                细节2:
                    正常操作;打开了列表.  所以flod=false;
                    我们通过清空购物车导致totalcount为0;列表关闭!!!
                    可是flod仍然为false 状态不对!!!! 应该为true

                    怎么解决:
                        当totalCount<=0 时;flod一定得是true的
             */
			showList(){
			  /*代表list的显示与隐藏(与两个数据有关,必须都满足才可以)
			  *     1.购物车中的数量大于0
			  *     2.flod要为false*/
			  if (this.totalCount <=0){
			    /*哪怕在这写的这段代码没有作用!!! 我也会写!!!
                    //任何情况下,购物车数据都小于等于0了
                    我将折叠设为true 是永远都不会出问题的!!!*/

			    this.flod = true; //我们通过清空购物车导致totalcount为0;列表关闭!!!
			    return false; //调用该函数如果不满足条件的话,就会的到false,v-show也就不显示了
			  }
				//让遮罩的购物车列表产生滑屏,在mounted中没有渲染完,如果没有滑屏就进行new操作,没的话进行刷新
				this.$nextTick(() =>{
					if (!this.scroll) this.scroll = new BScroll(this.$refs.listContent,{click:true})
					else this.scroll.refresh()
				})
			  return !this.flod
			},
		}
	}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.cart
    display flex
    flex 0 0 0
    position: fixed;
    bottom 0
    left 0
    height 46px
    background-color #141d27
    width 100%
    z-index 3
    >.left
        flex 1
        height 100%
        display flex
        color white
        .outCircle
            display flex
            align-items center
            justify-content center
            position relative
            bottom 15px
            margin-left  12px
            height 56px
            width 56px
            background-color #141d27
            border-radius 50%
            .inCircle
                display flex
                align-items center
                justify-content center
                width 44px
                height 44px
                border-radius 50%
                background-color rgba(255,255,255,.2)
                &.active
                    background-color rgba(0,160,200,1)
                    i
                        color white
                i
                    color rgba(255,255,255,0.4)
            .bubble
                position absolute
                right 0
                top 5px
                width 24px
                height 16px
                line-height 16px
                border-radius 6px
                background red
                font-size 9px
                font-weight 700
                text-align center
        .totalPrice
            display flex
            align-items center
            justify-content center
            margin-right 12px
            font-size 16px
            line-height 24px
            font-weight 700
            color: rgba(255,255,155,.4)
            &.active
                color white
        .deliveryPrice
            display flex
            justify-content center
            align-items center
            font-size 14px
            line-height 24px
            font-weight 700
            color rgba(255,255,255,.4)
            padding-left 12px
            border-left 2px solid rgba(255,255,255,0.1)


    >.right
        display flex
        align-items center
        justify-content center
        flex 0 0 105px
        height 100%
        background-color rgba(255,255,255,.2)
        color rgba(255,255,255,.4)
        &.active
            background-color green
            color white
    .balls
        .ball
            position: absolute;
            left 31px
            top 5px
            width 16px
            height 16px
            border-radius 50%
            background-color red
            transition .3s transform linear
.list
    position: fixed;
    left 0
    bottom 45px
    width 100%
    max-height 255px
    background-color #f3f5f7
    z-index 2
    padding-bottom 20px
    .header
        height 40px
        background-color #f3f5f7
        display flex
        justify-content space-between
        align-items center
        one-px(rgba(7,17,27,.1))
        .cartContent
            margin-left 18px
            color rgba(7,17,27,1)
            font-weight 800
            font-size 14px
        .clearCart
            margin-right 18px
            color rgba(0,160,220,1)
            font-size 14px
            font-weight 800
    .content
        height 195px
        overflow hidden
        .item
            one-px(rgba(7,17,27,.1))
            display flex
            height 48px
            align-items center
            justify-content space-between
        .left
            padding-left 18px
        .right
            display flex
            align-items center
            padding-right 22px
            .price
                margin-right 12px
                color rgba(240,20,20,1)
                font-size 10px
                font-weight 700
.mask
    position fixed
    z-index 1
    top 0
    left 0
    bottom 0
    right 0
    backdrop-filter blur(5px)
    background-color rgba(7,17,26,.6)
</style>