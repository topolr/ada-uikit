import {root, StaticViewGroup} from "adajs";
import Form from "./../form";
import Input from "./../form/input";
import Unique from "./../form/unique";

@root()
class Root extends StaticViewGroup {
	oncreated() {
		this.addChild(Form, {
			parameter: {
				fields: [
					{type: Input, option: {label: "text", value: "test", name: "aa"}},
					{type: Input, option: {label: "text", value: "test2", name: "bb"}},
					{type: Unique, option: {label: "unique", value: "test3", name: "cc", url: "/mock/unique"}}
				]
			}
		});
	}
}

export default Root;