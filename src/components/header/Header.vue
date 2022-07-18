<template>
	<div class="header">
		<!-- 通过插槽设置默认布局 -->
		<slot name="header_main">
			<div class="header_main">
				<button class="mian_btn" @click="$emit('back')">&lt;</button>
				<span>{{title}}</span>
			</div>
		</slot>
		
		<!-- 匿名插槽 -->
		<slot></slot>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type:String
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.header{
		background-image: linear-gradient(90deg,#51acfc,#206bfe);
		.header_main{
			position: relative;
			color: #fff;
			text-align: center;
			font-size: 0.48rem;
			line-height: 1.466666rem;//55
			font-weight: 500;
			.mian_btn{
				position: absolute;
				left: 0;
				top: 0;
				color: #fff;
				margin: auto;
				width: 1.066666rem;
				height: 1.466666rem;
				font-size: 0.8rem;//40
				font-family: '黑体';
				font-weight: 500;
			}
		}
	}
</style>
