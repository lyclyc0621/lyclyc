<template>
	<view>
		<!-- <view class="status_bar">
			这里是状态栏
		</view> -->
		<!-- 顶部导航栏 -->
		<view class="nav">
			<view class="nav_left">
				<view class="left_logo">
					<image src="../../static/beisi.png" mode=""></image>
				</view>
			</view>
			<view class="nav_center" @click="searchClick">
				<!-- <uni-icons class="input-uni-icon" type="search" size="18" color="#999" /> -->
				<icon type="search" class="searchIcon" size="14" />
				<!-- <text class="nav_searchname">{{searchname}}</text> -->
				<view style="margin-left: 10rpx; color: #9f9f9f;font-size: 24rpx;">
					{{searchname}}
				</view>
			</view>
			<view class="nav_right">
				<view class="city">
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="lunbonav">
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="lunboimglist" :current="current"
				:mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change" :current="swiperDotIndex" circular="true" :autoplay="true"
					:interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in lunboimglist" :key="index" @click="contentClick(item)">
						<view class="swiper-item uni-bg-red lunbo">
							<image :src="item.pic" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>

		<!-- 下方导航 -->
		<view class="main">
			<!-- 广告 -->
			<view class="main_adv">
				<image :src="infoList[2].data[0].pic" mode=""></image>
			</view>
			<!-- 类别 -->
			<view class="main_category" :style="{backgroundImage: 'url('+infoList[3].bannerPic+')'}">
				<view class="category" v-for="(item,i) in infoList[3].data" :key="i">
					<view class="category_img">
						<image :src="item.pic" mode=""></image>
					</view>
					<view class="category_title">
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<!-- 新品 -->
			<!-- 	<view class="main_new">

				<view class="new">
					<view class="new_left">
						<image :src="infoList[4].data[0].pic" mode=""></image>
					</view>
					<view class="new_right">
						<view class="new_right_img" v-for="(item ,index) in newlist" :key="index">
							<image :src="item.pic" alt="">
						</view>
					</view>
				</view>
			</view> -->

			<!-- 发现快充 -->
			<view class="main_new">
				<view style="font-size: 28rpx;">
					{{infoList[11].title}}
				</view>
				<view class="new">
					<view style="height: 314rpx" class="new_left" @click="contentClick(infoList[11].data[0])">
						<image :src="infoList[11].data[0].pic" mode=""></image>
					</view>
					<view class="new_right">
						<view class="new_right_img" v-for="(item ,i) in Chargelist" :key="i"
							@click="contentClick(item)">
							<image :src="item.pic" alt="">
						</view>
					</view>
				</view>
			</view>

			<!-- 听见你的声音 -->
			<view class="main_new">
				<view style="font-size: 28rpx;">
					{{infoList[10].title}}
				</view>
				<view class="new">
					<view class="new_left" @click="contentClick(infoList[10].data[0])">
						<image :src="infoList[10].data[0].pic" mode=""></image>
					</view>
					<view class="new_right_3">
						<view class="new_right_img" style="width: 170rpx;height: 230rpx;"
							v-for="(item ,i) in earphonelist" :key="i" @click="contentClick(item)">
							<image :src="item.pic" alt="">
						</view>
					</view>
				</view>
			</view>

			<view class="main_new">
				<view class="recommend" @click="contentClick(infoList[12].data[0])">
					<image :src="infoList[12].data[0].pic" mode=""></image>
				</view>
			</view>

			<!-- 车旅助手 -->
			<view class="main_new">
				<view style="font-size: 28rpx;">
					车载周边
				</view>
				<view class="new bgurl" :style="{backgroundImage: 'url('+infoList[9].backgroundPic+')'}">
					<view class="travel_img" v-for="(item ,i) in infoList[9].data" :key="i" @click="contentClick(item)">
						<image :src="item.pic" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 探索更多 -->
			<view class="main_new">
				<navigator url="/pages/index/index" open-type="switchTab" class="recommend">
					<image :src="infoList[14].data[0].pic" mode=""></image>
				</navigator>
			</view>

			<view class="main_new">
				<view class="main_bottom">
					<image :src="infoList[4].data[0].pic" mode="widthFix"></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// home所有数据列表
				infoList: [],
				// 搜索名称轮播展示
				searchname: '',
				// 搜索名称轮播列表
				searchlist: [],
				// 轮播图列表   
				lunboimglist: [],
				// 新品
				newlist: [],
				// 充电器
				Chargelist: [],
				// 耳机
				earphonelist: [],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {
					width: 10,
					height: 1,
					backgroundColor: '#fff',
					border: '2rpx rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgb(255, 241, 10)',
					selectedBorder: '2rpx rgba(0, 0, 0, .9) solid'
				},
				swiperDotIndex: 0.,
			};
		},
		onLoad() {
			this.getlist()
			this.getsearchlist()
		},
		methods: {
			// 获取首页数据
			async getlist() {
				console.log(this.$API);
				const res = await this.$mock.apiHome()
				console.log(res);
				this.infoList = res
				this.lunboimglist = res[0].data
				// this.newlist = res.data.jsonData[4].data.slice(1)
				this.Chargelist = res[11].data.slice(1)
				this.earphonelist = res[10].data.slice(1)

				console.log(this.infoList);
				// console.log(this.infoList[1].data[0].pic);

			},
			// 获取搜索框轮播内容
			async getsearchlist() {
				await this.$API.home.hotSearch().then((res) => {
					console.log(res);
					this.searchlist = res.data
					this.count()
				})
			},
			// 搜索框内容轮播
			count() {
				for (let i = 0; i < this.searchlist.length; i++) {
					setTimeout(() => {
						this.searchname = this.searchlist[i]
						if (i == this.searchlist.length - 1) {
							this.count()
						}
					}, 3000 * i)
				}
			},
			// 跳转到搜索页面
			searchClick() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 点击商品跳转到商品详情页
			contentClick(id) {
				if (isNaN(id.content) == 0 && id.content != 1) {
					uni.navigateTo({
						url: '/pages/Product_content/Product_content?id=' + id.content
					})
				}

			},
			// 
			change(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			onBanner(index) {
				console.log(22222, index);
			}
		}
	}
</script>

<style lang="scss">
	$nav-height:90rpx;

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;

	}

	.nav {
		width: 100%;
		height: 108rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgb(240, 240, 240);
		position: fixed;
		top: 0;
		z-index: 1111;
	}

	.nav_left {
		width: 20%;
	}

	.nav_center {
		width: 60%;
		height: 70rpx;
		border-radius: 40rpx;
		background-color: #fff;
		display: flex;
		align-items: center;

		.searchIcon {
			margin-left: 20rpx;
		}
	}

	.nav_right {
		width: 20%;
		height: $nav-height;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box-bg {
		background-color: #F5F5F5;
		padding: 10rpx 0;
	}

	.city {
		width: 54rpx;
		height: 54rpx;
		background: url(https://cdn.baseus.com/admin/product/baseus.svg);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.left_logo {
		width: 68rpx;
		height: 36rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}


	.input-uni-icon {
		margin-left: 30rpx;
		line-height: 70rpx;
	}

	.swiper-box {
		height: 440rpx;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		color: #fff;
	}

	.lunbonav {
		margin-top: 108rpx;
	}

	.lunbo {
		height: 100%;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.main {
		padding: 20rpx;
	}

	.main_adv {
		height: 500rpx;
		margin: 30rpx 0;
	}

	.main_category {
		// height: 192rpx;
		margin-top: 44rpx;
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
	}

	.category {
		padding: 30rpx 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.category_img {
		width: 70rpx;
		height: 70rpx;
		margin-bottom: 14rpx;
	}

	.category_title {
		font-size: 26rpx;
	}

	.main_new {
		margin-top: 40rpx;
		text-align: center;
	}

	.new {
		display: flex;
		justify-content: space-between;
		margin-top: 14rpx;
	}

	.new_left {
		width: 390rpx;
		height: 482rpx;
	}

	.new_right {
		margin-left: 10rpx;
		width: 390rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.new_right_3 {
		margin-left: 10rpx;
		width: 390rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: space-between;
		justify-content: space-between
	}

	.new_right_img {
		width: 350rpx;
		height: 148rpx;
	}

	.recommend {
		width: 710rpx;
		height: 100rpx;
	}

	.bgurl {
		height: 476rpx;
		background-size: 100%;
		background-repeat: no-repeat;
		display: flex;
		justify-content: space-around;
		align-items: flex-end
	}

	.travel_img {
		width: 336rpx;
		height: 324rpx;
	}
</style>
