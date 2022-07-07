<template>
	<view>
		<!-- 登录框及优惠券 -->
		<view class="login">
			<view class="login_top" @click="login">
				<view class="avatarUrl">
					<image :src="userinfo.avatarUrl" mode=""></image>
				</view>
				<view class="clickLogin">
					{{userinfo.nickName}}
				</view>
			</view>
			<view class="login_btm">
				<view class="login_content">
					<view class="number">
						0
					</view>
					<view class="Vnumber">
						倍思v值
					</view>
				</view>
				<view class="login_content">
					<view class="number">
						0
					</view>
					<view class="Vnumber">
						倍思券
					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<!-- 我的订单 -->
			<view class="order">
				<view class="myorder">
					<view>
						我的订单
					</view>
					<view class="alloeder" style="color: #bfbfbf;">
						全部订单
						<uni-icons type="forward" size="15" color='#bfbfbf'></uni-icons>
					</view>
				</view>
				<view class="order_section">
					<view class="item" v-for="(item,index) in orderSection" :key="index" @click="order(index)">
						<image :src="item.img" mode=""></image>
						<view class="title">
							{{item.title}}
						</view>
					</view>
				</view>
			</view>
			<!-- 功能列表 -->
			<view class="functionlist">
				<view class="content" v-for="(item,index) in contentlist" :key="index" @click="functionlist(index)">
					<view class="left">
						{{item}}
					</view>
					<uni-icons type="forward" size="15" color='#bfbfbf'></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		computed: {
			...mapState('m_user', ['userinfo'])
		},
		data() {
			return {
				// 订单部分
				orderSection: [{
					title: '待付款',
					img: require('../../static/my/daifukuan.png')
				}, {
					title: '待发货',
					img: require('../../static/my/daifahuo.png')
				}, {
					title: '待收货',
					img: require('../../static/my/daishouhuo.png')
				}, {
					title: '退款/售后',
					img: require('../../static/my/tuikuan.png')
				}],
				contentlist: ['我的发票', '喜欢/收藏', '收货地址', '关于倍思', '帮助中心', '设置']
			};
		},
		methods: {
			...mapMutations('m_user', ['add']),
			order(item) {
				uni.showToast({
					icon: 'none',
					title: '页面暂未开发'
				})
			},
			getinfo() {
				let userinfo = uni.getStorageSync('userinfo')
				console.log(userinfo);
				if (userinfo != '') {
					this.add(userinfo)
				}
			},
			login() {
				let token = uni.getStorageSync('token')
				if (token == '') {
					let that = this
					uni.getUserProfile({
						desc: "weixin", //必填，声明获取用户个人信息后的用途，不超过30个字符
						success: (res) => {
							console.log(res)
							uni.showToast({
								icon: "none",
								title: '登录成功'
							})
							let userinfo = {
								avatarUrl: res.userInfo.avatarUrl,
								nickName: res.userInfo.nickName,
							}
							this.add(userinfo)
							uni.setStorageSync('token', '1111111')
							uni.setStorageSync('userinfo', userinfo)
							this.getinfo()
						},
						fail: (err) => {
							console.log(err)
							uni.showToast({
								icon: "none",
								title: '取消登录'
							})
						}
					})
				} else {
					uni.showToast({
						icon: "none",
						title: '页面暂未开发'
					})
				}

			},
			functionlist(idnex) {
				console.log(idnex);
				switch (idnex) {
					case 5:
						uni.navigateTo({
							url: '/subpkg/setup/setup'
						})
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: '页面暂未开发'
						})
						uni.switchTab({

						})
				}

			}
		},

		onLoad() {
			this.getinfo()
		},

	};
</script>

<style lang="scss">
	$distance:20rpx;

	.login {
		background-color: #fff;
		padding: 30rpx 0;

		.login_top {
			display: flex;
			align-items: center;
			margin-left: 66rpx;

			.avatarUrl {
				width: 108rpx;
				height: 108rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}


			.clickLogin {
				margin-left: 40rpx;
				font-size: 36rpx;
			}
		}

		.login_btm {
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.login_content {
				width: 86rpx;
				height: 86rpx;
				text-align: center;

				.number {
					font-size: 36rpx
				}

				.Vnumber {
					color: #bfbfbf;
					font-size: 24rpx;
				}
			}
		}
	}

	.container {
		margin-top: $distance;
		padding: 0 $distance;

		.order {
			padding-top: $distance;
			background-color: #fff;
			border-radius: $distance;

			.myorder {
				height: 60rpx;
				padding: $distance 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #303133;
			}

			.order_section {
				display: flex;
				align-items: center;
				justify-content: space-around;

				.item {
					width: 120rpx;
					height: 120rpx;
					font-size: 24rpx;
					color: #303133;
					padding-bottom: 28rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}

		.functionlist {
			margin: $distance 0;

			background-color: #fff;
			border-radius: $distance;

			.content {
				height: 60rpx;
				padding: $distance 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
			}
		}
	}
</style>
