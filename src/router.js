// 导入vue-router
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'

// 创建路由实例
var router = new VueRouter({
	routes:[ //配置路由规则
		{path:'/',redirect:'/home'},//默认访问主页(重定向)
		{path:'/home',component:HomeContainer},
		{path:'/member',component:MemberContainer},
		{path:'/shopcar',component:ShopcarContainer},
		{path:'/search',component:SearchContainer},
	],
	linkActiveClass:'mui-active' //路由选中高亮，默认的是router-link-active
})

// 将路由实例暴露出去
export default router