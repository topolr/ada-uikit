import {Service, action} from "adajs";
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

    defaultOption() {
        return {
            rows: [],
            tools: {
                display: true,
                width: 40,
                icon: moreVertIcon,
                value: "tool",
                align: "center",
                items: [
                    {name: "remove", icon: closeIcon},
                    {name: "edit", icon: modeEditIcon}
                ]
            },
            checkbox: {
                display: true,
                width: 40,
                align: "center",
                checkedIcon: checkBoxIcon,
                uncheckedIcon: checkBoxOutlineBlankIcon
            }
        }
    }

    @action("set")
    set(current, data) {
        return util.mix(data, this.option);
    }

    @action("toggle")
    toggle(current, row) {
        let index = current.rows.middle.indexOf(row);
        current.rows.left[index].checked = current.rows.left[index].checked ? false : true;
        current.rows.left[index]._active = current.rows.left[index]._active ? false : true;
        current.rows.right[index]._active = current.rows.right[index]._active ? false : true;
        row._active = row._active ? false : true;
        let k = current.rows.left.filter(item => item._active === false);
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