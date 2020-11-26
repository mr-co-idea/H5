import { observer } from '@common/modules/utils/observe.js'
import Vue from 'vue';
class CptForm {
	constructor(config) {
		this.formConfig = config || new Map();
		this.allCheckFunc = {};
		this.dispose();
	}

	get config() {
		return this.formConfig
	}
	set config(params) {
		this.formConfig = params | new Map();
	}
	get check() {
		return this.allCheckFunc;
	}

	dispose() {
		this.formConfig.forEach((val, key) => {
			this.disposeRequire(val, key);
			const that = this;
			try {
				let _required = val['required'];
				Object.defineProperty(val, 'required', {
					enumerable: true,
					configurable: true,
					get: function () {
						return _required
					},
					set: function (newVal) {
						if (newVal !== _required) {
							_required = newVal;
							that.disposeRequire(val, key);
						};
					}
				})
				Vue.observable(val);
			} catch (e) {
				console.warn(e)
			}
		})
	}

	disposeRequire(itemConfig, key) {
		if (itemConfig.required) {
			itemConfig['rules'] = itemConfig.rules || {};
			itemConfig.rules["non-empty"] = true;
			itemConfig["checkHook"] = (val) => (this.allCheckFunc[key] = val);//单元校验回调钩子
		} else if (itemConfig.rules) {
			if (itemConfig.rules['non-empty']) {
				delete itemConfig.rules['non-empty']
			}
			itemConfig["checkHook"] = (val) => (this.allCheckFunc[key] = val);
		}
	}
}

export default CptForm