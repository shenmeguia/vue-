<template>
	<div class="goods-list">
		<!-- 这里使用编程式导航进行跳转详情页，之前都是使用router-link -->
		<div class="goods-item" v-for="item in goodslist" :key="item.ID" @click="getDetail(item.ID)">
			<img :src="item.imgsrc">
			<h3>{{ item.des }}</h3>
			<div class="info">
				<p class="price">
					<span class="now">￥{{ item.nowprice }}</span>
					<span class="old">￥{{ item.oldprice }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩余{{ item.surplus }}件</span>
				</p>
			</div>
		</div>
		<button class="more" @click="getmore">加载更多</button>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui';
	export default{
		data: function () {
			return {
				pageindex:1,
				goodslist:[]
			}
		},
		created: function () {
			this.getGoodsList();
		},
		methods: {
			getGoodsList: function () {
				this.$http.get("goodslist/?pageindex=" + this.pageindex).then(function (result) {
					if(result.body.code === 0) {
						this.goodslist = this.goodslist.concat(result.body.data);
					}else {
						Toast('加载失败！');
					}
				})
			},
			getmore: function () {
				this.pageindex++;
				this.getGoodsList();
			},
			getDetail: function(id) {
				// 编程式导航
				this.$router.push("/home/goodsinfo/" + id);
			}
		}
	}
</script>
<style lang="less">
	.goods-list{
		padding:8px;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		.more{
			width:100%;
			height:30px;
			background:red;
			color:white;
			border:none;
			margin-top:5px;
		}
		.goods-item{
			width:49%;
			border:1px solid #ccc;
			box-shadow:0 0 8px #ccc;
			margin:4px 0;
			padding:4px;
			display:flex;
			flex-direction:column;
			justify-content:space-between;
			min-height:283px;
			img{
				width:100%;
			}
			h3{
				font-size:14px;
			}
			.info{
				background:#eee;
				p{
					margin:0;
					padding:5px;
				}
				.price{
					.now{
						color:red;
						font-size:16px;
						font-weight:bold;
					}
					.old{
						font-size:12px;
						text-decoration:line-through;
						margin-left:10px;
					}
				}
				.sell{
					display:flex;
					justify-content:space-between;
				}
			}
		}
	}
</style>