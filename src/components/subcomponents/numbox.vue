<template>
	<div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<!-- 当文本框内容改变就需要向父组件传值 -->
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="number"/>
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
			// 调用父组件的方法向父组件传值
			countChange: function () {
				this.$emit('postCount',parseInt(this.$refs.number.value));
			}
		},
		// 接受父组件传递的值，因为这个值是异步从数据库获取的，所以需要监听，直到不改变为止(最终的值)
		props:["max"],
		// watch能够监听属性的改变
		watch: {
			max: function (newVal,oldVal) {
				// 用mui中的API动态设置最大值
				mui(".mui-numbox").numbox().setOption('max',newVal);
			}
		}
	}
</script>
<style lang="less"></style>