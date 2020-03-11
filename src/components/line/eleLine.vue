<template>
    <div class="lineWrap">
        <div class="line"></div>
            <slot>
                <span>XXXX</span>
            </slot>
        <div class="line"></div>
    </div>
</template>

<script>
	export default {
		name: "eleLine"
	}
</script>

<style scoped lang="stylus">
.lineWrap
    width 100%
    height 30px
    display inline-flex
    font-size 14px
    font-weight 700
    color white
    align-items center
    .line
        flex 1
        height 1px
        background rgba(255,255,255,.2)
    span
        margin 0 12px


</style>