import {view} from "adajs";
import UniqueService from "./state/unique";
import Input from "./input";

@view({
	className: "unique",
	template: "./template/input.html",
	style: "./style/input.scss",
	dataset: {
		service: UniqueService
	}
})
class Unique extends Input {
	check() {
		return new Promise((resolve, reject) => {
			return this.commit("check", this.getValue()).then(a => {
				if (a) {
					resolve();
				} else {
					reject();
				}
			});
		});
	}
}

export default Unique;
