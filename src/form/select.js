import {view, View, binder} from "adajs";
import SelectService from "./state/select";

@view({
	className: "select",
	template: "./template/select.html",
	style: "./style/select.scss",
	dataset: {
		service: SelectService
	}
})
class Select extends View {
	@binder("select")
	select({item}) {
		this.commit("select", item);
	}
}

export default Select;