//入口文件
import Vue from 'vue';
// 导入路由的包
import VueRouter from 'vue-router';
Vue.use(VueRouter);


// 按需导入mint-ui中的组件
// import { Header } from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.component(Header.name, Header);
// // mnti-ui中的轮播图组件
// import { Swipe, SwipeItem} from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// // mnti-ui中的图片懒加载组件
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);

// mint-ui导入
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 导入vue-resource(发送数据请求)
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 设置请求的根路径
Vue.http.options.root = 'http://localhost:8080';
// 设置post 时候表单数据提交的格式
Vue.http.options.emulateJSON = true;

// 定义一个全局的时间格式化过滤器
import moment from 'moment';
Vue.filter('dateFn',function (dataStr) {
	return moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
});

// 安装图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

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