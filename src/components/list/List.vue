<template>
       <ul class="list">
           <li v-for="(item,index) in supports" :key="index">
               <Icon :size="2" :type="item.type" class="icon"></Icon>
               <span class="text">{{item.content}}</span>
           </li>
       </ul>
</template>

<script>
	import Icon from "../icon/Icon";
	export default {
		name: "List",
		components: {Icon},
		props:{
		    supports:Array
		},
	}
</script>

<style scoped lang="stylus">
    .list
        font-weight 200
        font-size 12px
        color: white;
        line-height 12px
        li
            margin-bottom 12px
            &:last-child
                margin-bottom 0
            .icon
                vertical-align top
                margin-top 1px
                margin-left 12px
                margin-right 6px
</style>