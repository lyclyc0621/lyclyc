<template>
	<view class='main'>
		<!-- 筛选 -->
		<view class="main-top">
			<view :class="[btnNumber==1?'active':'button']" @click="btnClick(1)">
				<text>综合</text>
			</view>
			<view :class="[btnNumber==2?'active':'button']" @click="btnClick(2)">
				<text>价格</text>
				<view class="icon" v-if="showIcon">
					<view class="icon-top">
						<uni-icons type="top" color='#999' size="11" v-if="show"></uni-icons>
						<uni-icons type="top" color='#fd6906' size="11" v-else></uni-icons>
					</view>
					<view class="icon-bottom">
						<uni-icons type="bottom" color='#fd6906' size="11" v-if="show"></uni-icons>
						<uni-icons type="bottom" color='#999' size="11" v-else></uni-icons>
					</view>
				</view>
				<view class="icon" v-else>
					<view class="icon-top">
						<uni-icons type="top" color='#999' size="11"></uni-icons>
					</view>
					<view class="icon-bottom">
						<uni-icons type="bottom" color='#999' size="11"></uni-icons>
					</view>
				</view>
			</view>
			<view :class="[btnNumber==3?'active':'button']" @click="btnClick(3)">
				<text>销量</text>
			</view>
		</view>
		<view class="car" v-if="goodsList.length==0">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
		</view>
		<!-- 商品列表 -->
		<view v-else class="goods_list" v-for="(item,index) in goodsList" :key="index" @click="gotoDetil(item)">
			<view class="goods_img">
				<image :src="item.pic" mode=""></image>
			</view>
			<view class="goods_content">
				<view class="goods_title">
					<text>{{item.name}}</text>
				</view>
				<view class="goods_price">
					￥ {{item.price}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 页面的商品列表
				goodsList: [],
				// 数据总数量
				total: 0,
				btnNumber: 1,
				showIcon: false,
				show: true,
				data: {
					"page": {
						"page": 1,
						"size": 10
					},
					"c1": 5,
					"sorts": [{
						"by": "",
						"name": ""
					}],
					"price": "0-*",
					"attrs": {}
				},
			};
		},
		onLoad(options) {
			// console.log(options);
			// console.log(options.keywords);
			if (typeof options.keywords == 'undefined') {
				this.data.c2 = options.c2
				this.data.c3 = [options.c3]
			} else {
				this.data.keywords = options.keywords
			}
			// console.log([options.c3]);
			this.getGoodsList()
		},
		methods: {
			//获取数据
			async getGoodsList() {
				const res = await this.$API.home.GoodsList(this.data)
				this.goodsList = [...this.goodsList, ...res.data.content]
				this.total = res.data.totalElements
			},
			// 点击商品列表，进入商品详情（跳转到非tabbar）
			gotoDetil(item) {
				console.log('当前商品信息', item);
				uni.navigateTo({
					url: '/pages/Product_content/Product_content?id=' + item.skuId
				})
			},
			// 顶部导航按钮
			btnClick(e) {
				// console.log(e);
				this.btnNumber = e
				this.goodsList = []
				if (e == 2) {
					this.showIcon = true
					this.show = !this.show
					if (this.show == false) {
						this.getpriceTop()
					} else {
						this.getpriceBtm()
					}
				} else if (e == 1) {
					this.showIcon = false,
						this.show = true,
						this.data.sorts = [{
							"by": "",
							"name": ""
						}]
					this.getGoodsList()
				} else {
					this.showIcon = false,
						this.show = true,
						this.getsalesList()
				}

			},
			// 获取销量列表
			async getsalesList() {
				this.data.sorts = [{
					"by": "DESC",
					"name": "sale"
				}]
				const res = await this.$API.home.GoodsList(this.data)
				// console.log(res);
				this.goodsList = [...this.goodsList, ...res.data.content]
				this.total = res.data.totalElements
			},
			// 价格升序
			async getpriceTop() {
				this.data.sorts = [{
					by: "ASC",
					name: "discountPrice"
				}]
				const res = await this.$API.home.GoodsList(this.data)
				// console.log(res);
				this.goodsList = [...this.goodsList, ...res.data.content]
				this.total = res.data.totalElements
			},
			// 价格降序
			async getpriceBtm() {
				this.data.sorts = [{
					by: "DESC",
					name: "discountPrice"
				}]
				const res = await this.$API.home.GoodsList(this.data)
				// console.log(res);
				this.goodsList = [...this.goodsList, ...res.data.content]
				this.total = res.data.totalElements
			},
		},

		// 页面下拉触底
		onReachBottom() {
			// 数据加载完毕
			if (this.data.page.page * this.data.page.size >= this.total) return uni.$showMsg('数据加载完毕');
			// 让当前页加1
			this.data.page.page += 1;
			// 重新渲染列表
			this.getGoodsList();
		},
		// 触发下拉刷新函数
		onPullDownRefresh() {
			this.data.page.page = 1;
			this.total = 0;
			// 重新请求第一页数据
			this.getGoodsList(() =>
				uni.stopPullDownRefresh()
			);
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss">
	.main {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;

		.main-top {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.button {
				height: 60rpx;
				line-height: 60rpx;
				margin: 0 50rpx;
				font-size: 30rpx;
				color: #999;
				text-align: center;
				display: flex;
				position: relative;

				.icon {
					position: absolute;
					top: 4rpx;
					right: -30rpx;
					height: 40rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-top: 2rpx;
					margin-left: 2rpx;

					.icon-top {
						width: 30rpx;
						height: 16rpx;
						line-height: 1;
						color: #888;
					}

					.icon-bottom {
						width: 30rpx;
						height: 20rpx;
						line-height: 1;
						color: #888;
					}
				}
			}

			.active {
				height: 60rpx;
				line-height: 60rpx;
				margin: 0 50rpx;
				font-size: 30rpx;
				color: #fd6906;
				text-align: center;
				position: relative;

				.icon {
					position: absolute;
					top: 4rpx;
					right: -30rpx;
					height: 40rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-top: 2rpx;
					margin-left: 2rpx;

					.icon-top {
						width: 30rpx;
						height: 16rpx;
						line-height: 1;
						color: #888;
					}

					.icon-bottom {
						width: 30rpx;
						height: 20rpx;
						line-height: 1;
						color: #888;
					}
				}
			}


		}

		.car {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.goods_list {

			width: 370rpx;
			height: 474rpx;
			margin-bottom: 10rpx;
			background: #f9f9f9;

			.goods_img {

				width: 192rpx;
				height: 192rpx;
				padding: 60rpx 88rpx;
				text-align: center;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.goods_content {
				overflow: hidden;
				padding: 0 22rpx 0 40rpx;

				.goods_title {
					height: 80rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.goods_price {
					height: 40rpx;
					margin-top: 20rpx;
					color: #666;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
