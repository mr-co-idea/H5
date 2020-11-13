import cpt_form from './cpt_form/cpt-form';
import cpt_demo from './cpt_demo/cpt-demo.vue';
import cpt_demojsx from './cpt_demo/cpt-demo.jsx';
import cpt_demotsx_one from './cpt_demo/cpt-demo1.tsx';
import cpt_demotsx_two from './cpt_demo/cpt-demo2.tsx';

const map = new Map([
	["cpt-form", cpt_form],
	["cpt-demo", cpt_demo],
	["cpt-demo-jsx", cpt_demojsx],
	["cpt-demotsx-one", cpt_demotsx_one],
	["cpt-demotsx-two", cpt_demotsx_two],
])

const createPlugins = (...cptName) => {

	function plugins(Vue) {
		for (let item of cptName) {
			/^cpt-/.test(item) ? item : (item = 'cpt-' + item);
			Vue.component(item, map.get(item))
		}
	};

	return plugins;
}

export default createPlugins
