<template>
	<div>
		<!-- 轮播图子组件  并向轮播图子组件传图片数据-->
		<my-swiper :lunbolist="lunbolist" isfull="true"></my-swiper>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
	                <img src="images/4.png">
	                <div class="mui-media-body">新闻资讯</div></router-link></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
	                <img src="images/5.png">
	                <div class="mui-media-body">图片分享</div></router-link></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
	                <img src="images/6.png">
	                <div class="mui-media-body">商品购买</div></router-link></li>
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
	// 导入轮播图组件
	import swiper from "../subcomponents/swiper.vue";
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
				this.$http.get("getlunbo").then(function (reslut) {
					if(reslut.body.code === 0) {
						this.lunbolist = reslut.body.data;
					}else {
						Toast('图片加载失败');
					}
				})
			}
		},
		components:{
			"my-swiper":swiper
		}
	}
</script>
<style scoped lang="less">
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