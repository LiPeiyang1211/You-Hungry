import {
	getCurrentInstance,
	toRefs,
	reactive,
	onMounted,
	computed
} from 'vue'

function heightModel(){
	const {proxy} =getCurrentInstance();
	const data =reactive({
		menu_index:0,//默认下标
		menu_tops:[],
		scrollOf:true,
		 con_height:0,//当前菜单内容的高度
	})

	
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
		...toRefs(data)
	}
}

export default heightModel;