import {view, BondViewGroup} from "adajs";
import FormService from "./state/form";

@view({
	className: "form",
	template: "./template/form.html",
	style: "./style/form.scss",
	dataset: {
		service: FormService
	}
})
class Form extends BondViewGroup {
	getFieldByName(name) {
		return this.getChildByName(name);
	}

	check() {
		return this.getChildren().reduce((a, child) => {
			return a.then(() => {
				if (child.check) {
					let result = child.check();
					if (result.then) {
						return result;
					} else {
						if (result === true) {
							return Promise.resolve();
						} else {
							return Promise.reject();
						}
					}
				} else {
					return Promise.resolve();
				}
			});
		}, Promise.resolve());
	}

	enable(value) {
		this.getChildren().forEach(child => child.enable && child.enable(value));
	}

	setValue(info) {
		Reflect.ownKeys(info).forEach(key => {
			let child = this.getFieldByName(key);
			if (child) {
				child.setValue && child.setValue(info[key]);
			}
		});
	}

	getValue() {
		let result = {};
		return this.getChildren().reduce((a, child) => {
			return a.then(() => {
				if (child.getValue) {
					let name = child.getName(), value = child.getValue();
					if (value.then) {
						return value.then(_value => {
							result[name] = _value;
						});
					} else {
						result[name] = value;
						return Promise.resolve()
					}
				} else {
					return Promise.resolve();
				}
			});
		}, Promise.resolve()).then(() => result);
	}

	getName() {
		return this.getCurrentState().name;
	}
}

export default Form;