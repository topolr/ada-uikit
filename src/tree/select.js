import {view, binder} from "adajs";
import SimpleTree from "./simple";
import SelectService from "./datasets/select";

@view({
	className: "selectree",
	template: "./template/select.html",
	style: "./style/select.scss",
	dataset: {
		service: SelectService
	}
})
class SelectTree extends SimpleTree {
	@binder("toggleselect")
	toggleSelect({item}) {
		this.getDataSet().commit("toggleselect", item);
	}
}

export default SelectTree;