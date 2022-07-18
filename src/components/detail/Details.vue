<template>
	<div class="detail" v-if="rst">
		<!-- 头部 -->
		<!-- shop_sign -->
		<div class="detail_header" :style="{backgroundImage:`url(${$formatImgSrc(rst.shop_sign.image_hash)})`}">
			<router-link to="/home">
				<button class="header_btn">&lt;</button>
			</router-link>
			<div class="header_logo">
				<img :src="$formatImgSrc(rst.image_path)" alt="">
			</div>
		</div>
		<!-- 描述部分 start-->
		<div class="detail_desc">
			<!-- 店铺名 -->
			<h2 class="desc_title" @click="show.desc=true">{{rst.name}}</h2>
			<!-- 店铺的详情 弹出层-->
			<!-- 通过 v-model:show 控制弹出层是否展示。 -->
			<van-popup 
			   closeable
			   v-model:show="show.desc"
			   :close-on-click-overlay="false"
			   class="title_detail"
			   >
				<h2 class="desc_title">{{rst.name}}</h2>
				<!-- 评价、月售、配送约 -->
				<div class="desc_evaluate">
					<span>评价{{rst.rating}}分</span>
					<span>月售{{rst.recent_order_num}}单</span>
					<span>配送约{{rst.order_lead_time}}分钟</span>
				</div>
				<!-- 公告 -->
				<div class="desc_notice t_ellipsis">
					<!-- 公告：{{rst.promotion_info}} -->
					<van-notice-bar
					  left-icon="volume-o"
					  scrollable
					  :text="rst.promotion_info"
					/>
				</div>
			   </van-popup>
			
			<!-- 评价、月售、配送约 -->
			<div class="desc_evaluate">
				<span>评价{{rst.rating}}分</span>
				<span>月售{{rst.recent_order_num}}单</span>
				<span>配送约{{rst.order_lead_time}}分钟</span>
			</div>
			<!-- 优惠劵 -->
			<div class="desc_coupon" v-if="redpack.length">
				
				<div class="coupon_main">
					<div class="coupon_item flex type0" @click="show.coupon=true" v-for="item in redpack">
						<!-- {{redpack}} -->
						<span class="mian_value">{{item.value}}</span>
						<span class="mian_detail">{{item.title}}</span>
						<span class="mian_btn">领取</span>
					</div>
				</div>
				
				<!-- 优惠券 弹出层 -->
				<van-popup
				   closeable
				   v-model:show="show.coupon"
				   :close-on-click-overlay="false"
				   round
				   position="bottom"
				   class="coupon_detail detail_slide"
				   >
				  <div class="detail_title">店铺专属红包</div>
					  <div class="coupon_item flex type0" v-for="item in redpack">
						<!-- {{redpack}} -->
						<span class="mian_value">{{item.value}}</span>
						<span class="mian_detail">{{item.title}}</span>
						<span class="mian_btn">领取</span>
					  </div>
				 </van-popup>
			</div>
			<!-- 活动 -->
			<div class="desc_activity">
				<div class="activity_main flex" @click="show.activities=true">
					<activityList :data="[rst.activities[0]]" class="grow_shrink"></activityList>
					<div class="activity_more">共{{rst.activities.length}}个优惠<i class="iconfont icon-xiala"></i></div>
				</div>
				
				<!-- 所有活动 弹出层 -->
				<van-popup
				   closeable
				   v-model:show="show.activities"
				   :close-on-click-overlay="false"
				   round
				   position="bottom"
				   class="activity_detail detail_slide"
				   >
					  <div class="detail_title">所有优惠</div>
					  <activityList :data="rst.activities" class="detail_list"></activityList>
				   </van-popup>
			</div>

			<!-- 公告 -->
			<div class="desc_notice t_ellipsis">
				<!-- 公告：{{rst.promotion_info}} -->
				<van-notice-bar
				  left-icon="volume-o"
				  scrollable
				  :text="rst.promotion_info"
				/>
			</div>
		</div>
		<!-- 描述部分 end-->
        <!-- 主体内容 -->
        <div class="detail_main">
            <!-- 导航 -->
            <nav class="main_nav flex" v-fixed ref="detail_nav">
                <div class="nav_item">
                   <router-link :to="d_paths.menu">点餐</router-link>
                </div>
				<div class="nav_item">
					<router-link :to="d_paths.evaluate">评价</router-link>
				</div>
				<div class="nav_item">
				   <router-link :to="d_paths.merchant">商家</router-link>
				</div>
				
            </nav>
			<router-view></router-view>
        </div>
		<!-- 购物车 将商家id传递给购物车组件-->
		<shoppingCart :resId="rst.id"></shoppingCart>
	</div>
</template>

<script>
	import detailModel from './js/detailModel.js'
	import activityList from '../activitylist/ActivityList.vue'
	import shoppingCart from '@comps/shoppingcart/ShoppingCart.vue'
	import { NoticeBar,Icon,Popup,Overlay} from 'vant';
	export default{
		components:{
			activityList,
			shoppingCart,
			[NoticeBar.name]:NoticeBar,
			[Popup.name]:Popup
		},
		setup(){
			const {rst,redpack,show,d_paths} =detailModel();
			
			return{
				rst,
				redpack,
				show,
				d_paths
			}
		}
	}
</script>

<style lang="scss">
	.detail {

		/* 商家头部 */
		.detail_header {
			position: relative;
			height: 3.6rem; //135
			margin-bottom: 0.4rem; //15
			background: no-repeat center/cover;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				z-index: 5;
				width: 100%;
				height: 100%;
				background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
			}

			.header_btn {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 10;
				font-size: 0.8rem; //30
				font-family: SimHei;
				width: 1.333333rem;
				height: 1.333333rem; //50
				color: #fff;
			}

			.header_logo {
				position: absolute;
				left: 0;
				right: 0;
				z-index: 10;
				bottom: -0.4rem; //15
				width: 2.4rem;
				height: 2.4rem; //90
				margin: auto;
				border: 1px solid #ddd;

				img {
					width: 100%;
					height: 100%;
				}

			}

		}

		// 商家描述
		.detail_desc {
			padding-top: 0.533333rem; //20
			.desc_title {
				font-size: 0.533333rem; //20
				font-weight: 600;
				text-align: center;

				&::after {
					content: '';
					display: inline-block;
					vertical-align: middle;
					width: 0;
					height: 0;
					margin-left: 0.16rem; //6
					border: 8px solid transparent;
					border-left-color: #000;
				}
			}

			/* 商家名称 */
			.title_detail {
				position: fixed;
				bottom: 0;
				z-index: 100;
				margin: auto;
				width: 9.6rem; //400
				height: 9.6rem; //360
				background-color: #fff;
				border-radius: 0.16rem; //6

				.desc_title {
					margin-top: 0.533333rem; //20
				}

				.btn {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0.266666rem; //10
					width: 1.066666rem; //40
					height: 1.066666rem; //40
					margin: auto;
					background-color: rgba(0, 0, 0, 0.5);
					color: #fff;
					border-radius: 50%;
					font-size: 0.8rem; //30
				}
			}

			.desc_evaluate {
				margin: 0.266666rem 0; //10
				text-align: center;

				span {
					margin: 0 0.266666rem; //10
					color: '#666';
				}
			}

			/* 优惠券 */
			.desc_coupon {
				margin: 0.266666rem; //10

				.coupon_main {
					text-align: center;

					.coupon_item {
						position: relative;
						display: inline-flex;
						width: 4.4rem; //165
						height: 0.906666rem; //34
						margin: 0 0.08rem; //3
						line-height: 0.906666rem; //34
						font-size: 0.373333rem; //14
						align-items: center;

						&::before,
						&::after {
							content: '';
							position: absolute;
							width: 0.053333rem; //2
							height: 0;
							right: 1.173333rem; //44
							border: 0.106666rem solid transparent; //4
						}

						&::before {
							top: 0;
							border-top-color: #fff;
						}

						&::after {
							bottom: 0;
							border-bottom-color: #fff;
						}

						span {
							color: #845454;
						}

						.mian_value {
							margin-left: 0.533333rem; //20
							color: #6D6C29;
							font-size: 0.373333rem; //14

							&::before {
								font-size: 0.373333rem; //14
								content: '￥';
							}
						}

						.mian_detail {
							width: 2.266666rem; //85
							overflow: hidden;
						}

						.mian_btn {
							position: absolute;
							right: 0.266666rem; //10
						}
					}

					.type0 {
						background-color: rgb(255, 244, 244);
					}
				}

				.coupon_detail {
					height: 8rem; //300
				}
			}

			/* 活动 */
			.desc_activity {
				margin-bottom: 0.266666rem; //10

				.activity_main {
					width: 6.933333rem; //260
					margin: 0 auto;

					.activity_more {
						margin-left: 0.266666rem; //10
					}
				}

				.activity_detail {
					overflow: auto;

					button {
						position: absolute;
						top: 0.4rem; //15
						right: 0.266666rem; //10
						font-size: 0.4rem; //15
					}

					.detail_list {
						padding: 0 0.266666rem; //10
						overflow: hidden;
					}
				}
			}

			.desc_notice {
				text-align: center;
				font-size: 0.426666rem; //18

				.van-icon {
					position: relative;
				}
			}
		}

		/* 优惠券 */
		.detail_slide {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			height: 10.133333rem; //380
			background-color: #fff;

			.detail_title {
				margin: 0.266666rem 0; //10
				font-size: 0.533333rem; //20
				font-weidht: 700;
				text-align: center;
			}

			.van-icon {
				position: absolute;
			}
		}
			/* 主体内容 */
		.detail_main{
		  a{
			  text-decoration: none;
		  }
		  .main_nav{
			background-color:#fff;
			border-bottom:1px solid #ddd;
			.nav_item{
			  text-align:center;
			  flex-grow:1;
			  a{
				display:inline-block;
				line-height:1.333333rem;//50
				font-size:0.426666rem;//16
				color:#777;
				border-bottom:2px solid transparent;
				&.router-link-active{
				  color:#333;
				  font-weight:700;
				  border-bottom-color:#FF6969;
				}
		      }
		    }
		  }
		}
	}
</style>



