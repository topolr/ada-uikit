import {Service, view, View, util} from "adajs";

@view()
class Text extends View {
	oncreated() {
		this.getElement().innerHTML = "this is content";
	}
}

class MessageboxService extends Service {
	defaultData() {
		return {
			title: "this is title",
			width: "360px",
			content: [
				{type: Text, option: {}}
			],
			btns: [
				{name: "close", action: "close"}
			]
		}
	}

	onupdate(current, info) {
		util.extend(current, info);
		return current;
	};
}

export default MessageboxService;