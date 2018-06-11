import {binder, dataset, view, ViewGroup, StaticViewGroup} from "adajs";
import MixTable from "./mix";
import FlipService from "./states/flip";

class AppendTable extends StaticViewGroup {
	oncreated() {
		this.tableDataSet.setOption(() => this.option);
		this.addChild(MixTable, {
			container: this.getElement()
		});
	}
}

@view({
	className: "filptable",
	template: "./template/fliptable.html",
	style: "./style/fliptable.scss",
	dataset: {
		service: FlipService
	}
})
class Table extends ViewGroup {

	onready() {
		this.gotoPage(1);
	}

	gotoPage(page) {
		this.getDataSet().commit("goto", page);
	}

	tags() {
		return {
			thistable: AppendTable
		}
	}

	@binder("nextpage")
	nextPage() {
	}

	@binder("prevpage")
	prevPage() {
	}

	@binder("goto")
	goto({page}) {
		this.gotoPage(page.num);
	}
}

export default Table;