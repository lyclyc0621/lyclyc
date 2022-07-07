const BASE_URL = "https://m.baseus.com/api/"
const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中'
		})
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data || {},
			success: (res) => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
				if (res.data.code !== 0) {
					return uni.showToast({
						icon: 'error',
						title: '获取数据失败',
						duration: 2000
					});
				}
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					icon: 'error',
					title: '获取数据失败',
					duration: 2000
				});
				reject(err)
			}
		})
	})
}
export default request
