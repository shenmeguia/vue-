<template>
	<div class="goodsdesc-container">
		<h3>{{ goods.des }}</h3>
		<hr>
		<div v-html="goods.content"></div>
	</div>
</template>
<script>
	export default{
		data: function () {
			return {
				id: this.$route.params.id,
				goods:[]
			}
		},
		created: function () {
			this.getGoodsContent();
		},
		methods: {
			getGoodsContent: function () {
				this.$http.get("goodsinfo/" + this.id).then(function (result) {
					if(result.body.code === 0) {
						this.goods = result.body.data[0];
					}else {
						Toast('加载失败！');
					}
				});
			}
		}
	}
</script>
<style lang="less">
	.goodsdesc-container{
		h3{
			color:#26a2ff;
			font-size:20px;
			margin:20px 10px;
			text-align:center;
		}
		img{
			width:100%;
			display:block;
		}
	}
</style>

