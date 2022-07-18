// 置顶方法
function top(offset,el){
	// 默认是从组件的根元素
	el = el || this.$el;
	var t = offset || 0;
	var posiVal = getComputedStyle(el).position;
	if(posiVal !== 'fixed'){
		do{
			t += el.offsetTop;
			el = el.offsetParent;
		}while(el);

		document.documentElement.scrollTop = t;
		document.body.scrollTop = t;
	}
}

export default top;