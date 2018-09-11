<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.ID">
				<router-link :to="'/home/newsinfo/' + item.ID">
					<img class="mui-media-object mui-pull-left" :src="item.src">
					<div class="mui-media-body">
						<h3>{{ item.title }}</h3>
						<p class='mui-ellipsis'>
							<span>发表时间：{{ item.addtime }}</span>
							<span>点击{{ item.click }}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				newslist:[]
			}
		},
		created: function () {
			this.getNewsList();
		},
		methods: {
			getNewsList: function () {
				this.$http.get('getnewslist').then(function (result) {
					if(result.body.code === 0) {
						this.newslist = result.body.data;
					}else {
						Toast('数据请求失败！！');
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.mui-table-view {
		>li{
			h3{
				color:#333;
				font-size:14px;
			}
			p{
				font-size:12px;
				color:#5a5a5a;
				display:flex;
				justify-content: space-between;
			}
			.mui-media-object{
				width:42px;
			}
		}
	}
</style>