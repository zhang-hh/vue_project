<template>
    <!--<div class="stars" :class="`star24`">-->
    <!--<div class="stars" :class="`star36`">-->
    <!--<div class="stars" :class="`star48`">-->
    
    <div  :class="`stars${size}`">
        <div class="star" v-for="item in classNames" :class="item"></div>
    </div>
</template>

<script>
	const ON = 'on';
	const HALF = 'half';
	const OFF = 'off';
	const LENGTH = 5;
	export default {
		name: "Stars",
		props:{
		    size:Number,
			score:Number  /*按照分数去生成一个数组,就会想到一个计算属性*/
		},
		computed:{
		    classNames(){
			    let arr = [];
			    /*没有满0.5不给星星,满0.5的时候给半星,满1.0的时候给全星 */
			    //当前分数需要几个满星
			    const fullStar = Math.floor(score);
			    for (let i = 0; i < fullStar; i++) {
				    if (arr.length===LENGTH){break}
				    arr.push(ON)
			    }
			    const score  = Math.floor(this.score *2)/2;
			    //当前的分数需要不需要半星
			    const needHalf = (score % 1) === 0 ? false :true;
			    needHalf ? arr.push(HALF):'';
			    //当前的分数需要多少个暗星
			    while (arr.length < LENGTH){
			        arr.push(OFF)
			    }
			    return arr;
		    }
		},
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .stars
        display inline-flex //inline-flex 和flex的区别为flex的占满一整行的
        .star      /*相当于任意尺寸的星星的公共样式*/
        /*和下边的star指的是同一个元素*/
            background-size 100%
            background-repeat no-repeat
        &.stars24
            .star  /*相当于尺寸为24的星星的公共样式*/
            /*和上边的star指的是同一个元素*/
                width 10px
                height 10px
                margin-right 10px
                &:last-child
                    margin-right 0
                &.on
                    bg-img(star24_on)
                &.half
                    bg-img(star24_half)
                &.off
                    bg-img(star24_off)
        &.stars36
            .star /*相当于尺寸为36的星星的公共样式*/
                width 15px
                height 15px
                margin-right 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-img(star36_on)
                &.half
                    bg-img(star36_half)
                &.off
                    bg-img(star36_off)
        &.stars48 /*相当于尺寸为48的星星的公共样式*/
            .star
                width 20px
                height 20px
                margin-right 20px
                &:last-child
                    margin-right 0
                &.on
                    bg-img(star48_on)
                &.half
                    bg-img(star48_half)
                &.off
                    bg-img(star48_off)

</style>