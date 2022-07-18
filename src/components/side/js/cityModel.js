/* 城市模块 */
import {getCurrentInstance,toRefs,reactive,onMounted,computed} from 'vue'
function cityModel(){
	const {ctx,proxy}=getCurrentInstance();
	const data=reactive({
		cityList:null,
		searchStr:'',
		currentCity:'',
		show:{city:false},
		selectCity(val){
			// 选项完城市的时候关闭城市选择列表
			data.show.city=false
			data.searchStr=''
			// console.log(val)
			data.currentCity=val.name
			// 选择完城市的时候，将选择的城市数据传递出去
			proxy.$emit('changSide',val)
		}
	})
	
	
	/* 
		格式化数据，将数据按pinyin开头字母进行分类
		{A:[{name:'A'}]}
	*/
	const cityName=computed(()=>{
		/* 获取数据 */
		const citys=data.cityList
		// 初始化一个容器对象
		var cityList ={}
		// 首字母
		var initial;
		if(citys){
			// 遍历数组
			for(var item of citys){
				// 拿到每项拼音的首字母
				// console.log(item.pinyin[0].toUpperCase())
				initial=item.pinyin[0].toUpperCase()
				// 如果当前首字母存在，那么就添加到城市当前的首字母列表项中
				if(initial in cityList){
					cityList[initial].push(item)
				}else{
					// 初始化首字母为一个数组
					// {} ['A'] = [{name}]
					cityList[initial]=[item]
				}
			}
		}
		// console.log(cityList)
		return cityList
		
	})
	
	
	/* 城市的模糊查询*/
	const citySearch=computed(()=>{
		var arr=[] //声明一个空的数据
		
		/* 获取城市列表数据,城市查询的字符串 */
		var citys=data.cityList;
		var searchStr=data.searchStr;
		
		var reg;
		if(!citys || !searchStr) return [];
		
		/* 
			阿拉善盟 ---》阿善
		 */
		
		//  /.*阿.*善. */
		searchStr=searchStr.replace(/.{0}/g,'.*');
		// console.log(searchStr)
		console.log(reg)
		for (var city of citys){
			// 声明一个全局匹配,忽略大小写
			reg=new RegExp(searchStr,'gi');
			// 判断输入框中的值是否可以匹配到数据，如果匹配成功
			if(reg.test(city.label)){
				// ，向arr数组中添加数据
				arr.push(city)
			}
		}
		
		// 循环数据中的每一项,根据label的值
		// for(var city of citys){
		// 	// 判断输入框中的值是否可以匹配到数据，如果匹配成功
		// 	if(city.label.indexOf(searchStr) !==-1){
		// 		// ，向arr数组中添加数据
		// 		arr.push(city)
		// 	}
		// }
		// console.log(arr)
		return arr;
	})
	
	onMounted(()=>{
		/* 获取城市列表 */
		proxy.$axios('/citylist').then((res)=>{
					   // console.log(res)
					   data.cityList=res.data
		})
	})
	

				
	return{
		cityName,
		citySearch,
		...toRefs(data)
	}
}

export default cityModel;
