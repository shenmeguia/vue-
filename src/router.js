// 导入vue-router
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
// 创建路由实例
var router = new VueRouter({
	routes:[ //配置路由规则
		{path:'/',redirect:'/home'},//默认访问主页(重定向)
		{path:'/home',component:HomeContainer},
		{path:'/member',component:MemberContainer},
		{path:'/shopcar',component:ShopcarContainer},
		{path:'/search',component:SearchContainer},
		{path:'/home/newslist',component:NewsList},
		{path:'/home/newsinfo/:id',component:NewsInfo},
		{path:'/home/photolist',component:PhotoList},
		{path:'/home/photoinfo/:id',component:PhotoInfo},
		{path:'/home/goodslist',component:GoodsList},
		{path:'/home/goodsinfo/:id',component:GoodsInfo},
		{path:'/home/goodsdesc/:id',component:GoodsDesc},
		{path:'/home/goodscomment/:id',component:GoodsComment}
	],
	linkActiveClass:'mui-active' //路由选中高亮，默认的是router-link-active
})

// 将路由实例暴露出去
export default router