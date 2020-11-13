import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
	{
		name: 'index',
		path: '/',
		component: import('@views/index'),
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