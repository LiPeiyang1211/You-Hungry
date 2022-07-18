import {createStore} from 'vuex';



// state 存放属性
const state=()=>{
	return{
		test:'测试vuex',
		//定义对象存储 详情页的数据
		detailData:null,
		// 加购的状态
		foodState:{},
		// 分类的状态
		cateGory:{}
	}
}

const mutations={
	// 设置detailData的数据
	setDetailData(state,data){
		state.detailData=data
	},
	// 加购商品
	addFoods(state,item){
		var {item,cid}=item;
		// 商家
		var
			foodState=state.foodState,//购物车的状态
			resId=item.restaurant_id,//商家id
			foodId=item.specfoods[0].food_id;//商品id
		// 商品 
		var foods; 
		// 判断当前商家或者商品是否存在
		if(resId in foodState){
			state.resId=resId;
			foods=foodState[resId].foods;
			// 商品数量+1
			foodState[resId].count_all++
			// 判断商品是否存在
			if(foodId in foods){
				// 商品数量+1
				foods[foodId].count++
			}else{
				// 添加商品
				foods[foodId]={
					count:1,
					cid,//分类id
					item
				}
			}
		}else{
			// 第一次点击没有商家没有商品添加进来
			// 添加新的商家
			foodState[resId]={
				count_all:1,
				foods:{
					[foodId]:{
						count:1,
						cid,
						item
					}
				}
			}
		}
		// 加入购物车时，提交添加分类
		this.commit('addCategory',{resId,cid})
		// console.log(foodState)
		// console.log('购物车:',item)
	},
	
	// 减少购物车商品数量
	reduceFoods(state,item){
		var {item,cid} =item;
		// 商家
		var
			foodState=state.foodState,//购物车的状态
			resId=item.restaurant_id,//商家id
			foodId=item.specfoods[0].food_id;//商品id
			
		var 
			res=foodState[resId],//商家数据
			food=res.foods[foodId];//商品数据
			
		if(res){
			if(food){
				// 减少商品数量
				food.count--
				//减少 总数数量
				res.count_all --
							
				if(res.count_all<=0){
					delete foodState[resId]
				}
				
				if(food.count<=0){
					delete res.foods[foodId]
				}
				
			}
		}
		this.commit('subCategory',{resId,cid});
		// console.log(foodState)
	},
	// 添加分类数量
	addCategory(state,item){
	// console.log(item)
	 var cState=state.cateGory;//分类状态
	 
	 var {resId,cid} = item;
	 
	 var res = cState[resId];
	 if(!cid)return;
	 
	 // 判断当前商家或者 分类是否存在
	 if(resId in cState){
		 // 判断类别是否存在
		 if(cid in res){
			res[cid]++;//分类数量
		 }else{
			 res[cid]=1;
		 }
	 }else{
		 // 添加新的分类
		 cState[resId]={
			 [cid]:1
		 }
	 }
	 // console.log(cState)
		
		
	},
	// 减少分类数量
	subCategory(state,item){
		var cState=state.cateGory;//分类状态
		var {resId,cid} = item;//商家id、分类id
		var res = cState[resId];//分类的信息
		
		if(!cid)return;
		res[cid]--;
		// 删除类别
		if(res[cid]<=0){
			delete res[cid];
		}
		
		// 删除商家
		if(!state.foodState[resId] || state.foodState[resId].count_all<=0){
			delete cState[resId];
		}
		
		console.log(cState)
	},
	// 清空商家数据
	clearCart(state,resId){
		// 清空购物车的数据
		delete state.foodState[resId]
		// 清空分类的数据
		delete state.cateGory[resId]
	}
}

const getters={
	// 将 rst 转换成对象
	 rst(state){ /* 头部数据 */
		return formatData(state,'rst')
	 },
	 bought_list(state){
	 		return formatData(state,'bought_list')
	 },
	 menu(state){ /* 菜单数据 */
	 		return formatData(state,'menu')
	 },	 
	 recommend(state){ /* 商家推荐*/
		return formatData(state,'recommend')
	 },
	 redpack(state){ /*优惠券*/
	 		return formatData(state,'redpack')
	 },	 
	 user(state){ /* 用户模块数据*/
		return formatData(state,'user')
	 }
}

// 将字符串转换成对象
function formatData(state,key){
	var detailData=state.detailData;
	if(detailData){
	   return JSON.parse(detailData[key].body)
	}
}

// 创建一个新的 store实例
const store =createStore({
	state,
	mutations,
	getters
})

// 导出创建好的store实例
export default store;