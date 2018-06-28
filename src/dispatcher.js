import {Dispatcher} from "adajs";

class EventDispatcher extends Dispatcher {
	constructor() {
		super();
		window.document.body.addEventListener("scroll", e => {
			this.dispatch("scroll", e);
		});
		window.document.body.addEventListener("click", e => {
			this.dispatch("click", e);
		});
	}
}

const eventDispatcher = new EventDispatcher();

export default eventDispatcher;