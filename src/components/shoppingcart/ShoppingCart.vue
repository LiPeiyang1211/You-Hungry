<template>
	<div class="shoppingCarWrapper">
		<!-- 购物车 工具栏 -->
		<div class="shoppingCar flex">
			<div class="car_main flex">
				<div class="car_icon"
					:class="{car_icon_ok:count_all>=0}"
					:style="{animation: aName}"
					@click="show =!show"
				>
					<b class="icon_count">{{count_all}}</b>
					<i class="iconfont icon-gouwuche1"></i>
				</div>
				<div class="car_price">
					<div class="price_top">
						<!-- 当现价大于 起送价格， 显示 现价总价 -->
						<p v-if="allPrice.price >= base_price">
							<!-- 现价 -->
							<span class="price symbol">{{allPrice.price}}</span>
							<!-- 原价 -->
							<span class="origin_price symbol">{{allPrice.oPrice}}</span>
						</p>
						<p class="price_bottom" v-else>
							还不够吃~
						</p>
					</div>
					<p>{{rst.piecewise_agent_fee.description}}</p>
				</div>
			</div>
			<div class="car_submit">
				<div class="submit_base" v-if="(base_price - allPrice.price) >=0">
					还差{{(base_price - allPrice.price).toFixed(1)}}元起送
				</div>
				<div class="submit_ok" v-else>去结算</div>
			</div>
		</div>
		<!-- 购物车列表 -->
		<transition name="list">
		    <div class="shoppingCar_list" v-show="show" v-if="count_all>=0">
		        <p class="list_discountsMess">已减{{(allPrice.oPrice - allPrice.price).toFixed(1)}}元</p>
		        <div class="list_title flex">
		            <div class="title_name">
		                <span>已选商品</span>
		            </div>
		            <div class="title_clear"
					     @click="$store.commit('clearCart',resId)"
		                 >
		                <i class="iconfont icon-huishouzhan"></i>清空
		            </div>
		        </div>
		        <div class="list_wrapper">
					<!-- 商品名称、单价、数量 -->
		            <ul class="list_main" v-if="foods">
		                <li v-for="food in foods">
		                    <div class="main_desc t_ellipsis">
		                        <span class="desc_name">{{food.item.name}}</span>
		                    </div>
		                    <div class="main_price">
		                        <span class="price_num symbol">
									{{food.item.specfoods[0].price}}
							   </span>
							   <!-- 加/减购物车的按钮 -->
							   <basebutton
								:count="count(food.item)"
								@changNum="changCount({item:food.item,cid:food.cid},$event)"></basebutton>
		                    </div>
		                </li>
		            </ul>
		        </div>
		    </div>
		</transition>
	</div>
</template>

<script>
	import cartModel from './js/cartModel.js'
	import menuModel from '../detail/js/menuModel.js'
	import basebutton from '@comps/buttton/BaseButton.vue'
	export default{
		props:{
			resId:Number
		},
		components:{
			basebutton
		},
		setup(props){
		  const {foodState,allPrice,count_all,base_price,rst,aName,foods,show}=cartModel(props);
		  // 菜单列表
		  const {count,changCount}=menuModel();
		  return{
			  foodState,allPrice,count_all,base_price,rst,aName,foods,show,
			  count,changCount
		  }
		}
	}
</script>

<style lang="scss">
	.list-enter-active,
	.list-leave-active{
		transition:0.5s;
	}
	.list-enter,
	.list-leave-to{
		transform:translateY(100%);
	}
	@keyframes car {
		25% {
			transform: scale(0.9);
		}

		50% {
			transform: scale(1);
		}

		75% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}

	.shoppingCarWrapper {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;

		.symbol::before {
			content: '￥';
		}
	}

	.shoppingCar {
		position: relative;
		z-index: 10;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.9);
		color: #fff;

		.car_main {
			.car_icon {
				position: relative;
				width: 1.493333rem;
				height: 1.493333rem; //56
				margin: -0.266666rem 0 0 0.533333rem; //10 20
				background-color: #363636;
				border: 0.16rem solid #444; //6
				line-height: 1.333333rem; //50
				color: #5F5F63;
				text-align: center;
				border-radius: 50%;
				animation: paused 0.5s;

				.icon_count {
					position: absolute;
					right: -0.133333rem;
					top: -0.133333rem; //5
					background-color: #F62571;
					color: #fff;
					padding: 0 0.186666rem; //7
					line-height: 0.586666rem; //22
					border-radius: 50px; //50
				}

				.icon-gouwuche1 {
					font-size: 0.933333rem; //35
				}
			}

			.car_icon_ok {
				color: #fff;
				background-color: #1FB3F0;
			}

			.car_price {
				margin-left: 0.266666rem; //10
				color: #999;
				font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;

				.price_top {
					height: 0.586666rem; //22
					margin-top: 0.426666rem; //16
				}

				.price_bottom {
					font-size: 0.373333rem; //16
				}

				.price {
					font-size: 0.48rem; //18
					color: #fff;
				}

				.origin_price {
					margin-left: 0.16rem; //6
					text-decoration: line-through;
				}
			}
		}

		.car_submit {
			width: 4.32rem; //162
			font-weight: 600;
			font-size: 0.48rem; //18
			line-height: 1.76rem; //66
			text-align: center;

			.submit_base {
				background-color: #777;
			}

			.submit_ok {
				background-color: #69F398;
			}
		}
	}

	.shoppingCar_list {
		position: absolute;
		left: 0;
		bottom: 100%;
		z-index: 5;
		width: 100%;
		background-color: #F3EBCD;

		.list_discountsMess {
			text-align: center;
			line-height: 2;
		}

		.list_title {
			justify-content: space-between;
			line-height: 1.493333rem;//56
			background-color: #ECEFF1;
			color: #666;

			.title_name {
				padding: 0 0.266666rem;//10
				font-size: 0.373333rem;//14
			}

			.title_clear {
				padding: 0 0.266666rem;//10
				font-size: 0.373333rem;//14

				.icon-huishouzhan {
					margin-right: 0.16rem;
					font-size: 110%;
				}
			}
		}

		.list_wrapper {
			max-height: 13.333333rem;
			overflow: auto;
			background-color: #fff;

			.list_main {
				li {
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #f5f5f5;
					line-height: 60px;
					margin: 0 10px;

					.main_desc {
						.desc_name {
							font-size: 0.426666rem;
						}
					}

					.main_price {
						display: flex;
						align-items: center;

						.price_num {
							color: #F75858;
							font-weight: 600;
							margin-right: 0.266666rem;
							font-size: 0.426666rem;

							&::before {
								font-size: 70%;
							}
						}
					}

				}
			}
		}
	}
</style>