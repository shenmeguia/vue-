<template>
	<div>
		<!-- 顶部滑动条 -->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<!-- 刚进入选中全部分类 ，给第一个加mui-active类-->
					<a :class="['mui-control-item', item.ID === 0 ? 'mui-active' : '']" v-for="item in list" :key="item.ID" @tap="getImgByCateId(item.ID)">
						{{ item.category }}
					</a>
				</div>
			</div>
		</div>
		<!-- 图片列表区域 -->
		<ul class="img-list">
		  <router-link v-for="item in imglist" :key="item.ID" tag="li" :to="'/home/photoinfo/'+item.ID">
		    <img v-lazy="item.src">
		    <p>{{ item.des }}</p>
		  </router-link>
		</ul>
	</div>
</template>
<script>
	// 1.导入mui的js文件
	import mui from '../../libs/mui/js/mui.min.js';
	import {Toast} from 'mint-ui';

	export default {
		data: function () {
			return {
				list:[],
				imglist:[]
			}
		},
		created: function () {
			this.getCategorys();
			this.getImgByCateId(0);
		},
		// 组件中的dom结构被渲染好并放到页面中后，会执行这个钩子函数
		// 如果要操作dom元素，最好在mounted钩子函数中操作
		mounted: function () {
			// 2.初始化滑动控件
			mui(".mui-scroll-wrapper").scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods: {
			getCategorys: function () {
				this.$http.get('getimgcategory').then(function (result) {
					if(result.body.code === 0) {
						this.list = result.body.data;
					}else {
						Toast('加载失败!');
					}
				})
			},
			getImgByCateId: function (cateId) {
				this.$http.get('getimgs/'+cateId).then(function (result) {
					if(result.body.code === 0) {
						this.imglist = result.body.data;
					}else {
						Toast('加载失败!');
					}
				})
			}
		}
	}
</script>
<style lang="less">
	/*去除Chrome滑动警告*/
	*{
		touch-action:pan-y;
	}
	
	.img-list{
		list-style:none;
		width:90%;
		margin:0 auto;
		padding:0;
		li{
			background:#ccc;
			margin-bottom:10px;
			box-shadow:0 0 9px #999;
			position:relative;
			text-align:center;
			img{
				width:100%;
				vertical-align:middle;
			}
			img[lazy=loading] {
			  width: 40px;
			  height: 300px;
			  margin: auto;
			}
			p{
				position:absolute;
				left:0;
				bottom:-10px;
				text-align:left;
				background:rgba(0,0,0,0.7);
				color:white;
				width:100%;
				padding:0 5px;
				font-size:13px;
				height:40px;
				line-height:40px;
				text-overflow:ellipsis;
				overflow:hidden;
				white-space:nowrap;
			}
		}
	}
</style>