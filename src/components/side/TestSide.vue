<template>
	<div class="side">
		<!-- 地址选择 -->
		<div class="side_main">
			<vHead class="main_header" title="选择收获地址">
				<span class="add">新增地址</span>
			</vHead>
		</div>
		<!-- 城市选择 -->
		<div class="side_city">
			<!-- 城市选择头部 -->
			<vHead class="city_header" title="城市选择">
				<!-- 搜索城市 -->
				<div class="city_search flex">
					<i class="iconfont icon-icon_sousuo"></i>
		
					<input class="cinput" type="text" placeholder="请输入城市名或者拼音"/>
				</div>
			</vHead>
			
			
			
			<div class="city_mian">
				<van-index-bar>
				 <ul v-for="(items,k,i) in citys">
					  <van-index-anchor :index="k" />
					  <li class="add_list" v-for="(item,i) in items">
					    {{item.name}}
					  </li>
				 </ul>
			
				
				
					
				</van-index-bar>
			</div>

			
<!-- 			<li v-for="item in cityList">
				{{item.name}}
			</li> -->
			
		</div>
	</div>
</template>

<script>
	import vHead from '@comps/header/Header.vue'
	import {getCurrentInstance,toRefs,reactive} from 'vue'
	import { IndexBar, IndexAnchor } from 'vant';
	export default{
		components:{
			vHead,
			[IndexBar.name]: IndexBar,
			[IndexAnchor.name]: IndexAnchor,
		},
		setup(){
			/* 
			    vue2.0 原先通过在vue原型挂载axios，可以在组件实例通过this.$axios进行访问
				vue3.0 中没有this了,可以通过getCurrentInstance获取当前组件实例
			 */
			// console.log(ctx)
			// console.log(getCurrentInstance())
		   const {ctx,proxy}=getCurrentInstance();
		   const data=reactive({
			   cityList:null,
			   citys:{
				   A:[
				   		 {
				   			 label: "阿坝Aba0837",
				   			 name: "阿坝",
				   			 pinyin: "Aba",
				   			 zip: "0837",
				   		 },{
				   			 label: "阿城Acheng0451",
				   			 name: "阿城",
				   			 pinyin: "Acheng",
				   			 zip: "0451",
				   		 }
				   ],
				   B:[
				   		 {
				   			label: "本溪Benxi0414",
				   			name: "本溪",
				   			pinyin: "Benxi",
				   			zip: "0414",
				   		 },{
				   			 label: "本溪Benxi0414",
				   			 name: "本溪",
				   			 pinyin: "Benxi",
				   			 zip: "0414",
				   		 }
				   ]
			   }
		   })
		   /* 
				注意：
					getCurrentInstance方法，是用来获取当前实例的，通过上下文ctx,获取当前
					的方法。在打包之后无法获取全局挂载的方法。ctx只适合开发环境。
					
					如果说是需要上线，那么需要将ctx换成proxy
		   */
		   // ctx.$axios('/citylist').then((res)=>{
			  //  console.log(res)
			  //  data.cityList=res.data
		   // })
		   
		   proxy.$axios('/citylist').then((res)=>{
		   			   console.log(res)
		   			   data.cityList=res.data
		   })
			
			return{
				...toRefs(data)
			}
		}
	}
</script>

<style lang="scss">
	.side{
		height: 100%;
		// background-color: #fff;
		.side_main,.side_city{
			height: 100%;
			background-color: #f4f4f4;
		}
		.side_main{
			.main_header{
				.add{
					position: absolute;
					right: 0.266666rem;
					top: 0;
					line-height: 1.466666rem;//55
					color: #fff;
					font-size: 0.426666rem;//16
				}
			}
		}
		
		.side_city{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.city_header{
				padding-bottom: 0.026666rem;
			}
			.city_search{
				margin: 0.266666rem 0.933333rem;
				background-color: #fff;
				padding: 0.266666rem 0.533333rem;
				border-radius:2.666666rem;
				color:#999;
				font-size: 0.32rem;
				font-weight: 600;
			}
			.cinput{
				background-color: #fff;
				width: 90%;
				color:#999;
				margin-left: 0.213333rem;
			}
		}
		/**列表模块**/
		.add_list {
			height: 0.4rem;//15
			background-color: #fff;
			padding: 0.4rem;//15
			font-size: 0.373333rem;//14
			border-bottom: 1px solid rgba(166, 166, 166, 0.1);
		}
		
	}
</style>
