import {Service, action, util as tool} from "adajs";
import util from "../util/util";
import {
	addIcon,
	autoRenewIcon,
	checkBoxIcon,
	checkBoxOutlineBlankIcon,
	closeIcon,
	moreVertIcon,
	modeEditIcon
} from "./../icons/icon";

class MixService extends Service {
	defaultData() {
		return {
			option: {
				rows: []
			},
			head: {
				left: [
					{key: "", name: "", width: 120, align: "center"}
				],
				middle: [],
				right: []
			},
			rows: {
				left: [],
				middle: [],
				right: []
			},
			actions: [
				{
					display: true,
					width: 40,
					align: "center",
					name: "remove",
					icon: closeIcon
				},
				{
					display: true,
					width: 40,
					align: "center",
					name: "edit",
					icon: modeEditIcon
				}
			],
			checkbox: {
				display: true,
				width: 40,
				align: "center",
				checkedIcon: checkBoxIcon,
				uncheckedIcon: checkBoxOutlineBlankIcon
			},
			widths: {left: 0, middle: 0, right: 0}
		}
	}

	onupdate(current, info) {
		current.option = info.option;
		tool.extend(current, util.mix(info.data, info.option));
		return current;
	}

	@action("toggle")
	toggle(current, row) {
		let index = current.rows.middle.indexOf(row);
		current.rows.left[index].checked = !current.rows.left[index].checked;
		current.rows.left[index]._active = !current.rows.left[index]._active;
		current.rows.right[index]._active = !current.rows.right[index]._active;
		row._active = !row._active;
		let k = current.rows.left.filter(item => item._active === false || item._active === undefined);
		if (k.length > 0) {
			let e = current.head.left.filter(item => item.type === "checkbox");
			if (e.length > 0) {
				e[0].checked = false;
			}
		} else {
			let e = current.head.left.filter(item => item.type === "checkbox");
			if (e.length > 0) {
				e[0].checked = true;
			}
		}
		return current;
	}

	@action("toggleAll")
	toggleAll(current) {
		let e = current.head.left.filter(item => item.type === "checkbox");
		if (e.length > 0) {
			e[0].checked = e[0].checked ? false : true;
			current.rows.left.forEach(item => {
				item.checked = e[0].checked;
				item._active = e[0].checked;
			});
			current.rows.middle.forEach(item => item._active = e[0].checked);
			current.rows.right.forEach(item => item._active = e[0].checked);
		}
		return current;
	}

	@compute("rowdata")
	getRowData(current, index) {
		let row = {};
		current.rows.middle[index].forEach(info => {
			row[info.key] = info.value;
		});
		return row;
	}
}

export default MixService;