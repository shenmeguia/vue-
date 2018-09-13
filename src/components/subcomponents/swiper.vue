<template>
	<div>
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in lunbolist" :key="item.ID">
		  	<img :src="item.src" :class="{full:isfull}">
		  </mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default{
		props:["lunbolist","isfull"]
	}
</script>
<style lang="less">
	/*由于调用者的样式需求不一样，可以自定义属性，轮播图调用者手动指定属性的布尔值，通过布尔值判断是否需要添加某个样式*/
	/*在这个项目中首页轮播图的宽度和商品详情页的宽度需求不一样，所以宽度样式单独指定一个类*/
	.mint-swipe{
		height:200px;
		.mint-swipe-item{
			text-align:center;
			background:transparent;
			>img{
				height:100%;
			}
		}
	}
	.full{
		width:100%;
	}
</style>