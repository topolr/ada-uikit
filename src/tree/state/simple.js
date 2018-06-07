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

	update(current, list) {
		current.list = list;
		return current;
	}

	@action("set")
	set(old, data) {
		util.initAll(data);
		return {
			list: data
		};
	}

	@action("toggle")
	toggle(current, item) {
		console.log(item)
		item._opened = item._opened ? false : true;
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