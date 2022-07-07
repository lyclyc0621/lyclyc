<template>
	<view class="search-box">
		<view @click="searchBoxHandler" class="my-search-container" :style="{'background-color':bgcolor}">
			<view class="my-search-box" :style="{'border-radius':radius+'rpx'}">
				<icon type="search" size="16" />
				<text class="placeholder">请输入你想搜索的产品</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#fff'
			},
			radius: {
				type: Number,
				default: 36
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 点击按钮,触发父组件的点击事件
			searchBoxHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.my-search-container {
		height: 100rpx;
		// line-height: 80rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		.my-search-box {
			width: 100%;
			height: 72rpx;
			background-color: rgb(248, 248, 248);
			display: flex;
			align-items: center;
			padding-left: 40rpx;
			color: #9f9f9f;
			// justify-content: center;

			.placeholder {
				font-size: 24rpx;
				margin-left: 15rpx;
			}
		}
	}
</style>
