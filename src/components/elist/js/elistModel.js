// 列表模块
import {
	getCurrentInstance,
	toRefs,
	reactive,
	onMounted,
	computed
} from 'vue'

import {useStore} from 'vuex'
// useRouter 和 useRoute
import {useRouter,useRoute} from 'vue-router'
function elistModel() {
	const {proxy} = getCurrentInstance();
	const $router= useRouter();
	const $store = useStore();
	var data = reactive({
		elistData: [],
		/* 当前用户所在位置 */
		gps: {
			latitude: 28.242478, //纬度
			longitude: 112.946747 //经度
		},
		show_activity_state:{},
		count_all:computed(()=>{
			if($store.state.foodState){
				return $store.state.foodState;
			}
			
		})
	})
	
	// 商家 购买的总数量
	function resIdCount(item){
		// console.log(item.restaurant.id)
		// 根据id 查询商家购买商品的数量
	   var state=$store.state.foodState[item.restaurant.id]
	   return state?state.count_all:0;
	}
	

	// 改变列表选择的状态
	function showActivityFn(i){
		data.show_activity_state[i]=!data.show_activity_state[i]
		// console.log(data.show_activity_state)
	}
	// 是否展开/隐藏活动列表
	function showActive(i){
	   var val=	data.show_activity_state[i];
	   
	   val=val?'auto':'';
	   
	   return{height:val}
	}

	/* 计算距离 （用户(x,y)与商家(x,y)的距离）
				  勾股定理，两点计算
				  求两点之间的一个距离
				  x*x+y*y 
	  */
	function distanceCalc(latitude, longitude) {
		/* 获取用户的经纬度*/
		var _latitude = data.gps.latitude;
		var _longitude = data.gps.longitude;

		var x, y, z;
		x = _latitude - latitude;
		y = _longitude - longitude;

		/* 计算两点之间的距离*/
		z = Math.sqrt(x * x + y * y) //得到了用户与商家的距离
		// console.log(z)
		// 转成公里
		return (z * 100).toFixed(2) + 'km';

		/* 获取商家的经纬度*/
		// console.log(latitude,longitude)
	}

	/*路由跳转---->详情页 */
	function toDetails(items){
		// console.log($router)
		$router.push({
			path:'/detail/menu',
			query:{
				id:items.restaurant.id
			}
		})
		// console.log(items)
	}

	// 列表数据
	var itemData = computed(() => {
		var elistData = data.elistData;

		/* 判断数据存在不*/
		return elistData ? elistData : null;
	})
	
	// 请求列表数据
	function  getData(s,len,cb){
		/* 获取列表数据(首页商家信息)
			   list?offset=0&len=8
			 */
		proxy.$axios('/list', {
			params: {
				offset: s,
				len:len
			}
		}).then(cb)
	}
	

	onMounted(() => {
		
		var wH,dH,sT;
		
		var 
			dHtml=document.documentElement,
			dBody=document.body;
			
		var 
			offset=0,
			len=8,
			items;
	    // 滚动函数，判断是否到底
		function scrollFn(){
			// console.log('开始滚动')
			wH=window.outerHeight;//窗口高度
			dH=dHtml.offsetHeight || dBody.offsetHeight;
			sT=dHtml.scrollTop ||dBody.scrollTop;
			if(dH-wH<=sT){//判断是否到底
				offset+=len;
			    getData(offset,len,res=>{
					items.push.apply(items,res.data.items)
					// console.log(res.data.items);
				})
				
				// console.log('到底了')
			}
			// console.log(wH,dH,sT);
		}
		
		window.addEventListener('scroll',scrollFn,false);
		
		getData(offset,len,res => {
			// console.log(res)
			data.elistData = res.data.items;
			items=data.elistData;
			// console.log(data.elistData)
			// console.log(res.data.items)
		})
	})
	
	return{
		distanceCalc,
		itemData,
		showActivityFn,
		showActive,
		toDetails,
		resIdCount
	}
}

export default elistModel;
