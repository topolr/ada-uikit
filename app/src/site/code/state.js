import {Service} from "adajs";

class CodeService extends Service {
	defaultData() {
		return {
			code: "",
			type: "javascript"
		};
	}

	onupdate(current, data) {
		current.code = data.code;
		current.type = data.type;
		return current;
	}
}

export default CodeService;