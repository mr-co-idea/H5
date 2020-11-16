import Rules from '../class/rules.class';

//公共校验规则
const map = new Map();

//非空校验
map.set('non-empty', function (val) {
	return val === '' || val === undefined || val === null ? false : true;
});

//姓名校验
map.set('name', function (val) {
	return /^[\u4E00-\u9FA5]{2,4}$/.test(val);
});


//其他校验...

//声明校验规则
const rules = new Rules(map);

export default rules;