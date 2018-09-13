<template>
	<div class="photoinfo-container">
		<h3 class="title">{{ photolist.title }}</h3>
		<P class="subTit">
			<span>发表时间：{{ photolist.addtime | dateFn }}</span>
			<span>点击：{{ photolist.click }}</span>
		</P>

		<!-- 缩略图区域 -->
		<div class="imgBox">
			<vue-preview :slides="list"></vue-preview>
		</div>
		<!-- 内容 -->
		<div class="content" v-html="photolist.des"></div>
		<!-- 使用现成的评论子组件 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>
<script>
	// 导入评论子组件
	import comment from '../subcomponents/comment.vue';
	import {Toast} from 'mint-ui';
	export default {
		data: function () {
			return {
				id:this.$route.params.id,
				photolist:{},
				list:[]
			}
		},
		created: function () {
			this.getImgInfo();
			this.getThumbnail();
		},
		methods: {
			getImgInfo: function () {
				this.$http.get("getimginfo/"+this.id).then(function (result) {
					if(result.body.code === 0) {
						this.photolist = result.body.data[0];
					}else {
						Toast('加载失败!')
					}
				});
			},
			getThumbnail: function () {
				this.$http.get("getthumbnail/"+this.id).then(function (result) {
					var data = result.body.data[0].src.split(',');
					for(var i = 0; i < data.length; i++) {
						data[i] = JSON.parse(data[i]);
						data[i].w = 400;
						data[i].h = 640;
						data[i].msrc = data[i].src;
					}
					this.list = data;
				})
			}
		},
		components:{
			'cmt-box':comment
		}
	}
</script>
<style lang="less">
	.photoinfo-container{
		padding:10px;
		>.title{
			color:red;
			font-size:16px;
			text-align:center;
			margin:10px 0;
		}
		>.subTit{
			color:#26a2ff;
			font-size:13px;
			display:flex;
			justify-content: space-between;
			padding:10px 0;
			border-bottom:1px solid #ccc;
		}
		.content{
			font-size:13px;
			color:#5a5a5a;
			line-height:26px;
		}
		.imgBox{
			figure{
				display:inline-block;
				margin:5px 5px 0;
				width:30%;
			}
			img{
				width:100%;
				height:auto;
				box-shadow:0 0 4px #999;
			}
		}
	}
</style>
