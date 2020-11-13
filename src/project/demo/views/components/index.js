import createPlugins from '@common/components/index.cpt'

const commonPlugins = createPlugins('cpt-one', 'two');

import cpt from './cpt'

const plugins = (Vue) => {
	Vue.component('cpt', cpt);
}

export {
	commonPlugins,
	plugins
}