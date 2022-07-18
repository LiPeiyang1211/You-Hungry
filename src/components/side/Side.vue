<template>
	<div class="side">
		<!-- 地址选择 -->
		<div class="side_main">
			<vHead class="main_header" title="选择收获地址"  @back="$emit('sback')">
				<span class="add">新增地址</span>
			</vHead>
			<!-- 地址选择 -->
			<div class="main_search flex" @click="show.city=true">
				<!-- 如果选择了城市，就显示选择的城市名称，否则显示请选择城市 -->
			    <span class="search_name">
			      	{{currentCity?currentCity : '请选择城市'}}
			    </span>
			    <i class="iconfont icon-xiala"></i>
			    <!-- 搜索框 -->
			    <p class="search_input">
			        <i class="iconfont icon-icon_sousuo"></i>
			        <input type="text" class="input" placeholder="请输入地址">
			    </p>
			</div>
			<!--当前地址 -->
			<div class="current_box">
			    <span>当前地址</span>
			    <li class="add_list">
			        无
			    </li>
			</div>
		</div>
		
		
		<!-- 城市选择 -->
		<!-- 隐藏城市列表 -->
		<div class="side_city" v-show="show.city">
			<!-- 城市选择头部 -->
			<!-- 返回收货地址 -->
			<vHead class="city_header" title="城市选择"  @back="show.city=false">
				<!-- 搜索城市 -->
				<div class="city_search flex">
					<i class="iconfont icon-icon_sousuo"></i>
		
					<input class="cinput" v-model="searchStr" type="text" placeholder="请输入城市名或者拼音"/>
				</div>
			</vHead>
			
			<!-- 搜索时显示的列表 -->
			<div class="search_box" v-show="searchStr">
				<ul>
					  <li class="add_list" v-for="(item,i) in citySearch"  @click="selectCity(item)">
						{{item.name}}
					  </li>
				</ul>
			</div>
			
			<!-- 城市列表 -->
			<div class="city_mian" v-show="!searchStr">
			   <!-- 当前城市 -->
				<div class="current_box">
					<span>当前城市</span>
					<li class="add_list">
						{{currentCity}}
					</li>
				</div>
				<van-index-bar>
				 <ul v-for="(items,k,i) in cityName">
					  <van-index-anchor :index="k" />
					  
					  <li class="add_list" v-for="(item,i) in items" @click="selectCity(item)">
					    {{item.name}}
					  </li>
				 </ul>
				</van-index-bar>
			</div>
			
		</div>
	</div>
</template>

<script>
	import vHead from '@comps/header/Header.vue'
	import {getCurrentInstance,toRefs,reactive} from 'vue'
	import { IndexBar, IndexAnchor } from 'vant';
	import cityModel from './js/cityModel.js'
	export default{
		components:{
			vHead,
			[IndexBar.name]: IndexBar,
			[IndexAnchor.name]: IndexAnchor,
		},
		setup(){
		const {cityList,cityName,searchStr,citySearch,selectCity,currentCity,show} =cityModel();
		   

			
			return{
				cityList,
				searchStr,
				citySearch,
				cityName,
				selectCity,
				currentCity,
				show
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
				// 搜索模块开始
						.main_search {
							align-items: center;
							background-color: #fff;
							padding: 0.32rem;//12
			
							.search_name {
								width: 1.066666rem;//40px
								text-align: center;
								font-size: 0.32rem;//12
								// 字体超出隐藏
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
			
							.search_input {
								padding: 0.16rem;//6
								margin-left: 0.266666rem;//10
								background-color: #f4f4f4;
			
								.iconfont {
									font-size: 0.32rem;//12
									font-weight: 600;
									color: #999;
								}
			
								.input {
									padding: 0.133333rem;//5
									width: 6.666666rem;//250
									color: #999;
								}
							}
			
							// 搜索框结束
			                // 当前地址
						.new_add {
							margin: 0.266666rem;//10
							font-size: 0.373333rem;//14
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
		 .search_box{
				/* 自适应填满剩余空间 */
				flex-grow: 1;
				flex-shrink: 1;
				overflow: auto;
			}
			.current_box{
				span{
					line-height:35px;
					padding: 15px;
					font-size: 14px;
					color: #999;
				}
			}
		
	}
</style>
