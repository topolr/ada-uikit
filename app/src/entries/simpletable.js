import {StaticViewGroup, view} from "adajs";
import SimpleTable from "ada-uikit/src/table";
import Tab from "./../site/tab";
import Code from "./../site/code";

const code = `{
	option: {
		rows: [
			{name: "AA", key: "aa", width: 120, align: "center"},
			{name: "BB", key: "bb", width: 120, align: "center"},
			{name: "CC", key: "cc", width: 120, align: "center"}
		],
		tools: [
			{name: "remove", action: "remove"},
			{name: "edit", action: "edit"}
		]
	},
	data: [
		{aa: "aa1", bb: "bb1", cc: "cc1"},
		{aa: "aa2", bb: "bb2", cc: "cc2"},
		{aa: "aa3", bb: "bb3", cc: "cc3"},
		{aa: "aa4", bb: "bb4", cc: "cc4"},
		{aa: "aa5", bb: "bb5", cc: "cc5"},
		{aa: "aa6", bb: "bb6", cc: "cc6"}
	]
}`;

@view({
	className: "ada-demo-container"
})
class Table extends StaticViewGroup {
	oncreated() {
		this.addChild(Tab, {
			parameter: {
				tabs: [
					{
						title: "Demo", content: SimpleTable, option: {
							option: {
								rows: [
									{name: "AA", key: "aa", width: 120, align: "center"},
									{name: "BB", key: "bb", width: 120, align: "center"},
									{name: "CC", key: "cc", width: 120, align: "center"}
								],
								tools: [
									{name: "remove", action: "remove"},
									{name: "edit", action: "edit"}
								]
							},
							data: [
								{aa: "aa1", bb: "bb1", cc: "cc1"},
								{aa: "aa2", bb: "bb2", cc: "cc2"},
								{aa: "aa3", bb: "bb3", cc: "cc3"},
								{aa: "aa4", bb: "bb4", cc: "cc4"},
								{aa: "aa5", bb: "bb5", cc: "cc5"},
								{aa: "aa6", bb: "bb6", cc: "cc6"}
							]
						}, active: true, type: "module"
					},
					{title: "Code", content: Code, option: {type: "javascript", code}, active: false, type: "module"}
				]
			},
			container: this.getElement()
		});
	}
}

export default Table;