import request from '@/unpackage/utilt/request'

export const lunbo = () => request({
	url: "wap/home?version=1.0.2&type=5",
	method: "get"
})
export const hotSearch = () => request({
	url: "search/hotSearch",
	method: "get"
})
export const ProductContent = (id) => request({
	url: `wap/productDetail/${id}`,
	method: "get"
})
export const GoodsList = (data) => request({
	url: 'search',
	method: "post",
	data: data
})
