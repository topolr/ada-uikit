import {view, binder, handler, BondViewGroup, View} from "adajs";
import MessageboxService from "./dataset";

@view({
	className: "messagebox",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: MessageboxService
	}
})
class Messagebox extends BondViewGroup {
	oncreated() {
		setTimeout(() => {
			this.getElement().classList.add(this.getThisClassName("in"));
		}, 100);
	}

	@binder("action")
	action({item}) {
		this[item.action] && this[item.action](item);
	}

	@handler("close")
	close() {
		this.getElement().classList.remove(this.getThisClassName("in"));
		setTimeout(() => {
			this.getParent() && this.getParent().removeChild(this);
		}, 400);
	}
}

export default Messagebox;