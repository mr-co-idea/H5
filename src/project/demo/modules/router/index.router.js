import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		name: 'index',
		path: '/',
		component: ()=>import('@views/index.vue'),
		meta: {
			title: 'index',
			requireAuth: true,
			keepAlive: true
		}
	}, {
		name: 'test',
		path: '/test',
		component: () => import('@views/test.vue')
	}
];

const router = new VueRouter({
	routes
})

export default router