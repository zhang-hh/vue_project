<template>
        <i class="icon" :class="[`icon-${size}`, `${typesArr[type]}`]"></i>
    <!--class交给vue管理之后 我们可以给class指定的数据类型:
    字符串
    数组
    对象
    <i class="icon icon-1 decrease"></i>
    <i class="icon icon-2 guarantee"></i>

    预处理器的嵌套 &
    使用css预处理器!!!  预处理的嵌套一定是可以来代表html的嵌套层级的
    -->
</template>

<script>
	export default {
		name: "Icon",
		props:{
		    size:Number,
		    type:Number
		},
        data(){
            return {
                    typesArr:["decrease","discount","guarantee","invoice","special"]
            }
        }
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .icon
        background-size 100%
        display inline-block
        width 12px
        height 12px
        vertical-align top
        margin-right 4px
        &.icon-1
            width 12px
            height 12px
            &.decrease
                bg-img(decrease_1)
            &.discunut
                bg-img(discount_1)
            &.guarantee
                bg-img(guarantee_1)
            &.invoice
                bg-img(invoice_1)
            &.special
                bg-img(special_1)
        &.icon-2
            width 12px
            height 12px
            &.decrease
                bg-img(decrease_2)
            &.discount
                bg-img(discount_2)
            &.guarantee
                bg-img(guarantee_2)
            &.invoice
                bg-img(invoice_2)
            &.special
                bg-img(special_2)
        &.icon-3
            width 12px
            height 12px
            &.decrease
                bg-img(decrease_3)
            &.discount
                bg-img(discount_3)
            &.guarantee
                bg-img(guarantee_3)
            &.invoice
                bg-img(invoice_3)
            &.special
                bg-img(special_3)
    &.icon-4
            width 12px
            height 12px
            &.decrease
                bg-img(decrease_4)
            &.discount
                bg-img(discount_4)
            &.guarantee
                bg-img(guarantee_4)
            &.invoice
                bg-img(invoice_4)
            &.special
               bg-img(special_4)
</style>