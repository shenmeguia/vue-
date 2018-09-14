//入口文件
import Vue from 'vue';
// 导入路由的包
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 一进入页面立即获取本地存储的购物车数据
var car = JSON.parse(localStorage.getItem('car') || '[]');

// 注册vuex
import Vuex from 'vuex';
Vue.use(Vuex);
var store = new Vuex.Store({
	state:{ //组件调用 this.$store.state.***
		// 购车中商品的数据用一个数组储存起来
		// 每一条内容大概是{id:商品id，count:购买数量，price:单价，selected：false(是否选中)}

		car:car  //初始购物车就是本地存储的购物车数据
	},
	mutations:{ //组件调用 this.$store.commit('方法名',参数)
		addCar: function (state,goodscar) {
			var flag = false;//标识符，默认表示car数组中没有需要加入购物车的商品
			state.car.some(function (item) {
				// 通过id找到car数组中有需要加入购物车的商品，则只需要购买数量count加就可以
				if(item.id == goodscar.id) {
					flag = true;
					item.count += parseInt(goodscar.count);
					return true;//终止遍历
				}
			});
			// car数组中没有需要加入购物车的商品，则直接添加到数组中
			if(!flag) {
				state.car.push(goodscar);
			}

			// 实现购物车数据本地存储
			localStorage.setItem('car',JSON.stringify(car));
		},
		// 实现购物车点击加减同步数据的方法，只需要修改购买数量(count)
		updateCar: function (state,goodscar) {
			state.car.some(function (item) {
				if(item.id == goodscar.id) {
					item.count = parseInt(goodscar.count);
					return true;
				}
			});
			// 数据更新后立即保存到本地
			localStorage.setItem('car',JSON.stringify(car));
		},
		// 删除购物车商品数据同步方法
		removeCar: function (state,goodsid) {
			state.car.some(function (item,i) {
				if(item.id == goodsid) {
					state.car.splice(i,1);//从数组中删除指定id商品
					return true;
				}
			});
			// 数据更新后立即保存到本地
			localStorage.setItem('car',JSON.stringify(car));
		},
		// 购物车中商品选中状态同步方法
		goodsSelectedChange: function (state,info) {
			// 这里的参数 info 是一个对象 {id:商品id,selected:选中状态}
			state.car.some(function (item) {
				if(item.id == info.id) {
					item.selected = info.selected;
					return true;
				}
			});
			// 数据更新后立即保存到本地
			localStorage.setItem('car',JSON.stringify(car));
		}
	},
	// 相当于计算属性，能接收state中的数据变化
	getters:{ //组件调用 this.$store.getters.***
		getAllCount: function (state) {
			var c = 0;
			// 购买数量累加
			state.car.forEach(function(item) {
				c += item.count;
			});
			return c;
		},
		getGoodsSelected: function (state) {
			var s = {};//{id:true} 通过id获取改商品是否选中
			state.car.forEach(function (item) {
				s[item.id] = item.selected;
			});
			return s;
		},
		getGoodsCountSum: function (state) { //获取购物车中选中商品的总数和总价
			var o = {
				count:0, //件数
				sum:0 //总价
			};
			state.car.forEach(function (item) {
				// 根据相中状态获取商品总数和总价
				if(item.selected) {
					o.count += item.count;
					o.sum += item.count * item.price;
				}
			});
			return o;
		}
	}
});

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
	router: router,
	store: store //挂载vuex state状态管理对象
});