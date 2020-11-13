const qs = require('qs');

const createRequest = (baseURL, req, res) => {

	const request = import('axios')({
		baseURL: baseURL ? baseURL : '',
		timeout: 60000,
	});

	req ? req(request) : request.interceptors.request.use(config => {
		if (config.method === 'post') {
			config.data = qs.stringify(config.data);
		};
		return config
	}, error => {
		return Promise.reject(error)
	});

	res ? res(request) : request.interceptors.response.use(response => response.data, error => {

		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					console.log('错误请求')
					break;
				case 401:
					console.log('未授权请重新登录')
					break;
				case 403:
					console.log('拒绝访问')
					break;
				case 404:
					console.log('请求错误，未找到该资源')
					break;
				case 405:
					console.log('请求方法未允许')
					break;
				case 408:
					console.log('请求超时')
					break;
				case 500:
					console.log('服务器出错')
					break;
				case 501:
					console.log('网络未实现')
					break;
				case 502:
					console.log('网络错误')
					break;
				case 503:
					console.log('服务不可用')
					break;
				case 504:
					console.log('网络超时')
					break;
				case 505:
					console.log('http版本不支持该请求')
					break;
				default:
					console.log(`链接出错${error.response.status}`)
					break;
			}
		}
		return Promise.reject(error.response)
	});

	return request
};

export default createRequest