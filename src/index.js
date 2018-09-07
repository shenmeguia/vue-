//入口文件

import Vue from 'vue';

// 按需导入mnti-ui中的组件
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);

// 导入mui的样式
import './libs/mui/css/mui.min.css'

import app from './app.vue';
var vm = new Vue({
	el: '#app',
	render: c => c(app)
});