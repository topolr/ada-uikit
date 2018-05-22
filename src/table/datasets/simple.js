import {action, Service} from "adajs";
import util from "./../util/util";

class SimpleService extends Service {
	defaultData() {
		return {
			option: {
				rows: [
					{key: "", name: "", width: 120, align: "center"}
				]
			},
			head: [],
			rows: [],
		}
	}

	update(current, data) {
		let {head, rows} = util.simple(data.data, data.option);
		current.head = head;
		current.rows = rows;
		current.option = data.option;
		return current;
	}

	@action("set")
	set(current, data) {
		let {head, rows} = util.simple(data, current.option);
		current.head = head;
		current.rows = rows;
		return current;
	}
}

export default SimpleService;