import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rootVal: ''
	},
	getters: {
		getRootVal(state) {
			return state.rootVal;
		}
	},
	mutations: {
		changeRootVal(state, payload) {
			state.rootVal = payload;
		}
	},
	actions: {},
	modules: {
		loginStore: import('./loginStore')
	},
	strict: true
})