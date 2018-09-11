<template>
	<div class="commentBox">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请发表您的评论(最多吐槽120字)" maxlength="120"></textarea>
		<button class="push">发表评论</button>
		<div class="ctmList">
			<div class="ctmItem" v-for="(item,i) in comments" :key="item.username">
				<div class="ctmHead">
					第{{ i+1 }}楼&nbsp;用户：{{ item.username }}&nbsp;发表时间：{{ item.addtime }}
				</div>
				<div class="ctmCon">
					{{ item.content }}
				</div>
			</div>
		</div>
		<button class="more" @click="getMore">加载更多</button>
	</div>
</template>
<script>
	export default{
		data: function () {
			return {
				pageindex:1,
				comments:[]
			}
		},
		created: function () {
			this.getComment();
		},
		methods: {
			getComment: function () {
				this.$http.get("getcomments/"+this.id+"?pageindex="+this.pageindex).then(function (result) {
					if(result.body.code === 0) {
						// concat方法拼接数组，新老数据需要累加，而不是覆盖
						this.comments = this.comments.concat(result.body.data);
					}else {
						Toast('数据请求失败！！');
					}
				})
			},
			// 获取更多评论，页数加一，再重新获取数据
			getMore: function () {
				this.pageindex++;
				this.getComment();
			}
		},
		props:["id"]
	}
</script>
<style lang="less">
	.commentBox{
		>h3{
			font-size:16px;
			color:#333;
			margin:20px 0 10px;
		}
		>textarea{
			margin:0;
			font-size:12px;
			color:#333;
		}
		>.push{
			width:100%;
			color:white;
			background:#26a2ff;
			border:0;
			height:30px;
		}
		>.ctmList{
			margin:5px 0;
			>.ctmItem{
				font-size:12px;
				>.ctmHead{
					height:30px;
					line-height:30px;
					background:#ccc;
					color:#333;
					padding-left:5px;
				}
				>.ctmCon{
					padding:5px;
				}
			}
		}
		>.more{
			width:100%;
			color:red;
			background:transparent;
			border:1px solid red;
			height:30px;
		}
	}
</style>