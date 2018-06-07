import {Service, action} from "adajs";
import util from "./util";
import triangleRight from "./../icons/triangle-right.icon";

class TreeService extends Service {
	defaultData() {
		return {
			list: [],
			icons: {triangleRight}
		};
	}

	onupdate(current, list) {
		util.initAll(list);
		current.list = list;
		return current;
	}

	@action("toggle")
	toggle(current, item) {
		console.log("====>", item._id)
		let _item = util.findItem(current, item);
		console.log("---->", _item._id)
		_item._opened = !_item._opened;
		return current;
	}

	@action("active")
	active(current, item) {
		util.unactiveAll(current.list);
		item._actived = true;
		return current;
	}
}

export default TreeService;