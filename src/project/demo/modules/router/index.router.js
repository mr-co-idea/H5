import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@views/index.vue'

Vue.use(VueRouter)

const routes = [
	{
		name: 'index',
		path: '/',
		component: index,
		meta: {
			title: 'index',
			requireAuth: true,
			keepAlive: true
		}
	}
];

const router = new VueRouter({
	routes
})

export default router