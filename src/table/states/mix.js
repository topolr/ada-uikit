import {action, Service, util as tool} from "adajs";
import util from "../util/util";
import {checkBoxIcon, checkBoxOutlineBlankIcon, closeIcon} from "../icons";

class MixService extends Service {
    defaultData() {
        return {
            option: {
                rows: [],
                actions: [
                    {
                        display: true,
                        width: 40,
                        align: "center",
                        name: "remove",
                        icon: closeIcon
                    }
                ],
                checkbox: {
                    display: true,
                    width: 40,
                    align: "center",
                    checkedIcon: checkBoxIcon,
                    uncheckedIcon: checkBoxOutlineBlankIcon
                },
                unique: "aa"
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
        let target = row.find(item => item.key === current.option.unique);
        let index = current.rows.middle.findIndex(item => {
            return item.find(_item => _item.key === current.option.unique && _item.value === target.value) !== undefined;
        });
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
}

export default MixService;