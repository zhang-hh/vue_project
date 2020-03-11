<template>
    <div class="control">
        <transition name="reduce">
            <i  class="icon-remove_circle_outline reduce" v-show="food.count>0" @click="reduceCount"></i>
        </transition>
        <transition name="reduce">
        <span v-show="food.count>0">{{food.count}}</span>
        </transition>
        <i class="icon-add_circle add" @click="addCount"></i>
    </div>
</template>

<script>
	export default {
		name: "Contorl",
		props:{
		    food:{
		        type:Object,
		        require:true
		    },
		},
		methods:{
			addCount(){
				this.bus.$emit('addCount',this.food);
				//和cart组件进行交互,完成小球动画
				/*event.target:触发当前的DOM元素,将触发当前对象传给cart组件*/
				this.bus.$emit('ballAmination',event.target);
		    },
			reduceCount(){
				this.bus.$emit('reduceCount',this.food)
			}
		}
	}
</script>

<style scoped lang="stylus">
.control
    i
        font-size 24px
        vertical-align middle
        color rgba(0,160,220,1)
        display inline-block
        &.reduce
            opacity 1
            transform translate3d(0,0,0) rotate(-720deg)
        &.add
            position: relative;
            z-index 1
    span
        font-size 10px
        display inline-block
        width 24px
        text-align center
        vertical-align middle
        color rgba(147,143,159,1)
</style>