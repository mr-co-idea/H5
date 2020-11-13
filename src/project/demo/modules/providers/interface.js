import request from './http-service'

export function test(params) {
	return request({
		url: '/test',
		method: 'POST',
		data: params
	})
};