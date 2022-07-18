<template>
	<!-- 工具条 -->
	<div class="tool-bar-warp pink">
		<ul class="tool-bar flex">
			<!-- grow_shrink 宽度平分 -->
			<li class="tool-bar-item grow_shrink"
				v-for="(item,i) in bar_items"
				:key="i"
			>
				<router-link :to="item.link">
				<i class="iconfont" :class="item.icon"></i>
				<span>{{item.name}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {reactive,toRefs} from 'vue'
	export default{
		/* composition API */
		setup(){
			/* 定义数组对象，存放toolbar 所需的图标和文字 */
			const data=reactive({
				bar_items:[
					{
						name:'首页',
						icon:'icon-shouye2',
						link:'home'
					},{
						name:'发现',
						icon:'icon-faxian',
						link:'discover'
					},{
						name:'订单',
						icon:'icon-dingdan',
						link:'order'
					},{
						name:'我的',
						icon:'icon-wode',
						link:'mine'
					}
					
				]
			})
			
			// 要在template中使用 setup中的属性，需要return出去
			return{
				...toRefs(data)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.tool-bar-warp{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		.tool-bar{
			box-shadow: 0 0 0.106666rem #000; //4px
			background-color: #53affc;
			.tool-bar-item{
				text-align: center;
				padding: 0.133333rem 0; //5
				font-size: 0.373333rem; //14
				color: #ccc;
				.iconfont{
					display: block;
					font-size: 0.64rem; //24
					margin-bottom: 0.16rem;
				}
				a{
					display: block;
					text-decoration: none;
				}
			}
			.router-link-active{
				color: #fff;
				font-size: 500;
			}
		}
	}
</style>
