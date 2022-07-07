<template>
	<view class="mian">
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<!-- 商品轮播图 -->
		<view class="u-demo-block">
			<u-swiper :list="carousellist" @change="huidiao" :autoplay="true" :circular="true" interval="3000"
				duration="1000" indicatorStyle="right: 40rpx;" height='750rpx'>
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ currentNum}}/{{ carousellist.length }}</text>
				</view>
			</u-swiper>
		</view>
		<!-- 商品标题价格 -->
		<view class="title">
			<view class="title_top">
				<view class="price">
					￥{{parseFloat(infolist.price).toFixed(2)}}
				</view>
				<view class="like" @click="clickLove">
					<view class="like_left" v-if="love">
						<image src="../../static/love-selected.png" mode=""></image>
					</view>
					<view class="like_left" v-else>
						<image src="../../static/love.png" mode=""></image>
					</view>
					<text style="margin-left: 10rpx;">喜欢</text>
				</view>
			</view>
			<view class="title_center">
				{{infolist.name}}
			</view>
			<view class="title_bottom">
				{{infolist.subTitle}}
			</view>
		</view>
		<!-- 商品参数选择 -->
		<view class="choose" @click="show=true">
			<view class="choose_left">
				选择规格
			</view>
			<view class="choose_right">
				<text style="margin-right: 6rpx;" v-for="(item,index) in infolist.skuAttrValues"
					:key="index">{{item.value?item.value:''}}{{index === infolist.skuAttrValues.length-1?"":"/"}}</text>
				<u-icon name="arrow-right" color='#999'></u-icon>
			</view>
		</view>
		<!-- 产品参数 -->
		<view class="parameter">
			<u-collapse>
				<u-collapse-item title="产品参数" name="Docs guide">
					<uni-table border emptyText="暂无更多数据">
						<uni-tr v-for="(item, index) in datalist.productAttrs" :key="index">
							<uni-td style="width: 198rpx;font-size: 28rpx;">{{ item.name }}</uni-td>
							<uni-td>{{ JSON.parse(item.value)[0] }} </uni-td>
						</uni-tr>
					</uni-table>
				</u-collapse-item>

			</u-collapse>
		</view>
		<!-- 评价 -->
		<view class="Evaluation">
			<view class="Evaluation_left">
				<view class="Evaluation_left_top">
					<text class="top_text">{{parseFloat(datalist.commentStar).toFixed(1)}}</text>
					<text style="font-size: 28rpx;">({{datalist.commentCount}})</text>
				</view>
				<view class="Evaluation_left_bottom">
					<u-rate active-color="#FA3534" inactive-color="#b2b2b2" gutter="2" readonly
						:value='datalist.commentStar'></u-rate>
				</view>
			</view>
			<view class="Evaluation_right">
				<text style="margin-right: 6rpx;">评论详情</text>
				<u-icon name="arrow-right" color='#b2b2b2'></u-icon>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="Details safe-padding">
			<view class="Details_top">
				<view style="width: 100rpx;height: 2rpx; border-top: 2rpx solid #b2b2b2;"> </view>
				<text style="margin: 0 20rpx;">图文详情</text>
				<view style="width: 100rpx;height: 2rpx; border-top: 2rpx solid #b2b2b2;"> </view>
			</view>
			<view class="Details_img imgheight" v-for="(item,index) in detailDesclist" :key="index">
				<image :src="item" mode="widthFix"></image>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<view class="bottomNav safe-padding">
			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
		<!-- 商品参数弹窗 -->
		<u-popup :show="show" @close="close">
			<view class="Pop-ups">
				<view class="Specification">
					<text>规格</text>
				</view>
				<view class="number">
					<text>数量</text>
					<u-number-box @change="valChange"></u-number-box>
				</view>
				<view class="allspecs" v-if="info.standard!=''">
					<text>规格</text>
					<view class="allspecstype">
						<view v-for="(item,index) in Specification" :key="index">
							<view :class="[info.standard == item ? 'active' : 'select']" @click="choseItem(item)">
								<text class="grid-text">{{ item }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="allspecs" v-if="info.color!=''">
					<text>颜色</text>
					<view class=" allspecstype">
						<view v-for="(item,index) in colorlist" :key="index">
							<view :class="[info.color == item ? 'active' : 'select']" @click="colorItem(item)">
								<text class="grid-text">{{ item }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="allspecs" v-if="info.interface!=''">
					<text>接口</text>
					<view class="allspecstype">
						<view v-for="(item,index) in interfacelist" :key="index">
							<view :class="[info.interface == item ? 'active' : 'select']" @click="interfaceItem(item)">
								<text class="grid-text">{{ item }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="operate">
					<view class="addcart" @click="addcart">
						加入购物车
					</view>
					<view class="buy" @click="buy">
						立即购买
					</view>
				</view>
			</view>
		</u-popup>
	</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState('m_cart', ['number'])
		},
		watch: {
			number(val) {
				this.options[1].info = val
			},
		},
		data() {
			return {
				scrollTop: 0,
				// 传进来的id
				ProductID: '',
				// 接收到的所有数据
				datalist: [],
				// 当前页面的商品数据
				infolist: [],
				// 轮播图列表
				carousellist: [],
				// 当前轮播图的页数
				currentNum: 1,
				love: false,
				// 详情图片
				detailDesclist: [],
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'cart',
					text: '购物车',
					info: null
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#fff',
						color: '#fd6906'
					},
					{
						text: '立即购买',
						backgroundColor: '#fd6906',
						color: '#fff'
					}
				],
				show: false,
				value: 0,
				// 规格
				Specification: [],
				// 颜色
				colorlist: [],
				// 接口
				interfacelist: [],
				// 当前商品颜色规格
				info: {
					// 规格
					standard: '',
					// 型号
					color: '',
					// 接口
					interface: ''
				}
			};
		},
		onLoad(openid) {
			// console.log(openid);
			this.ProductID = openid.id
			this.getProductContent()
		},
		methods: {
			...mapMutations('m_cart', ['addNumber', 'addinfolist']),
			async getProductContent() {
				const res = await this.$API.home.ProductContent(this.ProductID)
				this.datalist = res.data
				this.Specification = res.data.attrSalesMap.规格 || res.data.attrSalesMap.型号
				this.colorlist = res.data.attrSalesMap.颜色
				this.interfacelist = res.data.attrSalesMap.接口
				// console.log(this.Specification);
				// console.log(this.colorlist);
				this.detailDesclist = JSON.parse(res.data.detailDesc)
				console.log(this.datalist);
				for (let s of res.data.skuList) {
					if (this.ProductID.indexOf(s.id) == 0) {
						this.infolist = s
					}
				}
				// console.log(this.infolist);
				this.carousellist = JSON.parse(this.infolist.albumPics)
				this.carousellist.unshift(this.infolist.pic)
				for (let arr of this.infolist.skuAttrValues) {
					if (arr.name == '颜色') {
						console.log(arr.value);
						this.info.color = arr.value
					}
				}
				for (let arr of this.infolist.skuAttrValues) {
					if (arr.name == '规格' || arr.name == '型号') {
						this.info.standard = arr.value
					}
				}
				for (let arr of this.infolist.skuAttrValues) {
					if (arr.name == '接口') {
						this.info.interface = arr.value
					}
				}
				if (uni.getStorageSync('cart') == '') {
					return
				} else {
					let infolist = JSON.parse(uni.getStorageSync('cart'))
					for (let s of infolist) {
						this.options[1].info += s.goods_count
					}
					// console.log(this.options[1].info);
					// this.options[1].info = number.length
				}
			},
			huidiao(index) {
				// console.log(index);
				this.currentNum = index.current + 1
			},
			clickLove() {
				this.love = !this.love
			},
			onClick(e) {
				console.log(e)
				if (e.index == 1) {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				this.show = true
				console.log(e);
			},
			// 商品数量
			valChange(num) {
				this.value = num.value
				// console.log(this.value);
			},
			close() {
				this.show = false
			},
			// 规格选择
			choseItem(index) {
				// console.log(index);
				this.info.standard = index;
				if (this.info.color != '') {
					for (let s of this.datalist.skuList) {
						// console.log(s.skuAttrValues);
						for (let i = 0; i <= s.skuAttrValues.length - 1; i++) {
							if (s.skuAttrValues[0].value == this.info.standard && s.skuAttrValues[1].value == this.info
								.color) {
								console.log(s);
								this.carousellist = JSON.parse(s.albumPics)
								this.carousellist.unshift(s.pic)
								this.infolist = s
							}
						}
					}
				} else {
					for (let s of this.datalist.skuList) {
						// console.log(s.skuAttrValues);
						for (let i = 0; i <= s.skuAttrValues.length - 1; i++) {
							if (s.skuAttrValues[i].value == this.info
								.color) {
								this.carousellist = JSON.parse(s.albumPics)
								this.carousellist.unshift(s.pic)
								this.infolist = s
							}
						}
					}
				}
			},
			// 颜色选择
			colorItem(index) {
				// console.log(index)
				this.info.color = index;
				if (this.info.standard != '') {
					for (let s of this.datalist.skuList) {
						console.log(s.skuAttrValues);
						for (let i = 0; i <= s.skuAttrValues.length - 1; i++) {
							if (s.skuAttrValues[0].value == this.info.standard && s.skuAttrValues[1].value == this.info
								.color) {
								this.carousellist = JSON.parse(s.albumPics)
								this.carousellist.unshift(s.pic)
								this.infolist = s
							}
						}
					}
				} else {
					for (let s of this.datalist.skuList) {
						// console.log(s.skuAttrValues);
						for (let i = 0; i <= s.skuAttrValues.length - 1; i++) {
							if (s.skuAttrValues[i].value == this.info
								.color) {
								this.carousellist = JSON.parse(s.albumPics)
								this.carousellist.unshift(s.pic)
								this.infolist = s
							}
						}
					}
				}
			},
			interfaceItem(index) {
				// console.log(index);
				this.info.interface = index;
				if (this.info.interface != '') {
					for (let s of this.datalist.skuList) {
						// console.log(s.skuAttrValues);
						for (let i = 0; i <= s.skuAttrValues.length - 1; i++) {
							if (s.skuAttrValues[0].value == this.info.interface) {
								// console.log(s);
								this.carousellist = JSON.parse(s.albumPics)
								this.carousellist.unshift(s.pic)
								this.infolist = s
							}
						}
					}
				} else {
					for (let s of this.datalist.skuList) {
						// console.log(s.skuAttrValues);
						for (let i = 0; i <= s.skuAttrValues.length - 1; i++) {
							if (s.skuAttrValues[i].value == this.info
								.color) {
								this.carousellist = JSON.parse(s.albumPics)
								this.carousellist.unshift(s.pic)
								this.infolist = s
							}
						}
					}
				}
			},
			//加入购物车
			addcart() {
				let token = uni.getStorageSync('token')
				console.log('token', token);
				if (token == '') {

					uni.switchTab({
						url: '/pages/my/my'
					})
					uni.showToast({
						title: '你还没有登录,清先登录...',
						icon: "none",
						duration: 2000
					})
				} else {
					uni.showToast({
						title: '加入购物车成功',
						icon: "success",
						duration: 2000
					})
					console.log(this.infolist);

					this.show = false
					let goods = {
						goods_id: this.infolist.id,
						goods_name: this.infolist.name,
						goods_price: this.infolist.price,
						goods_state: false,
						goods_count: 1,
						goods_skuAttrValues: this.infolist.skuAttrValues,
						goods_pic: this.infolist.pic
					}
					console.log(goods);
					this.addinfolist(goods)
				}

			},
			buy() {
				uni.showToast({
					title: '功能开发中...',
					icon: "error",
					duration: 2000
				})
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

	}
</script>

<style lang="scss">
	.safe-padding {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	.main {
		position: relative;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.imgcontainer {
		width: 750rpx;
		height: 750rpx;
	}

	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 12rpx;
			width: 12rpx;
			border-radius: 200rpx;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 10rpx;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.indicator-num {
		padding: 4rpx 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 200rpx;
		width: 70rpx;
		@include flex;
		justify-content: center;

		&__text {
			color: #FFFFFF;
			font-size: 24rpx;
		}
	}

	.title {
		margin: 10rpx 0;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;

		.title_top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price {
				font-size: 48rpx;
				color: #fd6906;
			}

			.like {
				height: 62rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.like_left {
					width: 48rpx;
					height: 48rpx;

				}
			}
		}

		.title_center {
			font-size: 36rpx;
			font-weight: 500;
			color: #666;
		}

		.title_bottom {
			margin-top: 10rpx;
			line-height: 36rpx;
			font-size: 24rpx;
			color: #999;
		}
	}

	.choose {
		margin: 10rpx 0;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;

		.choose_left {
			font-size: 28rpx;
		}

		.choose_right {
			color: #999;
			display: flex;

		}
	}

	.parameter {
		background-color: #FFFFFF;



		.Collapse {
			padding: 0 0;
		}
	}

	.Evaluation {
		margin: 10rpx 0;
		padding: 20rpx 30rpx;
		height: 146rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;

		.Evaluation_left {

			.Evaluation_left_top {
				height: 104rpx;
				line-height: 110rpx;

				.top_text {
					font-weight: 700;
					font-size: 80rpx;
					color: #4b4b4b;
				}

			}

			.Evaluation_left_bottom {
				margin-top: 10rpx;
			}
		}

		.Evaluation_right {
			display: flex;
			color: #999;
		}
	}

	.Details {
		margin-bottom: 100rpx;

		.Details_top {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			background-color: #fff;
		}

		.imgheight {
			line-height: 0rpx;
		}
	}

	.bottomNav {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;

		.uni-tab__cart-button-right {
			border-left: 2rpx solid hsla(0, 0%, 80%, .9);
		}
	}


	.Pop-ups {
		padding: 60rpx 40rpx;

		.Specification {
			font-size: 48rpx;
			font-weight: 500;
			color: #39393b;
		}

		.number {
			margin-top: 60rpx;
			font-weight: 500;
			color: #5d5d5d;
			display: flex;
			justify-content: space-between;
		}

		.allspecs {
			margin-top: 40rpx;

			.allspecstype {
				display: flex;
				margin: 20rpx 0;
				font-size: 24rpx;
				flex-wrap: wrap;

				.active {
					// width: 152rpx;
					padding: 0 40rpx;
					height: 80rpx;
					border-radius: 10rpx;
					background-color: #ffff;
					border: 2rpx solid #ff5c18;
					color: #ff5c18;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 20rpx 20rpx 0;
				}

				.select {
					// width: 152rpx;
					padding: 0 40rpx;
					height: 80rpx;
					border-radius: 10rpx;
					border: 2rpx solid #f0f3f7;
					color: #364061;
					background-color: #f8f8f8;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 20rpx 20rpx 0;

				}
			}

		}

		.operate {
			margin-top: 60rpx;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
			text-align: center;

			.addcart {
				width: 320rpx;
				height: 78rpx;
				border-radius: 10rpx;
				border: 2rpx solid #707070;
			}

			.buy {
				width: 320rpx;
				height: 80rpx;
				color: #fff;
				border-radius: 10rpx;
				background-color: #fd6906;
			}
		}
	}
</style>
