<template>
	<view>
		<view class="search-box">
			<!-- 基本用法 -->
			<uni-search-bar radius="100" placeholder="请输入搜索内容" bgColor="#EEEEEE" v-model='value' @input="input"
				@confirm="doSearch" />
			</uni-section>
		</view>
		<!-- 搜索列表 -->
		<view class="sugg-list" v-if="searchResults.length!==0">
			<view class="sugg-item" @click="gotoDetail(item)" v-for="(item,i) in searchResults" :key="i">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史记录 -->
		<view class="history-box" v-if="searchResults.length===0">
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="cleanHistory" type="trash" size="16"></uni-icons>
			</view>
			<!-- 搜索列表区域 -->
			<view class="history-list">
				<uni-tag :inverted="true" v-for="(item2,i2) in historys" :key="i2" :text="item2"
					@click="gotoGoodsList(item2)" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器
				timer: null,
				// 搜索文字
				value: '',
				// 搜索关键字
				kw: '',
				// 搜索建议列表
				searchResults: [],
				historyList: ['小米', 'aaa', 'apple']
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('value') || '[]')
		},
		methods: {
			doSearch() {
				console.log(this.value);
				if (this.value == '') {
					uni.showToast({
						title: '请输入搜索关键字',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/subpkg/goodslist/goodslist?keywords=' + this.value
					})
					this.saveSearchhistory();
				}

			},
			// 文本框聚焦事件  e表示用户在文本框中输入的值
			input(e) {
				// 防抖函数
				clearTimeout(this.timer)
				// console.log(e)
				this.timer = setTimeout(() => {
					// console.log(e)
					// 将用户输入的内容作为搜索关键字保存起来
					this.kw = e;
					// 根据关键词 查询搜索建议列表
					// this.getSearchList();
				}, 500)
			},
			// 查询搜索建议列表
			// async getSearchList() {
			// 	// 判断搜索关键词是否为空,如果为空,阻止网络请求
			// 	if (this.kw === '') {
			// 		this.searchResults = [];
			// 		return;
			// 	}
			// 	// 发起网络请求 获取数据
			// 	const {
			// 		data: res
			// 	} = await uni.$http.get('/api/public/v1/goods/qsearch', {
			// 		query: this.kw
			// 	})
			// 	// console.log(res)
			// 	if (res.meta.status !== 200) return uni.$showMsg();
			// 	this.searchResults = res.message;
			// 	// 当结果查询到以后就应该保存历史记录
			// 	this.saveSearchhistory();
			// },
			// 点击建议商品列表进入商品详情页
			gotoDetail(item) {
				// console.log(item)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 保存搜索历史记录
			saveSearchhistory() {
				this.historyList.push(this.value);
				const set = new Set(this.historyList);
				set.delete(this.value);
				set.add(this.value);
				this.historyList = Array.from(set);
				//将历史纪录缓存到本地
				uni.setStorageSync('value', JSON.stringify(this.historyList))
			},
			// 点击清除历史记录
			cleanHistory() {
				// 清除页面历史记录数组
				this.historyList = [];
				// 清除缓存中的数据
				uni.setStorageSync('value', '[]')
			},
			// 点击历史记录,进入商品列表页
			gotoGoodsList(item) {
				console.log(item)

				this.value = item
				uni.navigateTo({
					url: '/subpkg/goodslist/goodslist?keywords=' + item
				})
				// this.kw=item
			}
		},
		computed: {
			historys() {
				return [...this.historyList].reverse()
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

	.sugg-list {
		padding: 0 10rpx;

		.sugg-item {
			font-size: 30rpx;
			padding: 26rpx 0;
			border-bottom: 2rpx solid #efefef;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-name {
				color: #666666;
				// 强制不换行
				white-space: nowrap;
				// 强制溢出部分隐藏
				overflow: hidden;
				// 文字超过可视区宽度,显示省略号
				text-overflow: ellipsis;
				margin-right: 6rpx;
			}
		}
	}

	.history-box {
		padding: 0 10rpx;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			line-height: 80rpx;
		}

		.history-list {
			.uni-tag {
				margin-right: 10rpx;
			}
		}
	}
</style>
