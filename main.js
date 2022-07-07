// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
import api from '@/api'
Vue.prototype.$API = api


import mock from '@/mock/mock.js'
Vue.prototype.$mock = mock

Vue.config.productionTip = false

uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}


import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'

export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
