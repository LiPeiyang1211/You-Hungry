/* 自定义吸附指令 */
const vFixed= {
  mounted(el, binding) {
	  /* 
		 el: 当前绑定的元素
	  */
	// console.log(el,binding)
	// 1. 获取元素距离顶部的高度
	var 
		_el=el,
		dt = 0,
		st = 0,
		arg=binding.arg || 0,
		tVal=arg/37.5 +'rem',
		bool,_bool;
		
	var
		dHtml=document.documentElement,
		dBody=document. body;
		
		var css={
			position:'fixed',
			left:'0',
			top:tVal,
			width:'100%',
			zIndex:100
		}
		
		
		// 设置占位元素
		var dP =document.createElement('p');
		dP.style.height=el.offsetHeight/37.5 + 'rem'
		dP.style.display='none'
		el.after(dP)
		
		// console.log(el.offsetHeight)
		
		do{
			// 元素相对定位于父级的距离
			dt += _el.offsetTop;
			_el=_el.offsetParent;
		}while(_el)
		
	    // console.log(dt)
		
		
		// 给window、body、HTML添加scroll事件
		window.addEventListener('scroll',scrollFn,false)
		dHtml.addEventListener('scroll',scrollFn,false)
		dBody.addEventListener('scroll',scrollFn,false)
		
		function scrollFn(){
			// console.log('-滚动了-')
			// 2.获取滚动条的高度
			st=dHtml.scrollTop || dBody.scrollTop;
			// console.log(st)
			bool=st>=dt-arg
			if(_bool !== bool){//滚动条的状态
				// console.log(bool?'高度够了':'高度不够了')
				for(var k in css){
					// 设置样式
					if(bool){
						el.style[k]=css[k]
						dP.style.display='block'
					}else{
						// 清除原本的样式
						el.style[k]=''
						dP.style.display='none'
					}
				}
			
				_bool=bool;
			}
		}
	
  }
}

export default vFixed;