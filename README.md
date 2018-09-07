# 这是一个vue项目
# 传统方式把修改过后的代码上传到码云
1.git add .
2.git commit -m "提交信息"
3.git push

## 制作首页APP组件
1.完成header区域，使用mint-ui中的Header组件
2.制作底部的Tabbar区域，使用的是mui的Tabbar
	+要使用购物车图标时先要把扩展图标的css样式拷贝到项目中
	+对应的扩展字体库ttf文件也需要拷贝到项目中
	+添加相应样式
3.中间区域放置一个router-view来展示路由匹配到的组件

##改造Tabber为router-link
##设置路由高亮

##点击Tabber中的路由链接，展示对应的路由组件

##制作首页轮播图mint-ui中的组件

##加载首页轮播图的数据
1.获取数据，使用vue-resource
2.使用vue-resource 的this.$http.get 获取数据
3.获取到的数据保存到data身上
4.使用v-for循环渲染每个item项

##改造九宫格区域的样式

##添加中间路由切换过渡效果