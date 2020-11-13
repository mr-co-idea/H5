export default {
	namespaced: true,
	state: {
		content: ''
	},
	getters: {
		getLoginContent(state, getters, rootVal, rootGetters) {
			return state.content
		}
	},
	mutations: {
		changeLoginContent(state, payload) {
			state.content = payload;
		}
	},
	actions: {}
}