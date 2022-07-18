<template>
	<div class="body">
		<!-- <h3>主体部分</h3> -->
		<router-view></router-view>
		<TooBar></TooBar>
	</div>
</template>

<script>
	import TooBar from '../../components/toolBar/ToolBar.vue'
	export default{
		components:{
			TooBar
		}
	}
</script>

<style>
</style>
