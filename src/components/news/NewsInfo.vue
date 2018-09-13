<template>
	<div class="newsInfo-container">
		<h3 class="title">{{ newsinfo.title }}</h3>
		<p class="subTit">
			<span>发表时间：{{ newsinfo.addtime }}</span>
			<span>点击：{{ newsinfo.click }}次</span>
		</p>
		<div class="content" v-html="newsinfo.content">
		</div>
		<comment-box :id="this.id"></comment-box>
	</div>
</template>
<script>
	// 导入评论组件
	import comment from '../subcomponents/comment.vue';
	import {Toast} from 'mint-ui';
	export default {
		data: function () {
			return {
				// 得到url地址中的id
				id: this.$route.params.id,
				newsinfo:{}
			}
		},
		created: function () {
			this.getNew();
		},
		methods: {
			getNew: function () {
				this.$http.get("getnew/" + this.id).then(function (result) {
					if(result.body.code === 0) {
						this.newsinfo = result.body.data[0];
					}else {
						Toast('数据请求失败！！')
					}
				})
			}
		},
		// 将评论组件设置为自己的子组件
		components:{
			"comment-box":comment
		}
	}
</script>
<style lang="less">
	.newsInfo-container{
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
		>.content{
			img{
				width:100%;
				height:auto;
			}
		}
	}
</style>