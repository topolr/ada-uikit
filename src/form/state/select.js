import {Service, action} from "adajs";

class SelectService extends Service {
	defaultData() {
		return {
			list: [],
			value: {}
		}
	}

	onupdate(current, info) {
		Object.assign(current, info);
		current.value = current.list[0];
		return current;
	}

	@action("select")
	select(current, item) {
		current.list.forEach(_item => {
			if (_item.value === item.value) {
				_item.active = true;
				current.value = _item;
			} else {
				_item.active = false;
			}
		});
		return current;
	}
}

export default SelectService;