<template>
	<div class="menu">
		<!-- 推荐 -->
		<div class="menu_recommend" v-if="recommend" v-for="recom in recommend">
			<h3 class="recommend_title">{{recom.name}}</h3>
			<div class="recommend_view">
				<ul class="view_slide flex">
					<li class="slide_item" v-for="item in recom.items">
						<img class="item_img" :src="$formatImgSrc(item.image_path)">
						<p class="item_name t_ellipsis">{{item.name}}</p>
						<p class="item_rating">
							<span>月售{{item.month_sales}}份</span>
							<span v-if="item.satisfy_rate">好评{{item.satisfy_rate}}%</span>
						</p>
						<!-- 价格 -->
						<div class="item_count flex" v-for="food in  item.specfoods">
							<span class="count_price">{{food.price.toFixed(1)}}</span>
							<!-- 加/减少购物车的按钮 -->
							<basebutton :count="count(item)" @changNum="changCount({item:item,cid:'recommend'},$event)"></basebutton>
						</div>
						
					</li>
				</ul>
			</div>
		</div>
		<!-- 菜单列表 -->
		<div class="menu_main flex" :style="{height:con_height}" ref="menu_main" v-if="menu">
			<!--左侧 菜单项 -->
			<ul class="main_class">
				<li class="class_item " :class="{class_active:menu_index === i}" @click="menuSelect(i)" v-for="(item,i) in menu">
					<p>
						<img :src="$formatImgSrc(item.icon_url)" alt="" v-if="item.icon_url">
						<span>{{item.name}}</span></p>
						<!-- 分类的数量 -->
						<span class="item_countClass" v-if="cateCount(rst.id,item.id)">{{cateCount(rst.id,item.id)}}</span>
				</li>
			</ul>
			
			<!-- 菜单主体 -->
			<div class="main_con grow_shrink" ref="main_con">
				<div class="slideWrap">
					<dl class="con_item" v-for="item in menu">
						<!-- 分类标题 -->
						<dt class="item_title">
							<span class="title_main">{{item.name}}</span>
							<span class="title_desc">{{item.description}}</span>
						</dt>
						<!-- 主体内容 -->
						<dd class="item_desc flex" v-for="food in item.foods">
							<img class="desc_img" :src="$formatImgSrc(food.image_path)" alt="">
							<div class="desc_main">
								<h3 class="main_name t_ellipsis">{{food.name}}</h3>
								<p class="main_rating  t_ellipsis">
									<span>月售{{food.month_sales}}份</span>
									<span>好评率{{food.satisfy_rate}}%</span>
								</p>
								<p class="main_discount" v-if="food.activity">
									<span class="discount_icon">{{food.activity.benefit_text}}</span>
									<span>{{food.activity.description}}</span>
								</p>
								<!-- 价格 -->
								<div class="main_btn flex">
									<div class="btn_price">
										<!-- 现价 -->
										<span class="price">{{food.specfoods[0].price}}</span>
										<!-- 原价 -->
										<span class="originPrice" v-if="food.specfoods[0].original_price">
										{{food.specfoods[0].original_price}}
									   </span>
									</div>
									<!-- 加/减购物车的按钮 -->
									<basebutton :count="count(food)" @changNum="changCount({item:food,cid:item.id},$event)"></basebutton>
								</div>
								
								
							</div>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import menuModel from '../js/menuModel.js'
	import heightModel from '../js/heightModel.js'
	import basebutton from '@comps/buttton/BaseButton.vue'
	export default{
		components:{
			basebutton
		},
		setup(){
			const {recommend,menu,changCount,count,rst,cateCount}= menuModel();
			const {con_height,menuSelect,menu_index}= heightModel();
			
			return {
					 recommend,menu,con_height,menuSelect,menu_index,changCount,count,rst,cateCount
			}
		}
	}
</script>

<style lang="scss">
	.menu {
		.menu_recommend {
			margin-top: 0.533333rem; //20

			.recommend_title {
				margin-left: 0.4rem; //15
				padding: 0.266666rem 0; //10
				font-size: 0.586666rem; //22
				font-weight: 700;
			}

			.recommend_view {
				overflow-x: auto;
				overflow-y: hidden;

				&::-webkit-scrollbar {
					display: none;
				}

				&::-moz-scrollbar {
					display: none;
				}

				.view_slide {
					.slide_item {
						width: 3.2rem; //120
						margin-left: 0.4rem; //15

						.item_img {
							display: block;
							width: 100%;
							border-radius: 0.16rem 0.16rem 0 0; //6
						}

						.item_name {
							margin-top: 0.213333rem;
							font-size: 0.373333rem; //14
						}

						.item_rating {
							margin-top: 0.213333rem; //8
							color: #777;
						}

						.item_count {
							justify-content: space-between;

							.count_price {
								font-size: 0.426666rem; //16
								line-height: 0.8rem; //30
								color: #FB5050;

								&::before {
									content: '￥';
								}
							}
						}
					}
				}

			}
		}

		.menu_main {
			margin-top: 0.8rem; //30

			// 菜单列表
			.main_class {
				height: 100%;
				overflow: auto;

				.class_item {
					position: relative;
					width: 2.266666rem; //85
					height: 1.333333rem; //50
					display: table;
					overflow: hidden;

					p {
						display: table-cell;
						padding: 0 0.266666rem; //10
						vertical-align: middle;
					}

					img,
					span {
						display: inline-block;
						vertical-align: middle;
					}

					img {
						width: 0.666666rem; //25
						height: 0.666666rem;
					}

					span {
						font-size: 0.373333rem; //14
						margin-left: 0.16rem; //6
					}

					.item_countClass {
						position: absolute;
						right: 0;
						top: 0;
						padding: 0.053333rem 0.106666rem; //2 4
						color: #fff;
						border-radius: 0.8rem; //30
						background-color: #F34545;
						font-size: 0.32rem; //12
					}
				}

				.class_active {
					font-weight: 700;
					background-color: #dfdfdf;
				}
			}

			// 菜单主体内容
			.main_con {
				position: relative;
				height: 100%;
				overflow: auto;

				.con_item {
					// 分类标题
					padding: 0 0.266666rem; //10

					.item_title {
						line-height: 0.64rem; //24

						.title_main {
							font-size: 0.373333rem; //14
							font-weight: 600;
							margin-right: 0.133333rem; //5
						}

						.title_desc {
							color: #999;
						}
					}

					// 商品主要描述
					.item_desc {
						margin-top: 0.533333rem; //20

						.desc_img {
							width: 2.533333rem; //95
							height: 2.533333rem;
							border-radius: 0.106666rem; //4
						}

						.desc_main {
							margin-left: 0.266666rem; //10
							overflow: hidden;
							flex-grow: 1;
							flex-shrink: 1;

							&>* {
								margin-top: 0.266666rem;
							}

							.main_name {
								font-size: 0.373333rem; //14
								font-weight: 700;
							}

							.main_rating {
								color: #aaa;
							}

							.main_discount {
								color: #F07373;

								.discount_icon {
									padding: 0 0.053333rem; //2
									border: 1px solid #f1f1f1;
									border-radius: 0.08rem; //3
								}
							}

							.main_btn {
								line-height: 0.533333rem; //20
								justify-content: space-between;

								.btn_price {
									color: #F07373;

									span {}

									.price {
										font-size: 0.426666rem; //16

										// line-height:26px;
										&::before {
											content: '￥';
										}
									}

									.originPrice {
										&::before {
											content: '￥';
										}

										text-decoration:line-through;
										color:#ccc;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
