import {view, binder, View} from "adajs";
import TreeService from "./datasets/simple";

@view({
	className: "simpletree",
	template: "./template/simple.html",
	style: "./style/simple.scss",
	dataset: {
		service: TreeService
	}
})
class SimpleTree extends View {
	@binder("toggle")
	toggle({item}) {
		this.getDataSet().commit("toggle", item);
	}

	@binder("active")
	active({item}) {
		this.getDataSet().commit("active", item);
	}
}


export default SimpleTree;