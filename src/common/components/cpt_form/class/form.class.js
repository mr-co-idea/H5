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
		})
	}

	disposeRequire(itemConfig, key) {
		if (itemConfig.required) {
			itemConfig['rules'] = itemConfig.rules || {};
			item.rules["non-empty"] = true;
			itemConfig["checkHook"] = (val) => (this.allCheckFunc[key] = val);//单元校验回调钩子
		} else if (itemConfig.rules) {
			itemConfig["checkHook"] = (val) => (this.allCheckFunc[key] = val);
		}
	}
}

export default CptForm