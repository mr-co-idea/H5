import Vue from 'vue';
import router from '@modules/router/index.router';
import store from '@modules/store/index.store'

import App from '@views/app.vue'

import 'vant/lib/icon/local.css'
import 'vue-tsx-support/enable-check'//(可选)
import 'amfe-flexible';

import { plugins, commonPlugins } from '@views/components/index'

Vue.use(commonPlugins)
Vue.use(plugins)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});