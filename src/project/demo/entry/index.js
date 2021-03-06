import Vue from 'vue';
import router from '@modules/router/index.router';
import store from '@modules/store/index.store'

import App from '@views/app.vue'

import 'vue-tsx-support/enable-check'//(可选)
import 'amfe-flexible';
import 'vant/lib/icon/local.css'

import { plugins, commonPlugins } from '@views/components/index'

Vue.use(commonPlugins)
Vue.use(plugins)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});