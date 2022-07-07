// 模拟请求接口假数据
import goods from './api/goods.js'
import home from './api/home.js'
import index from './api/index.js'


// 商品列表 (搜索)
function apiGoods({
	page,
	limit,
	keyword
}) {
	return new Promise((resolute, reject) => {
		let data = {
			list: [], //数据列表
			totalCount: 0, //总数量
			totalPage: 0, //总页数
			hasNext: false
		}

		// 符合关键字的记录
		let keywordList = []
		if (!keyword || keyword == "全部") {
			// 搜索全部数据
			keywordList = goods
		} else {
			// 关键字搜索
			if (keyword == "母婴") keyword = "婴" //为这个关键词展示多条数据
			for (let i = 0; i < goods.length; i++) {
				let good = goods[i]
				if (good.goodName.indexOf(keyword) !== -1) {
					keywordList.push(good)
				}
			}
		}

		// 分页
		for (let i = (page - 1) * limit; i < page * limit; i++) {
			if (i > keywordList.length) break
			data.list.push(keywordList[i])
		}
		// 汇总数据
		data.totalCount = keywordList.length //总数量
		// 总页数 = 总数量 / 每月条数
		data.totalPage = Math.ceil(data.totalCount / page) //总页数
		// 判断是否有下一页 
		data.hasNext = page < data.totalPage

		// 模拟接口请求成功
		resolute(data)
	}).catch(err => {
		// 模拟接口请求成功
		reject(err)
	})
}

function apiHome() {
	return new Promise((resolute, reject) => {
		resolute(home)
	}).catch(err => {
		// 模拟接口请求成功
		reject(err)
	})
}

function apiIndex() {
	return new Promise((resolute, reject) => {
		resolute(index)
	}).catch(err => {
		// 模拟接口请求成功
		reject(err)
	})
}

const navigateTo = (params) => {
	// const whiteList = [
	// 	'/pages/login/index',
	// ]
	// let token = uni.getStorageSync("token");
	// console.log(token);
	// //别的操作
	// if (token) {
	// 	//可以再做一次token校检
	// 	uni.navigateTo(params)
	// } else {
	// 	uni.switchTab({
	// 		url: 'pages/my/my'
	// 	})
	// }
}

export default {
	apiGoods,
	apiHome,
	apiIndex,
	navigateTo
}
