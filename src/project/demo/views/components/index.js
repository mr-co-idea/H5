import createPlugins from '@common/components/index.cpt'

const commonPlugins = createPlugins('cpt-form', 'demo');

const plugins = (Vue) => {
	Vue.component('cpt', import('./cpt'));
}

export {
	commonPlugins,
	plugins
}