<template>
	<div class="app-container">
		<!-- 顶部 -->
		<mt-header fixed title="vue案例"></mt-header>

		<!-- 中间路由 -->
		<transition>
			<router-view></router-view>
		</transition>
		
		<!-- 底部导航 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">9</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	
</script>
<style scoped lang="less">
	.app-container{
		padding-top:40px;
		overflow-x:hidden;
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
</style>