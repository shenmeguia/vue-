<template>
	<div>
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in lunbolist" :key="item.ID">
		  	<img :src="item.src">
		  </mt-swipe-item>
		</mt-swipe>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	                <img src="images/4.png">
	                <div class="mui-media-body">新闻资讯</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	                <img src="images/5.png">
	                <div class="mui-media-body">图片分享</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	                <img src="images/6.png">
	                <div class="mui-media-body">商品购买</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	                <img src="images/7.png">
	                <div class="mui-media-body">留言反馈</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	                <img src="images/8.png">
	                <div class="mui-media-body">视频专区</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	                <img src="images/9.png">
	                <div class="mui-media-body">联系我们</div></a></li>
		</ul> 
	</div>
</template>
<script>
	// 导入mint-ui的提示框组件
	import {Toast} from "mint-ui";

	export default {
		data: function () {
			return {
				lunbolist: []
			}
		},
		created: function () {
			this.getlunbo();
		},
		methods: {
			getlunbo: function () {
				this.$http.get("http://localhost:8080/getlunbo").then(function (reslut) {
					if(reslut.body.code === 0) {
						this.lunbolist = reslut.body.data;
					}else {
						Toast('图片加载失败');
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.mint-swipe{
		height:200px;
		.mint-swipe-item{
			&:nth-child(1){
				background:orange;
			}
			&:nth-child(2){
				background:lightgreen;
			}
			&:nth-child(3){
				background:skyblue;
			}
			>img{
				width:100%;
				height:100%;
			}
		}
	}
	.mui-grid-view.mui-grid-9{
		background:white;
		border:none;
		.mui-table-view-cell{
			border:none;
			img{
				width:60px;
				height:60px;
			}
			.mui-media-body {
				font-size:14px;
			}
		}
	}
</style>