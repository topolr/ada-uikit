import {action, compute, Service} from "adajs";
import menu from "./../../menu.json";

function getLinks(list) {
	let r = [];
	list.forEach(item => {
		if (item.link) {
			r.push(item);
		}
		if (item.list) {
			r = r.concat(getLinks(item.list));
		}
	});
	return r;
}

class ContainerService extends Service {
	defaultData() {
		menu[0].active = true;
		menu[0].list[0].active = true;
		menu[0].list[0].list[0].active = true;
		return {
			menu,
			current: menu[0]
		};
	}

	onupdate(current, data) {
		return current;
	}

	resetItem(list) {
		list.forEach(item => {
			item.active = false;
			if (item.list) {
				this.resetItem(item.list);
			}
		});
	}

	activeLink(menu, item) {
		let paths = [];
		let findLink = (list) => {
			let t = list.some(_item => {
				paths.push(_item);
				if (_item.name !== item.name) {
					if (_item.list) {
						return findLink(_item.list);
					}
					paths.pop();
					return false;
				} else {
					return true;
				}
			});
			if (!t) {
				paths.pop();
			}
			return t;
		};
		findLink(menu);
		return paths;
	}

	@compute("links")
	getLinks(current) {
		return getLinks(current.menu);
	}

	@action("open")
	open(current, item) {
		let target = current.menu.find(_item => _item.name === item.name);
		if (target) {
			this.resetItem(current.menu);
			target.active = true;
			target.list[0].active = true;
			target.list[0].list[0].active = true;
			current.current = target;
		}
		return current;
	}

	@action("flip")
	flip(current, item) {
		this.resetItem(current.menu);
		let paths = this.activeLink(current.menu, item);
		paths.forEach(item => item.active = true);
		current.current = paths[0];
		return current;
	}
}

export default ContainerService;
