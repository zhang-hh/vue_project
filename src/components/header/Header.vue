<template>
    <div class="header">
        <div class="header-top">
            <div class="avatar">
                <img :src="seller.avatar" alt=""头像>
            </div>
            <div class="info">
                <div class="title">
                    <i class="brand"></i>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="des">
                    <span class="dexInfo">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
                </div>
                <div class="supports" v-if="seller.supports">
                    <Icon :size="1" :type="seller.supports[0].type"></Icon>
                    <span class="text">{{seller.supports[0].content}}</span>
                </div>
            </div>
            <div class="btn" v-if="seller.supports" @click="showMask">
                <span class="num">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin" @click="showMask">
            <div class="left">
                <div class="icon"></div>
                <span class="text">{{seller.bulletin}}</span>
            </div>
            <i class="icon-keyboard_arrow_right right"></i>
        </div>
        <div class="bg">
            <img :src="seller.bgImg" alt=""背景>
        </div>
        <transition name="mask"> <!--在vue当中只有放在transition当中的才能有动画-->
            <div class="mask" v-show="maskShow">
                <div class="mask_wrap">
                    <div class="mask_main">
                        <!--遮罩层的真正内容-->
                        <div class="title">{{seller.name}}</div>
                        <Stars class="stars" :size="36" :score="seller.score"></Stars>  <!--非props的属性-->
                        <eleLine class="line">
                            <span>优惠信息</span>
                        </eleLine>
                        <List class="list" :supports="seller.supports"></List>
                        <eleLine class="line">
                            <span>商家公告</span>
                        </eleLine  >
                        <p class="bulletin">{{seller.bulletin}}</p>
                    </div>
                </div>
                <div class="mask_footer">
                    <i class="icon-close close" @click="closeMask"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Icon from "../icon/Icon";
    import eleLine from "../line/eleLine";
    import List from "../list/List";
    import Stars from "../stars/Stars";
	export default {
		name: "Header",
		components: {Stars, List, eleLine, Icon},
		props:{
		    seller:Object
		},
		data(){
		    return{
			    maskShow:false
		    }
		},
		methods:{
		    showMask(){
		        this.maskShow = true
		    },
			closeMask(){
				this.maskShow = false;
			}
		}

	}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.header
    font-size 0
    position: relative;
    background-color rgba(7,17,27,.5)
    overflow: hidden;
    & > .header-top
        padding 24px 0 18px 24px
        position: relative;
        .avatar
            width 64px
            height 64px
            vertical-align top
            overflow: hidden;
            display inline-block
            border-radius 2px
            margin-right 16px
            img
                width 100%
                height 100%
        .info
            display inline-block
            vertical-align top
            color white
            overflow hidden
            @media screen and (max-width :325px)
                width 200px
            .title
                font-size 16px
                margin-top 2px
                margin-bottom 8px
                .name
                    font-weight 800
                    vertical-align top
                .brand
                    bg-img(brand)
                    width 30px
                    height 18px
                    margin-right 3px
                    background-size 100%
                    display inline-block
            .des
                font-size 12px
            .supports
                margin 10px 0
                font-size 10px
                margin-bottom 2px
                overflow hidden
                text-overflow ellipsis /*显示省略号只能管在直接子元素,前提是父元素定宽*/
                white-space nowrap
                .text
                    vertical-align top
        .btn
            font-size 10px
            width 48px
            height 24px
            line-height 24px
            background-color rgba(0,0,0,.2)
            border-radius 14px
            text-align center
            position: absolute;
            right 12px
            bottom 38px
            color white
    & > .bulletin
        width 100%
        height 28px
        line-height 28px
        color white
        background-color pink
        font-size 10px
        font-weight 200
        position relative
        .left
            height 100%
            margin-right 26px
            @media screen and (max-width :325px)
                overflow hidden
                text-overflow ellipsis /*显示省略号*/
                white-space nowrap
            .icon
                bg-img(bulletin)
                background-size 100%
                background-repeat no-repeat
                display inline-block
                width 22px
                height 12px
                margin-right 4px
                margin-left 12px
                position: relative;
                top 1px

        .right
            position absolute;
            right 12px
            bottom 7px
    & > .bg
        position absolute
        left 0
        right 0
        top 0
        bottom  0
        z-index -1
        filter blur(5px)
        img
            width 100%
            height 100%
    & > .mask
        position fixed
        left 0
        right 0
        bottom 0
        top 0
        z-index 9
        background-color rgba(7,17,27,.8)
        backdrop-filter blur(5px)
        overflow-y auto
        padding-top 64px
        .mask_wrap
             min-height 100%
            .mask_main
                padding-bottom 96px
                text-align center
                .title
                    font-size 16px
                    font-weight 700
                    color white
                    text-align center
                    line-height 16px
                .stars
                    margin-top 16px
                    margin-bottom 28px
                .line
                    width 80%
                .list
                    width 80%
                    margin 0 auto
                    margin-top 24px
                    margin-bottom 28px
                    text-align: left;
                .bulletin
                    width 80%
                    margin 0 auto
                    font-size 12px
                    line-height 24px
                    color white
                    padding 0 12px
        .mask_footer
            margin-top -96px
            padding 32px 0
            text-align center
            .close
                font-size 32px
                color white

</style>