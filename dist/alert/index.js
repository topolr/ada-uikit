import {view, binder, handler, View} from "adajs";
import AlertService from "./dataset";

@view({
	className: "alert",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: AlertService
	}
})
class Alert extends View {
	oncreated() {
		setTimeout(() => {
			this.getElement().classList.add(this.getThisClassName("in"));
		}, 100);
	}

	@binder("action")
	action({item}) {
		this.dispatchEvent(item.action, item);
	}

	@handler("close")
	close() {
		this.getElement().classList.remove(this.getThisClassName("in"));
		setTimeout(() => {
			this.getParent() && this.getParent().removeChild(this);
		}, 400);
	}
}

export default Alert;