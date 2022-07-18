// 详情页模块
import {
	getCurrentInstance,
	toRefs,
	reactive,
	onMounted,
	computed
} from 'vue'
import {useRoute}  from 'vue-router'
import {useStore}  from 'vuex'
function detailModel(){
	const {proxy} = getCurrentInstance();
	// route 对象
	const $route= useRoute();
	// store 
	const $store= useStore();
	
	const data = reactive({
		show:{
			desc:false,
			coupon:false,
			activities:false
		},
		// 路由的地址
		path:{
			menu:'menu',
			evaluate:'evaluate',
			merchant:'merchant'
		},
		// 处理 id 的拼接
		d_paths:computed(()=>{
			var path =data.path;
			var _paths={};
			for (var k in path){
				// 给每个路由拼接id
				_paths[k]=path[k] + '?id=' + $route.query.id;
			}
			// console.log(_paths)
			return _paths;
		})
	})
	
	
	
	
	// 调用vuex 中的 rst
	const rst =computed(()=>{
		// console.log($store.getters.rst)
		return $store.getters.rst
	})
	
	//调用vuex 中的 redpack
	const redpack =computed(()=>{
		// console.log($store.getters.redpack)
		return $store.getters.redpack
	})
	onMounted(()=>{
		// 获取详情页数据
		proxy.$axios('/details',{
			params:{
				id:$route.query.id
			}
		}).then(res=>{
			// console.log(res.data)
			// 提交setDetailData
			$store.commit('setDetailData',res.data);
		})
	})
	
	return{
		rst,
		redpack,
		...toRefs(data)
	}
}

export default detailModel;