import {view, View} from "adajs";
import CodeService from "./state.js";
import prism from "./../../lib/prism";
import "./../../lib/prism.css";

@view({
	className: "code",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: CodeService
	}
})
class Code extends View {
	onready() {
		prism.highlightAllUnder(this.getElement());
	}
}

export default Code;