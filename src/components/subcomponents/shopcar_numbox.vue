<template>
	<div class="mui-numbox" data-numbox-min='1' style="height:25px">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="number" readonly />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
	// 1.导入mui的js文件
	import mui from '../../libs/mui/js/mui.min.js';
	export default{
		// 手动初始化mui中的numbox插件
		mounted: function () {
			mui(".mui-numbox").numbox();
		},
		methods: {
			// 文本修改立即触发事件,将新的商品购买数量发送给state
			countChange: function () {
				this.$store.commit('updateCar',{id:this.goodsid,count:this.$refs.number.value});
			}
		},
		props:["initcount","goodsid"]
	}
</script>
<style lang="less"></style>