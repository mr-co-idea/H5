class OperateTitle {
	constructor(config) {
		this.OperateTitleConfig = config;
		this.index = 1;
		this.stepCheck = new Map();
		this.dispose();
	}

	get config() {
		return this.OperateTitleConfig;
	}
	set config(params) {
		this.OperateTitleConfig = params;
	}

	//数据处理
	dispose() {
		let _index = 1;
		for (let [key, val] of this.OperateTitleConfig) {
			if (key.indexOf('operateTitle') != -1) {
				_index = key.split('-')[1];
				_index == 1 ? val['location'] = 'start' : null;
				this.stepCheck.get(_index) ? null : this.stepCheck.set(_index, {});
				val['stepCheck'] = this.stepCheck.get(_index);
			};
			val['show'] = _index;
			const obj = {};
			obj[key] = key;
			if (val.required) {
				this.stepCheck.get(_index) ? Object.assign(this.stepCheck.get(_index), obj) : this.stepCheck.set(_index, obj);
			};
		};
		_index > 1 ? this.OperateTitleConfig.get('operateTitle-' + _index)['location'] = 'end' : null;
	};
}

export default OperateTitle;