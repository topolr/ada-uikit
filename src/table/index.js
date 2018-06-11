import {View, view} from "adajs";
import SimpleService from "./states/simple";

@view({
	className: "simpletable",
	template: "./template/simple.html",
	style: "./style/simple.scss",
	dataset: {
		service: SimpleService
	}
})
class SimpleTable extends View {
}

export default SimpleTable;