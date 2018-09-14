<template>
	<div class="app-container">
		<!-- 顶部 -->
		<mt-header fixed title="vue案例">
			<span slot="left">
			    <mt-button icon="back" @click="goBack()" v-show="flag">返回</mt-button>
			 </span>
		</mt-header>

		<!-- 中间路由 -->
		<transition>
			<router-view></router-view>
		</transition>
		
		<!-- 底部导航 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-items" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-items" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-items" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-items" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	export default{
		data: function () {
			return {
				flag:false
			}
		},
		created: function () {
			// 页面刚进来判断是不是在首页，在首页就隐藏返回按钮
			this.flag = this.$route.path === '/home' ? false : true;
		},
		methods: {
			// 点击返回后退
			goBack: function () {
				this.$router.go(-1);
			}
		},
		// 监听路由的变化，在首页就需要隐藏返回按钮
		watch: {
			"$route.path": function (newVal,oldVal) {
				if(newVal === '/home') {
					this.flag = false;
				}else {
					this.flag = true;
				}
			}
		}
	}
</script>
<style scoped lang="less">
	.app-container{
		padding:40px 0 50px;
		overflow-x:hidden;
	}
	.mint-header{
		z-index:100;
	}
	.v-enter{
		opacity:0;
		/*从右侧近*/
		transform:translateX(100%);
	}
	.v-leave-to{
		opacity:0;
		/*从左侧出*/
		transform:translateX(-100%);
		/*脱离文档流，否则下一屏进来会被挤下去*/
		position:absolute;
	}
	.v-enter-active,.v-leave-active{
		transition:all 0.5s ease;
	}
	.mui-bar-tab .mui-tab-items{
		color:#5a5a5a;
	}
	.mui-bar-tab .mui-tab-items {
	    display: table-cell;
	    overflow: hidden;
	    width: 1%;
	    height: 50px;
	    text-align: center;
	    vertical-align: middle;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #929292;
	}
	.mui-bar-tab .mui-active{
    	color:#007aff;
    }
	.mui-bar-tab .mui-tab-items .mui-icon {
	    top: 3px;
	    width: 24px;
	    height: 24px;
	    padding-top: 0;
	    padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-items .mui-icon~.mui-tab-label {
	    font-size: 11px;
	    display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
</style>