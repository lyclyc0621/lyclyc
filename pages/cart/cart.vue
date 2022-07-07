<template>
	<view>
		<view class="top">
			<view class="top_left">
				<u-checkbox-group @change="checkbox">
					<u-checkbox :checked="checked" name='选中' shape="square" activeColor='#fd6906' label='全选'>
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="top_right">
				<text>编辑</text>
			</view>
		</view>
		<view class="car" v-if="cart.length==0">
			<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>
		<view class="goodslist" v-else>
			<view class="goods" v-for="(item,index) in cart" :key="index">
				<view class="left">
					<u-checkbox-group placement="column" @change="checkboxChange(item)">
						<u-checkbox shape="square" :checked='item.goods_state' activeColor='#fd6906'>
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="center" @click="handle(item)">
					<image :src="item.goods_pic" mode=""></image>
				</view>
				<view class="right">
					<view class="title" @click="handle(item)">
						{{item.goods_name}}
					</view>
					<view class="parameter">
						<text v-for="(it,i) in item.goods_skuAttrValues" :key="i">
							{{it.value}}
						</text>
					</view>
					<view class="number">
						<u-number-box :value='item.goods_count' :name='item.goods_id' @change="valChange" :min="1">
						</u-number-box>
					</view>
					<view class="price">
						￥{{item.goods_price}}
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left">
				合计：￥{{checkedAmount}}
			</view>
			<view class="right">
				结算（{{checkedCount}}）
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['checkedAmount', 'checkedCount'])
		},
		data() {
			return {
				checked: false,
				number: 1,
				num: 0,
				totalPrice: 111,
				totalNumber: 1
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsCount', 'updateGoodsState', 'updateAllGoodsAmount', 'clear']),
			// 更新商品数量
			valChange(index) {
				this.updateGoodsCount(index)
			},
			// 点击商品图片跳转到商品详情
			handle(item) {
				uni.navigateTo({
					url: '/pages/Product_content/Product_content?id=' + item.goods_id
				})
			},
			// 全选状态
			checkbox(n) {
				console.log(n, '查看数组是否为空');
				if (n.length != 0) {
					this.checked = true
					this.updateAllGoodsAmount(true)
				} else {
					this.updateAllGoodsAmount(false)
				}
			},
			// 商品选中状态
			checkboxChange(n) {
				// console.log(n);
				n.goods_state = !n.goods_state
				let goods = {
					goods_id: n.goods_id,
					goods_state: n.goods_state
				}
				this.updateGoodsState(goods)
				let obj = this.cart.every(item => item.goods_state == true)
				if (obj == true) {
					this.checked = true
				} else {
					this.checked = false
				}
			}
		},
		onLoad() {
			// 初始化页面判断是商品是否为全选状态
			console.log(this.cart);
			if (this.cart != 0) {
				let obj = this.cart.every(item => item.goods_state == true)
				console.log(obj);
				if (obj == true) {
					this.checked = true
				}
			}
		},
		onInit() {
			console.log('监听页面初始化');
		},
		onShow() {
			console.log('监听页面显示');
			console.log(this.cart);
			let token = uni.getStorageSync('token')
			console.log(token);
			if (token == '') {
				this.clear()
			}
		},
		onTabItemTap(e) {
			// tab 点击时执行，此处直接接收单击事件
		},
	};
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss">
	.top {
		height: 92rpx;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f9f9f9;

		font-size: 28rpx;
	}

	.car {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-40%, -50%);
	}

	.goodslist {
		margin-bottom: 140rpx;

		.goods {
			padding: 30rpx 40rpx;
			height: 240rpx;
			display: flex;
			align-items: center;

			.left {}

			.center {
				width: 230rpx;
				height: 240rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				width: 368rpx;
				padding-left: 30rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.title {
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.parameter {
					font-size: 24rpx;
					color: #d1d1d1;
				}

				.number {}

				.price {
					color: #fd6906;
					font-size: 28rpx;
				}
			}
		}


	}

	.bottom {
		width: 670rpx;
		height: 140rpx;
		padding: 0 40rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border-top: 2rpx solid #ebebeb;

		.right {
			width: 208rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			border-radius: 10rpx;
			background-color: #fd6906;
		}
	}
</style>
