<template>
	<div class="shopcar-container">
		<div class="shopcar-list">
			<div class="mui-card" v-for="item in shopcars" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- $store.getters.getGoodsSelected[item.id] 购物车中每个商品的选中状态 -->
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.src">
						<div class="info">
							<h3>{{ item.des }}</h3>
							<p>
								<span class="price">￥{{ item.price }}</span>
								<numbox :initcount="item.count" :goodsid="item.id"></numbox>
								<a href="#" @click.prevent="remove(item.id)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner sett">
						<div>
							<p>总计不含运费</p>
							<p>
								已勾选商品
								<span>{{ $store.getters.getGoodsCountSum.count }}</span>
								件，总价<span>￥{{ $store.getters.getGoodsCountSum.sum }}</span>
							</p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
	</div>
</template>
<script>
	import numbox from '../subcomponents/shopcar_numbox.vue';
	export default {
		data: function () {
			return {
				shopcars:[]
			}
		},
		created: function () {
			this.getShopcar();
		},
		methods: {
			getShopcar: function () {
				this.shopcars = this.$store.state.car;
			},
			remove: function (id) {
				this.$store.commit('removeCar',id);
			},
			selectedChange: function (id,selected) {
				this.$store.commit('goodsSelectedChange',{id:id,selected:selected});
			}
		},
		components:{
			"numbox":numbox
		}
	}
</script>
<style scoped lang="less">
	.shopcar-container{
		background:#eee;
		overflow:hidden;
		.shopcar-list{
			.mui-card-content-inner{
				display:flex;
				align-items:center;
			}
			img{
				width:50px;
				height:50px;
				margin:0 10px;
			}
			.info{
				h3{
					font-size:13px;
					padding:10px 0;
				}
				.price{
					color:red;
					font-weight:bold;
				}
			}
		}
		.sett{
			display:flex;
			justify-content:space-between;
			align-items:center;
			span{
				color:red;
				font-weight:bold;
			}
		}
	}
</style>