import {action} from "adajs";
import SimpleService from "./simple";
import util from "./util";
import checkBoxIcon from "./../icons/check-box.icon";
import checkBoxOutline from "./../icons/check-box-outline-blank.icon";
import triangleRight from "./../icons/triangle-right.icon";

class SelectService extends SimpleService {

	defaultData() {
		return {
			list: [],
			icons: {triangleRight, checkBoxIcon, checkBoxOutline}
		};
	}

	onupdate(current, list) {
		current.list = list;
		return current;
	}

	@action("toggleselect")
	toggleSelect(current, item) {
		util.selectCascade(current.list, item);
		return current;
	}
}

export default SelectService;