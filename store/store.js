// 导入相关的包
import Vue from "vue";
import Vuex from "vuex";
// 导入user子仓库
import moduleUser from './user.js'
// // 导入cart子仓库
import moduleCart from './cart.js'
// 将vuex安装为vue的插件
Vue.use(Vuex);
// 创建store实例
const store = new Vuex.Store({
	// 要挂载的模块
	modules: {
		m_user: moduleUser,
		m_cart: moduleCart
	}
})
// 导出store实例
export default store;
