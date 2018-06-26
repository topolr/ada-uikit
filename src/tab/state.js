import {Service, action, View, ViewConnector} from "adajs";

class TabService extends Service {
	defaultData() {
		return {
			tabs: [
				{title: "tab", content: "tab", option: {}, active: true, type: "text"}
			]
		};
	}

	onupdate(current, data) {
		current.tabs = data.tabs.slice();
		current.tabs.forEach(tab => {
			if (!tab.type) {
				tab.type = "text";
			}
		});
		current.tabs[0] = Object.assign({}, current.tabs[0]);
		current.tabs[0].active = true;
		return current;
	}

	@action("toggle")
	toggle(current, item) {
		current.tabs.forEach(_item => {
			if (_item.title === item.title) {
				_item.active = true;
			} else {
				_item.active = false;
			}
		});
		return current;
	}
}

export default TabService;
