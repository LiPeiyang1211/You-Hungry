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
		menu_index:0,//默认下标
		menu_tops:[],
		scrollOf:true,
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
		 con_height:0,//当前菜单内容的高度
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
	
	// 选中左侧菜单
	function menuSelect(i){
		data.menu_index=i;
		// 检查的开关
		data.scrollOf=false;
		// 将menu_con高度值设置成我们得到的值
		var main_con = proxy.$refs.main_con;
		// 置顶
		proxy.$autoTop(0,main_con);
		// 设置高度
		$(main_con).animate({
			//滚动的高度
			scrollTop:data.menu_tops[i]
		},300,()=>{
			setTimeout(()=>{
				data.scrollOf=true
			},300)
		});
	}
	
	// 获取高度
	function getTops(){
		// 得到所有的dl
	   var items=proxy.$refs.menu_main.getElementsByClassName('con_item');
	   var arr=data.menu_tops;//存储菜单的高度
	   // 得到con_item相对于父级的高度
	   for(var item of items){
		   // 存储获取的高度
		   arr.push(item.offsetTop);
	   }
		// console.log(arr)
	}
	
	// 设置菜单内容区域的高度
	const setMenuHeight=()=>{
		var wH=window.outerHeight;//窗体的高度
		// 获取父组件的高度（详情页的nav） detail_nav
		var navH =proxy.$parent.$parent.$refs.detail_nav.offsetHeight;
		// 菜单区域的高度
		var arg =wH-navH;
		data.con_height=arg/37.5 + 'rem';
		// console.log(wH,navH,arg)
	}
	
	onMounted(()=>{
		setMenuHeight();
		getTops();
		
		// 获取滚动条的高度
		
		// 获取main_con的div元素
		var main_con = proxy.$refs.main_con;
		//默认高度
		var t=0;
		var arr= data.menu_tops;//菜单存储的高度
		// console.log(arr)
		// 左侧菜单的某一项
		var index,_i;
		// 右侧内容的滚动
		main_con.addEventListener('scroll',()=>{
			// 滚动条的高度
			t=main_con.scrollTop;
			index=data.menu_index;//获取下标
			if(data.scrollOf){//屏蔽点击时动画还没结束
				//置顶从菜单列表模块开始
				proxy.$autoTop(0,main_con);
				// 检查滚动条的高度对应的下标值
				for(var i=0,len=arr.length;i<len;i++){	
					if(t<=arr[i]){
					  _i=i-1;//得到数值
					  // 当下标发生改变时修改
					  if(index!==_i){
						   data.menu_index=_i;
					  }
					 break;
				 }
			}
		
			
	  }
			
			//[0,1193,3834,5015]
					  // 1194
			     
		},false)
		
		
	})
	
	return {
		menuSelect,
		changCount,
		count,
		...toRefs(data)
	}
}

export default menuModel;