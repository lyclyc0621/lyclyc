export default {
	namespaced: true,
	state: () => ({
		number: null,
		cart: JSON.parse(uni.getStorageSync('cart') || "[]")
	}),
	mutations: {
		// 计算购物车商品的数量
		addNumber(state) {
			state.number = 0
			// state.number = state.cart.length
			for (let s of state.cart) {
				state.number += s.goods_count
			}
		},
		// 保存商品到本地缓存
		addinfolist(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!findResult) {
				// 购物车中没有这个商品
				state.cart.push(goods);
			} else {
				// 购物车中有这个商品,修改数量即可
				findResult.goods_count++;
			}
			// 购物车中的商品缓存到本地
			this.commit('m_cart/saveToStorage')
			this.commit('m_cart/addNumber')
		},
		// 将购物车中的商品保存到缓存中
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 保存购物车中的数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.name)
			if (findResult) {
				findResult.goods_count = goods.value;
			}
			this.commit('m_cart/saveToStorage')
		},
		// 更新购物车的商品选中状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state;
			}
			this.commit('m_cart/saveToStorage')
		},
		// 商品选中全部选中状态
		updateAllGoodsAmount(state, newStatus) {
			state.cart.forEach(item => item.goods_state = newStatus);
			this.commit('m_cart/saveToStorage')
		},
		// 退出清除vuex里的数据
		clear(state) {
			state.cart = []
		}
	},
	actions: {},
	getters: {
		checkedCount(state) {
			let totalprice = []
			for (let s of state.cart) {
				if (s.goods_state == true) {
					totalprice.push(s)
				}
			}
			let c = 0
			totalprice.forEach(item => {
				if (item.goods_state) {
					c += item.goods_count
				}
			})
			return c;
		},
		checkedAmount(state) {
			// console.log(state, 'getters');
			let totalprice = []
			for (let s of state.cart) {
				if (s.goods_state == true) {
					totalprice.push(s)
				}
			}
			let c = 0
			totalprice.forEach(item => {
				if (item.goods_state) {
					c += parseInt(item.goods_count) * parseInt(item.goods_price)
				}
			})
			return c;
		}
	}
}
