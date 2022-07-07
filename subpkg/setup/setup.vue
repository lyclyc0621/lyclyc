<template>
	<view>

		<button @click="quit">退出</button>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				userinfo: {
					avatarUrl: require('../../static/my/VSQduJE9vDRGZ7TAZKgLNXJDYRupdAYh.png'),
					nickName: '点击登录/注册'
				},
			};
		},
		methods: {
			...mapMutations('m_user', ['add']),
			quit() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否退出登录',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							uni.switchTab({
								url: '/pages/my/my'
							})
							let userinfo = {
								avatarUrl: require('../../static/my/VSQduJE9vDRGZ7TAZKgLNXJDYRupdAYh.png'),
								nickName: '点击登录/注册'
							}
							that.add(userinfo)
							uni.showToast({
								icon: "none",
								title: '退出成功'
							})
							uni.removeStorageSync('token');
							uni.removeStorageSync('cart');
							uni.removeStorageSync('userinfo');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
