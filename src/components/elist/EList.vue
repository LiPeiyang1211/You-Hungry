<template>
	<div class="listWrap">
		<ul class="list">
		    <!-- {{itemData}} -->
			<li class="list_item" 
			 v-for="(item,i) in itemData"
			 @click="toDetails(item)"
			>
				<!-- 图片 -->
				<div class="item_img">
					<img :src="$formatImgSrc(item.restaurant.image_path)"  alt="">
					<span class="img_arror" v-if="resIdCount(item)">{{resIdCount(item)}}</span>
				</div>
					
				<!-- 描述 -->
				<div class="item_desc" >
					<!-- 标题 -->
					<h3 class="desc_name" :class="{brand:item.restaurant.is_premium}">
						<span class="name_main">{{item.restaurant.name}}</span>
						<span class="name_support">
							<i class="ad" v-if="item.restaurant.recommend.is_ad"></i>
							<i 
							v-for="i in item.restaurant.supports"
							:class="{insurance:i.id=='7',invoice:i.id=='4'}">
							</i>
						</span>
					</h3>

					<div class="desc_star">
						<!-- 星级评分 -->
						<van-rate v-model="item.restaurant.rating" allow-half readonly/> 
						<span style="margin-left: 0.133333rem;">{{item.restaurant.rating}}</span>
						<div class="recent_order_num">月售{{item.restaurant.recent_order_num}}单</div>
					</div>

					<!-- 价格 -->
					<div class="desc_price flex">
						<div class="price_item flex">
							<span class="item_left">￥{{item.restaurant.piecewise_agent_fee.rules[0].price}}起送</span>
							<span>{{item.restaurant.piecewise_agent_fee.description}}</span>
						</div>
						<div class="price_item flex">
							<span class="item_left">{{distanceCalc(item.restaurant.latitude,item.restaurant.longitude)}}</span>
							<span>{{item.restaurant.order_lead_time}}分钟</span>
						</div>
					</div>

					<!-- 标签 -->
					<div class="desc_tags flex">
						<i class="tag" v-for="tag in item.restaurant.flavors">{{tag.name}}</i>
					</div>

					<!-- 活动 -->
					<div class="desc_activity flex" 
						:style="showActive(i)"
					>
						<activityList :data="item.restaurant.activities" class="grow_shrink"></activityList>
						<div class="activity_count" @click.stop="showActivityFn(i)">
						       {{item.restaurant.activities.length}}个活动<i class="iconfont icon-xiala"></i>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<slot>
			<p class="loading">加载中....</p>
			<p >没有更多了~</p>
		</slot>
	</div>
</template>

<script>
	import { Rate,Icon } from 'vant';
	import elistModel from './js/elistModel.js'
	import activityList from '../activitylist/ActivityList.vue'
	export default{
		components:{
			[Rate.name]:Rate,
			[Icon.name]:Icon,
			activityList
		},
		setup(props){
		const {distanceCalc,itemData,showActivityFn,showActive,toDetails,resIdCount} =elistModel();	
			return{
				distanceCalc,
				itemData,
				showActivityFn,
				showActive,
				toDetails,
				resIdCount

			}
		}
	}
</script>

<style lang="scss">
	.list{
    .list_item{
      display:flex;
	  // 20 10
      padding:0.533333rem 0.266666rem;
      border-bottom:1px solid #dddfdf;
      .item_img{
        position:relative;
        img{
          width:2.293333rem;//86
          height:2.293333rem;
        }
        .img_arror{
          position:absolute;
          right:-0.133333rem;//5
          top:-0.133333rem;
          background-image:linear-gradient(0deg,#FB7474,#C92020);
          color:#fff;
          font-size:0.426666rem;//16
          padding:0.106666rem 0.213333rem;//4 8
          border-radius:0.8rem;//30
        }
      }
      .item_desc{
        margin-left:0.266666rem;//10
        flex-grow:1;
        flex-shrink:1;
        overflow:hidden;
        .desc_name{
          line-height:0.64rem;//24
          // 品牌商标，判断值为  item.restaurant.is_premium
          &.brand::before{
            content:'品牌';
            padding:0 0.106666rem;//4
            background-color:#F6713C;
            color:#EEEDED;
            border-radius:0.053333rem;//2
          }
          .name_main{
            margin-left:0.106666rem;//4
            font-size:0.426666rem;//16
            font-weight:700;
          }
          // 服务支持标签 判断值为 item.restaurant.supports
          .name_support{
            float:right;
            i{
              margin-left:0.053333rem;//2
              padding:0 0.053333rem;
              border:1px solid #ddd;
              background-color:#fff;
              font-size:0.32rem;//12
              color:#999;
            }
            .invoice::before{
              content:'票';
            }
            .insurance::before{
              content:'保';
            }
            .ad::before{
              content:'广告';
            }
          }
          
        }
        .desc_star{
          display:flex;
          color:#999;
          margin:0.213333rem 0;//8
          .recent_order_num{
            margin-left:0.266666rem;
          }
        }
        .desc_price{
          justify-content:space-between;
          .price_item{
            color:#999;
            .item_left{
              padding-right:0.16rem;//6
              margin-right:0.16rem;
              border-right:1px solid #ccc;
            }
          }
        }
        .desc_tags{
          margin:8px 0;
          .tag{
            padding:0 0.08rem;//3
            margin-right:0.16rem;//6
            border:1px solid #dfdfdf;
            color:#9a9a9a;
          }
        }
        .desc_activity{
          height:1.226666rem;//46
          .activity_count{
            margin-left:0.16rem;//6
            line-height:0.533333rem;//20
            .icon-jiantouarrow486{
              margin-left:0.106666rem;//4
              font-size:0.32rem;//12
            }
          }
        }
      }
    }
  }
  .loading{
    text-align:center;
    line-height:0.746666rem;//28
  }
  .van-rate__icon--half{
	  position: absolute;
  }
</style>

