import {view, ViewGroup, binder} from "adajs";
import TabService from "./state.js";

@view({
	className: "tab",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: TabService
	}
})
class Tab extends ViewGroup {

	@binder("toggle")
	toggle({tab}) {
		this.commit("toggle", tab);
	}
}

export default Tab;
