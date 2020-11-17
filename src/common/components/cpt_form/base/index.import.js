import Vue from 'vue';
import { Icon, Form, Field, Picker, Popup, DatetimePicker, Uploader, Toast, Checkbox, Button } from 'vant';

import cpt_input from './input';
import cpt_select from './select';
import cpt_load from './load'
import cpt_agree from './agree'

function importVant() {
	Vue.use(Icon)
		.use(Form)
		.use(Field)
		.use(Picker)
		.use(Popup)
		.use(DatetimePicker)
		.use(Uploader)
		.use(Toast)
		.use(Checkbox)
		.use(Button);
}

importVant();

export {
	cpt_input,
	cpt_select,
	cpt_load,
	cpt_agree
}