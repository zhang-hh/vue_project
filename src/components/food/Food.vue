<template>
    <div class="food">
        <div class="left">
            <img :src="food.image" alt="商品图片">
        </div>
        <div class="right">
            <span class="name">{{food.name}}</span>
            <span class="description">{{food.description}}</span>
            <span class="info">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span class="rating">月售{{food.rating}}%</span>
            </span>
            <span class="price">
                <span class="newPrice">{{food.price}}</span>
                <span class="oldPrice">10</span>
            </span>
        </div>
        <Contorl :food="food" class="contorl"></Contorl>
    </div>
</template>

<script>
	import Contorl from "../control/Control";
	export default {
		name: "Food",
		components: {Contorl},
		props:{
		    food:Object
		}
	}
</script>

<style scoped lang="stylus">
.food
    display flex
    font-size 0
    .left
        flex 0 0 59px
        img
            width 100%
            height 50px
    .right
        flex 1
        display flex
        flex-direction column
        font-size 10px
        color rgba(147,153,159,1)
        margin-left 10px
        .name
            margin-top 2px
            margin-bottom 8px
            font-size 14px
            line-height 14px
            color rgba(7,17,27,1)
        .description
            margin-bottom 8px
        .info
            margin-bottom 8px
        .sellCount
                margin-right 12px
            .rating
                zoom 1
        .price
            .newPrice
                font-size 14px
                color red
                line-height 24px
                font-weight 700
                margin-right 8px
            .oldPrice
                font-weight 700
                line-height 24px
                text-decoration line-through

    .control
        flex 0 0 0
         position absolute
         right 0
         bottom 3px
</style>