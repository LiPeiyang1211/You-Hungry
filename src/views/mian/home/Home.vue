<template>
	<div class="home">
		<vHead title="首页">
			<!-- 使用具名插槽 -->
			<template v-slot:header_main>
				<!-- 城市/地址 -->
				<div class="home_header">
					<div  @click="show.side=true">
						<i class="iconfont icon-iconlocation"></i>
						<span >{{currentSide?currentSide:"请选择城市/地址"}}</span>
						<i class="iconfont icon-xiala"></i>
					</div>
					<!-- 搜索商家 -->
					<div class="header_search" v-fixed>
						<p class="search_main">
							<i class="iconfont icon-icon_sousuo"></i>
							搜索商家
						</p>
					</div>
				</div>
			</template>
		</vHead>
		
		<!-- 测试：{{foodType}} -->

		<!-- 轮播图的开始 -->
	     <div class="foodType">
			<van-swipe class="my-swipe" :autoplay="0" :loop="false">
			  <van-swipe-item v-for="items in spliceFood">
				  <div class="foodType">
				<!-- 分类入口 -->
					<ul class="flex foodType_main" >
						<li class="foodType_item" v-for="item in items">
							<img :src="$formatImgSrc(item.image_hash)" alt="">
							<span class="f_title">
								{{item.name}}
							</span>
						</li>
					</ul>
				</div> 
			  </van-swipe-item>
			</van-swipe>
		</div>
		<!-- 轮播图的结束 -->
		<!-- 筛选组件 -->
		<vFilter v-fixed:60></vFilter>
		
		<!-- 首页列表 -->
		<vEList></vEList>
		
		<!-- {{spliceFood}} -->
		<Side class="header_side" v-show="show.side" @sback="show.side=false" @changSide="saveSide"></Side>
	</div>
</template>

<script>
	import vHead from '@comps/header/Header.vue'
	import Side from '@comps/side/Side.vue'
	import vFilter from '@comps/filter/Filter.vue'
	import vEList from '@comps/elist/EList.vue'
	
	import { Swipe, SwipeItem } from 'vant';
	import homeModel from './js/homeModel.js'
	export default{
		components:{
			vHead,
			Side,
			vFilter,
			vEList,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			
		},
		setup(){
			const {show,saveSide,currentSide,foodType,spliceFood} =homeModel();
			return{
				show,
				saveSide,
				currentSide,
				foodType,
				spliceFood,
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
	// .my-swipe .van-swipe-item {
	//     color: #fff;
	//     font-size: 20px;
	//     line-height: 150px;
	//     text-align: center;
	//     background-color: #39a9ed;
	//   }
	.home{
		// height: 53.333333rem;//2000
		/* 头部部分start */
		 .home_header{
			 // 20 20 5 20
			 padding: 0.533333rem 0.533333rem 0.266666rem 0.533333rem;
			 font-size: 0.64rem;//24
			 color: #fff;
			 .icon-iconlocation{
				 font-size: 90%;
			 }
			 span{
				 margin: 0rem 0.133333rem;
				 font-size: 0.48rem;//18
				 font-weight: 520;
			 }
			 
			/* 搜索商家 */
			 .header_search{
				 background-image: linear-gradient(90deg,#51acfc,#206bfe);
				 padding: 0.266666rem 0.266666rem; //10px
				 z-index: 10;
				 .search_main{
					 font-size: 0.373333rem;//14
					 background-color: #fff;
					 color: #999;
					 text-align: center;
					 line-height:1.066666rem ;
					 width: 95%;
					 .icon-icon_sousuo{
						 font-family: simsun;
						 margin-right: 0.266666rem;
					 }
				 }
			 }
			/* 搜索商家end */
		 }
	    /* 头部部分end */
		.header_side{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
		.foodType{ /* 轮播开始*/
		        height:5.866666rem;//220
		        .foodType_main{
		            flex-wrap:wrap;
		        }
		        .foodType_item{
		            width:20%;
		            margin-top:0.533333rem;//20
		            color:#666;
		            text-align:center;
		            span{
		                color:#666;
		            }
		            img{
		                display:block;
		                width:1.333333rem;//50
		                height:1.333333rem;
		                margin:0.053333rem auto;//2
		            }
		        }
		        //  .mint-swipe-indicators{
		            // .is-active{
		                //   background-color:red;
		                // }
		            //  }
		    } /* 轮播结束*/
	}
</style>
