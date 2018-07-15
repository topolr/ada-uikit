import {Service} from "adajs";

class SubmenuService extends Service {
	defaultData() {
		return {
			info: []
		};
	}

	onupdate(current, data) {
		current.info = data.info;
		return current;
	}
}

export default SubmenuService;