import {Service, action} from "adajs";

class InputeService extends Service {
	defaultData() {
		return {
			name: "",
			label: "",
			type: "text",
			value: "",
			desc: "",
			max: 1000,
			min: 1,
			required: false,
			reg: "",
			enable: true,
			error: false,
			errorInfo: ""
		}
	}

	onupdate(current, info) {
		Object.assign(current, info);
		return current;
	}

	@action("enable")
	enable(current, enable) {
		current.enable = enable;
		return current;
	}

	@action("setvalue")
	setValue(current, value) {
		current.value = value;
		return current;
	}

	@action("check")
	check(current) {
		let value = current.value;
		if (current.required) {
			if (value.length >= current.min && value.length <= current.max) {
				let reg = new RegExp(current.reg);
				if (reg.test(value)) {
					current.error = false;
					current.errorInfo = "";
				} else {
					current.error = true;
					current.errorInfo = "reg error";
				}
			} else {
				current.error = true;
				current.errorInfo = `value length must >= ${current.min} && <= ${current.max}`;
			}
		} else {
			current.error = false;
			current.errorInfo = "";
		}
		return current;
	}
}

export default InputeService;