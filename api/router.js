export const navigateTo = (params) => {
	let token = uni.getStorageSync("token");
	console.log(token);
	//别的操作
	if (token) {
		//可以再做一次token校检
		uni.navigateTo(params)
	} else {
		uni.redirectTo({
			url: "../login/login"
		})
	}
}
