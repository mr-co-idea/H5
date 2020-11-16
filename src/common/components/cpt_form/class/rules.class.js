class Rules {
	constructor(baseRules) {
		this.baseRules = baseRules || new Map();
		this.rulesResult = {};
	};

	get rules() {
		return this.baseRules;
	}

	set rules(parmas) {
		this.baseRules = parmas;
	}

	use(...func) {
		for (let item of func) {
			if (typeof item === 'object') {
				for (let key of Object.keys(item)) {
					this.baseRules.set(key, item[key]);
				}
			}
			// else if (typeof item === 'function') {
			// 	this.baseRules.set(item.name, item)
			// }
			//弃用直接使用函数，原因，webpack打包后，函数名会发生变化
		}
	}

	/**
	 * 校验
	 * @param {Object} rules 
	 * @param {String | Number} val 
	 */
	async check(rules, val) {
		rules = rules || {};
		const keys = Object.keys(rules);
		let _state = true;
		let _info = '';

		for (let item of keys) {
			if (!rules.hasOwnProperty('non-empty') && val !== '' && val !== undefined && val !== null) {
				_state = this.baseRules.get(item)(val);
			} else if (rules.hasOwnProperty('non-empty')) {
				_state = this.baseRules.get(item)(val);
			}

			if (!_state) {
				info = item;
				return false;
			}
		}

		return {
			_info, _state
		}
	}
}

export default Rules