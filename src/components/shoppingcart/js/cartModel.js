import {
	getCurrentInstance,
	toRefs,
	reactive,
	onMounted,
	computed,
	watch
} from 'vue'
import {useRoute}  from 'vue-router'
import {useStore}  from 'vuex'

function cartModel(props){
	
	const $store =useStore();
	const data =reactive({
		aName:'',
		show:false,
		// 加购的状态
		foodState:computed(()=>{
			return $store.state.foodState;
		}),
		state:computed(()=>{
			// 根据商家id查询商品信息
			return data.foodState[props.resId];
		}),
		// 总数量
		count_all:computed(()=>{
			if(data.state){
				return data.state.count_all;
			}
		}),
		rst:computed(()=>{
			return $store.getters.rst
		}),
		// 商品信息
		foods:computed(()=>{
			if(data.state){
				return data.state.foods;
			}
		})
	})
	
	
	// 起送价格
	const base_price =computed(()=>{
		return data.rst.piecewise_agent_fee.rules[0].price
	})	
	// 计算商品总价
	const allPrice=computed(()=>{
		// 当前商家 加购的 商品信息
		 var state =data.state;
		 
		 var price=0,oPrice=0;
		 
		 var food,
		 _priceArr,
		 _price,
		 _oPrice;
		 if(state){
			 var foods =state.foods;//商品信息
			 //遍历加购的商品信息 计算总价
			 for (var k in foods){
				 food =foods[k];
				 _priceArr=food.item.specfoods[0];
				 // 商品的现价
				_price = _priceArr.price;
				// 计算现价的总价
				price += _price * food.count;
				
				// 商品原价
				_oPrice=  _priceArr.original_price;
				// 计算原价总价
				 oPrice += _oPrice?_oPrice* food.count : price * food.count;
			 }
			 price=price.toFixed(1);
			 oPrice=oPrice.toFixed(1);
			 return {price:price,oPrice:oPrice}
		 }
		 return {price:0,oPrice:0}
	});
	
	onMounted(()=>{
		// 处理购物车的动画效果
		watch(()=>data.count_all,(n,o)=>{
			// 判断商品数量++ 设置动画名称
			if(n>(o||0)){
				data.aName='';
				setInterval(()=>{
					data.aName="car 0.3s"
				},100)
			}
			// console.log(n,(o||0))
		})
		
		// 侦听foodState   同时侦听多个数据
		watch([data.foodState,()=>data.state],([fv,sv],[ofv,osv])=>{
			// console.log(sv)
		},{
			/* 侦听某个对象具体的值，必须开启深度侦听，否则侦听不到值 */
			deep:true//开启深度侦听
		})
		
	})
	
	return{
		allPrice,
		base_price,
		...toRefs(data)
	}
}

export default cartModel;