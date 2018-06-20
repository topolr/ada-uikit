import {Service, action, post, get} from "adajs";

class InputeService extends Service {
	defaultData() {
		return {
			name: "",
			label: "",
			value: "",
			desc:"",
			required: true,
			enable: true,
			error: false,
			url: "",
			parameterName: "id",
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
	check(current, value) {
		return post(current.url, {[current.parameterName]: value}).then(info => {
			if (info.code === "0") {
				current.error = true;
				current.errorInfo = `${current.parameterName} is not unique`;
			} else {
				current.error = false;
				current.errorInfo = "";
			}
			return current;
		})
	}
}

export default InputeService;