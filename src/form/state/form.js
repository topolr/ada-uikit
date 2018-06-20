import {Service} from "adajs";

class FormService extends Service {
	defaultData() {
		return {
			fields: [
				{type: null, name: "", option: {}}
			],
			name: ""
		}
	}

	onupdate(current, info) {
		current.fields = info.fields;
		current.name = info.name || "";
		return current;
	}
}

export default FormService;