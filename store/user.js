export default {
	namespaced: true,
	state: () => ({
		userinfo: {
			avatarUrl: require('../static/my/VSQduJE9vDRGZ7TAZKgLNXJDYRupdAYh.png'),
			nickName: '点击登录/注册',
		},
	}),
	mutations: {
		add(state, user) {
			//变更状态
			state.userinfo = user
			console.log(state);
		},
	},
	getters: {

	}
}
