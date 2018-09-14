<template>
	<div class="goodsinfo-container">
		<!-- 利用半场动画实现小球加入购物车动画 -->
		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			<span class="ball" v-show="ballFlag" ref="ball"></span>
		</transition>
		<div class="mui-card">
			<div class="mui-card-content">
				<!-- 轮播图子组件  并向轮播图子组件传图片数据-->
				<my-swiper :lunbolist="lunbolist" :isfull="false"></my-swiper>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.des }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{ goodsinfo.oldprice }}</del>&nbsp;&nbsp;
						销售价：<span class="now">￥{{ goodsinfo.nowprice }}</span>
					</p>
					<p>
						<!-- 子组件调用父组件的方法向父组件传值-->
						<!-- 同时父组件通过属性绑定向子组件传递最大能够购买的数量，即为库存量 -->
						购买数量：<numbox @postCount="getCount" :max="goodsinfo.surplus"></numbox>
					</p>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<!-- 加入购物车涉及到 numbox子组件向父组件传值-->
					<mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goodsnb }}</p>
					<p>库存情况：{{ goodsinfo.surplus }}</p>
					<p>上架时间：{{ goodsinfo.addtime }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<!-- 使用编程式导航跳转到对应页面 -->
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui';
	// 导入轮播图组件
	import swiper from "../subcomponents/swiper.vue";
	// 导入numbox组件
	import numbox from "../subcomponents/numbox.vue";

	export default{
		data: function () {
			return {
				id:this.$route.params.id,
				lunbolist:[],
				goodsinfo:[],
				ballFlag:false,
				count:1 //购买数量
			}
		},
		created: function () {
			this.getGoodsLunbo();
			this.getGoodsInfo();
		},
		methods: {
			getGoodsLunbo: function () {
				this.$http.get("getgoodslunbo/" + this.id).then(function (result) {
					if(result.body.code === 0) {
						var data = result.body.data[0].src.split(',');
						for(var i = 0; i < data.length; i++) {
							data[i] = JSON.parse(data[i]);
						}
						this.lunbolist = data;
					}else {
						Toast('加载失败！');
					}
				})
			},
			getGoodsInfo: function () {
				this.$http.get("goodsinfo/" + this.id).then(function (result) {
					if(result.body.code === 0) {
						this.goodsinfo = result.body.data[0];
					}else {
						Toast('加载失败！');
					}
				});
			},
			goDesc: function (id) {
				// 编程式导航
				this.$router.push("/home/goodsdesc/" + id);
			},
			goComment: function (id) {
				// 编程式导航
				this.$router.push("/home/goodscomment/" + id);
			},
			beforeEnter: function (el) {
				el.style.transform = "translate(0,0)";
			},
			enter: function (el,done) {
				el.offsetWidth;
				// 小球动画优化
				// 存在的问题：写死了目标点，滚动条滚动后错位，不同分辨率下坐标位置也有差别 
				// 解决办法：获取起点和终点的坐标值，相减就是需要位移的距离
				// getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性
				var ballPosition = this.$refs.ball.getBoundingClientRect();
				var badgePosition = document.getElementById('badge').getBoundingClientRect();
				var x = badgePosition.left - ballPosition.left;
				var y = badgePosition.top - ballPosition.top;
				// es6中的模板字符串拼接字符串
				el.style.transform = `translate(${x}px,${y}px)`;
				el.style.transition = "all 0.6s cubic-bezier(.74,-0.17,.7,.89)";
				done();
			},
			afterEnter: function (el) {
				this.ballFlag = !this.ballFlag;
			},
			getCount: function (num) {
				//参数num就是numbox子组件传递过来的值
				this.count = num;
			},
			addToCar: function () {
				this.ballFlag = !this.ballFlag;
				// 每一条内容大概是{id:商品id，count:购买数量，price:单价，selected：true(是否选中)}
				var goodscar = {
					id: this.id,
					count: this.count,
					price: this.goodsinfo.nowprice,
					des: this.goodsinfo.des,
					src: this.goodsinfo.imgsrc,
					selected: true
				};
				// 调用vuex实例的mutations中的方法，将商品购买信息保存到state中，实现数据共享
				this.$store.commit('addCar',goodscar);
			}
		},
		components:{
			"my-swiper":swiper,
			"numbox":numbox
		}
	}
</script>
<style lang="less">
	.goodsinfo-container{
		background:#eee;
		overflow:hidden;
		.ball{
				position:absolute;
				z-index:100;
				left:150px;
				top:335px;
				width:15px;
				height:15px;
				background:red;
				border-radius:50%;
			}
	}
	.mui-card-content-inner{
		.now{
			color:red;
			font-size:16px;
			font-weight:bold;
		}
	}
	.mui-card-footer{
		display:block;
		button{
			margin:15px 0;
		}
	}
</style>
