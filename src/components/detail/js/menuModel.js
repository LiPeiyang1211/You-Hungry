import {
	getCurrentInstance,
	toRefs,
	reactive,
	onMounted,
	computed
} from 'vue'
import {useRoute}  from 'vue-router'
import {useStore}  from 'vuex'

function menuModel(){
	const {proxy} =getCurrentInstance();
	const $store =useStore();
	const data =reactive({
		// 商品加购的信息
		foodState:computed(()=>{
			return $store.state.foodState;
		}),
		// 商家推荐 recommend
		recommend:computed(()=>{
			// console.log('商家推荐：', $store.getters.recommend)
			return $store.getters.recommend;
		}),
		// 菜单列表数据
		 menu:computed(()=>{
		 	// console.log('菜单：', $store.getters.menu)
		 	return $store.getters.menu;
		 }), 
		 rst:computed(()=>{
		 	// console.log('菜单：', $store.getters.rst)
		 	return $store.getters.rst;
		 }), 
		 cateCount(resId,cid){
			 // console.log(resId,cid)
			 var cate =$store.state.cateGory;
			 if(cate[resId]){
				 return cate?cate[resId][cid]:0;
			 }
			 
		 }
	})
	// 商品计数
	function count(item){
		var 
			resId=item.restaurant_id,//商家id
			foodId=item.specfoods[0].food_id,//商品id
			// 找到当前商品对应商家的id
			res=data.foodState[resId],
			food;
			if(res){
				// 通过商品id 从 商家去拿取 商品信息
				food=res.foods[foodId];
				if(food){
					return food.count;
				}
			}
			return 0;
	}
	
	// 加/减 购物
	function changCount(item,bool){
		// console.log(bool?'加':'减')
		// data.count += bool?1:-1;
		
		if(bool){//加
			// 提交 addFoods
			$store.commit('addFoods',item);
		}else{//减
			// 提交 reduceFoods
			$store.commit('reduceFoods',item);
		}
		
		
	}

	return {
		changCount,
		count,
		...toRefs(data)
	}
}

export default menuModel;