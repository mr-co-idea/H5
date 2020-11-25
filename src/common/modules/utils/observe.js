function observer(data) {
	data.$dep !== undefined ? data.$dep++ : data.__proto__['$dep'] = 0;
	if (data.$dep === 0) {
		data.__proto__['$key'] = "_WATCH_OBJ";
		data.__proto__['$actions'] = { _WATCH_OBJ: [] };
		data.__proto__["_update"] = function () {
			this.$actions[this.$key].forEach(func => {
				func(this);
			})
		}
		data.__proto__["_notice"] = function (func, { key = null, initial = true, params = null } = {}) {
			key ? this.$key = key : null;
			if (this.$actions[this.$key].length === 0) {
				this.$actions[this.$key].push(func);
			}
			else if (this.$actions[this.$key].some(val => val !== func)) {
				this.$actions[this.$key].push(func);
			};
			initial ? func(this, params) : null;
		}
	}
	for (let key in data) {
		if (key !== '$key' && key !== '$actions' && key !== '$dep') {
			if (typeof data[key] === 'object') {
				observer(data[key]);
			} else {
				if (data.hasOwnProperty(key)) {
					data.$actions[key] = [];
					let val = data[key];
					Object.defineProperty(data, key, {
						enumerable: true,
						configurable: true,
						get: function () {
							return val
						},
						set: function (newVal) {
							if (newVal !== data[key]) {
								val = newVal;
								data._update(key);
							};
						}
					})
				}
			}
		}
	};

};

export {
	observer
}