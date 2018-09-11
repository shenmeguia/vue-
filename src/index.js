//入口文件

import Vue from 'vue';
// 导入路由的包
import VueRouter from 'vue-router';
Vue.use(VueRouter);


// 按需导入mnti-ui中的组件
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
// mnti-ui中的轮播图组件
import { Swipe, SwipeItem, Toast} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入vue-resource(发送数据请求)
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 设置请求的根路径
Vue.http.options.root = 'http://localhost:8080';


// 导入mui的样式
import './libs/mui/css/mui.min.css';
import './libs/mui/css/icons-extra.css';

// 导入自己router.js路由模块
import router from './router.js'

// 导入app根组件
import app from './app.vue';

var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router: router
});