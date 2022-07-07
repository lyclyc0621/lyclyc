<template>
	<view>
		<!-- 引用搜索组件 -->
		<my-search @click='gotoSearch'></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: windowHeight }"
				:scroll-with-animation="true" :scroll-into-view="clickToId">
				<view class=" left-scroll-item">
					<block v-for="(item,index) in list" :key='i'>
						<view :class="['left-scroll-item', index === currentNum? 'active': '' ]" :id="'to' + index"
							@click="setId(index)">{{ item.name }}</view>
					</block>
				</view>
			</scroll-view>
			<!-- 右侧滚动视图区域 -->
			<scroll-view class="right-scroll-view" :scroll-into-view="clickId" @scroll="scroll"
				:scroll-with-animation="true" :scroll-y="true" :style="{ height: windowHeight }">
				<view class="right-scroll-item">
					<view class="cate-lv2" v-for="(item, index) in list" :key="index">
						<view class="cate-lv2-title" :id="'po' + index">
							{{item.name}}
						</view>
						<!-- 渲染三级分类列表 -->
						<view class="cate-lv3-list">
							<view class="cate-lv3-item" v-for="(it,i) in item.child" :key="i"
								@click="clickCommodity(it)">
								<image :src="it.icon" mode=""></image>
								<text>{{it.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				windowHeight: '0rpx',
				clickId: '',
				clickToId: '',
				currentNum: 0,
				topList: [],
				isLeftClick: false
			};
		},
		methods: {
			setId(index) {
				this.clickId = 'po' + index;
				this.isLeftClick = true;
				this.currentNum = index;
			},
			scroll(e) {

				if (this.isLeftClick) {
					this.isLeftClick = false;
					return;
				}
				let scrollTop = e.target.scrollTop;
				// console.log(scrollTop);
				for (let i = 0; i < this.topList.length; i++) {
					let h1 = this.topList[i];
					let h2 = this.topList[i + 1];
					if (scrollTop >= h1 && scrollTop < h2) {
						this.currentNum = i;
						this.clickToId = 'to' + i;
					}
					//解决滚动到最后选项左侧不会选中
					let length = this.topList.length;
					if (scrollTop >= this.topList[length - 1]) {
						this.currentNum = length - 1;
						this.clickToId = 'to' + length - 1;
					}
				}
			},
			async getList() {
				const res = await this.$mock.apiIndex();
				console.log(res)
				this.list = res.categorys[0].child
				const query = await uni.createSelectorQuery().in(this);
				query
					.selectAll('.cate-lv2-title')
					.boundingClientRect(res => {
						// console.log(res);
						let nodes = res;
						let rel = [];
						nodes.map(item => {
							rel.push(item.top);
						});
						console.log(rel);
						this.topList = rel;
					})
					.exec();
			},
			clickCommodity(item) {
				console.log(item);
				uni.navigateTo({
					url: '/subpkg/goodslist/goodslist?c1=5&c2=' + item.parentId + '&c3=' + item.id + '&title=' +
						item.name
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			let _that = this;
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.windowHeight);
					_that.windowHeight = (res.windowHeight - 50) + 'px';
				}
			});
			this.getList()
		}
	};
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;

			.left-scroll-item {
				width: 170rpx;
				line-height: 100rpx;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 28rpx;

				&.active {
					background-color: #FFFFFF;
					position: relative;
					color: #fd6906;

					&::before {
						position: absolute;
						// left: 0;
						top: 20rpx;
						content: '';
						display: block;
						width: 6rpx;
						height: 60rpx;
						background-color: #fd6906;
					}
				}
			}
		}

		.right-scroll-view {
			.right-scroll-item {
				.cate-lv2 {
					.cate-lv2-title {
						font-size: 28rpx;
						text-align: center;
						padding: 30rpx 0;
						color: #303133;
					}

					.cate-lv3-list {
						display: flex;
						flex-wrap: wrap;

						.cate-lv3-item {
							display: flex;
							flex-direction: column;
							align-items: center;
							margin: 28rpx 0;
							width: 50%;
							color: #848484;

							image {
								width: 100rpx;
								height: 100rpx;
							}

							text {
								margin-top: 20rpx;
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
