import {Service, util, action, get} from "adajs";

class ContentService extends Service {
	defaultData() {
		return {
			info: {},
			link: null,
			content: ""
		};
	}

	onupdate(current, data) {
		current.info = data.info;
		current.link = this.getLinkInfo(data.info);
		return current;
	}

	getLinkInfo(info) {
		let r = null;
		if (info.list) {
			let t = info.list.find(item => item.active);
			if (t) {
				if (t.list) {
					r = this.getLinkInfo(t);
				} else {
					r = t;
				}
			}
		}
		return r;
	}

	@action("get")
	get(current) {
		return get(current.link.link).then(content => {
			current.content = content;
			return current;
		});
	}
}

export default ContentService;