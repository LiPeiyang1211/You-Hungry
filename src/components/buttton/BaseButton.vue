<template>
	<div class="baseBtn flex">
		<transition name="reduce">
			<button
			  class="iconfont icon-iconless" 
			 :class="{rotate_transition:count>0}"
			 @click="$emit('changNum',false)">
			</button>
		</transition>
		<span  class="num" :style="{visibility:count>0?'visible':'hidden'}">{{count}}</span>
		<button class="iconfont icon-jia" @click="$emit('changNum',true)"></button>
	</div>
</template>

<script>
	export default{
		props:{
			count:{
			   type:Number,
			   default:0
			}
		}
	}
</script>

<style lang="scss">
	.baseBtn{
		justify-content:flex-end;
		align-items:center;
		.iconfont{
			font-size:0.586666rem;//22
			color:#28BFBD;
		}
		.num{
			margin:0 0.106666rem;//4
			font-size:0.426666rem;//16
		}
		.reduce-enter-active,
		.reduce-leave-active{
			transition:0.5s;
		}
		.reduce-enter,
		.reduce-leave-to{
			opacity:0;
		}
		.icon-iconless{
			transition:0.2s;
			opacity:0;
			visibility:hidden;
			transform:translate(-30px) rotate(-160deg);
		}
		.rotate_transition{
			opacity:1;
			visibility:visible;
			transform:translate(0px) rotate(0deg);
		}

	}
</style>