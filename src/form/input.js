import {view, View} from "adajs";
import InputService from "./state/input";

@view({
	className: "input",
	template: "./template/input.html",
	style: "./style/input.scss",
	dataset: {
		service: InputService
	}
})
class Input extends View {
	enable(value) {
		this.commit("enable", value || false);
	}

	getValue() {
		return this.finder("input").getElement().value;
	}

	setValue(value) {
		this.commit("setvalue", value);
	}

	check() {
		this.commit("check");
		return this.getCurrentState().checked;
	}

	getName() {
		return this.getCurrentState().name;
	}
}

export default Input;