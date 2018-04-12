import {closeIcon} from "../icons/icon";

const util = {
    simple(data, option) {
        let head = option.rows.map(op => {
            return {name: op.name, width: op.width, align: op.align};
        });
        let rows = data.map(item => {
            let r = [];
            option.rows.forEach(row => {
                r.push({
                    value: item[row.key],
                    width: row.width,
                    align: row.align
                });
            });
            return r;
        });
        return {head, rows};
    },
    mix(data, option) {
        let result = {
            head: {left: [], middle: [], right: []},
            rows: {left: [], middle: [], right: []}
        };
        if (option.checkbox && option.checkbox.display) {
            let _checkbox = Object.assign({type: "checkbox", checked: false}, option.checkbox);
            result.head.left.push(_checkbox);
        }
        option.rows.forEach(op => {
            if (op.append === 'left') {
                result.head.left.push({type: "text", name: op.name, width: op.width, align: op.align});
            }
            if (op.append === 'middle') {
                result.head.middle.push({name: op.name, width: op.width, align: op.align});
            }
            if (op.append === 'right') {
                result.head.right.push({type: "text", name: op.name, width: op.width, align: op.align});
            }
        });
        let actionHead = {
            display: true,
            width: 0,
            align: "center",
            name: "action",
            icon: closeIcon,
            type: "action"
        };
        option.actions.forEach(action => {
            if (action.display === true) {
                actionHead.display = true;
                actionHead.width = actionHead.width + action.width;
                action.type = "action";
            }
        });
        if (actionHead.display) {
            result.head.right.push(actionHead);
        }
        data.forEach(item => {
            if (option.checkbox && option.checkbox.display) {
                let _checkbox = Object.assign({type: "checkbox", checked: false}, option.checkbox);
                result.rows.left.push(_checkbox);
            }
            let k = [];
            option.rows.forEach(row => {
                if (row.append === "left") {
                    result.rows.left.push({
                        value: item[row.key],
                        width: row.width,
                        align: row.align,
                        type: "text",
                        key:row.key
                    });
                }
                if (row.append === "middle") {
                    k.push({
                        value: item[row.key],
                        width: row.width,
                        align: row.align,
                        type: "text",
                        key:row.key
                    });
                }
                if (row.append === "right") {
                    result.rows.middle.push({
                        value: item[row.key],
                        width: row.width,
                        align: row.align,
                        type: "text",
                        key:row.key
                    });
                }
            });
            result.rows.middle.push(k);
            let _actions = [];
            option.actions.forEach(action => {
                if (action.display === true) {
                    _actions.push(Object.assign({}, action));
                }
            });
            result.rows.right.push({
                type: "action",
                actions: _actions
            });
        });
        result.widths = {
            left: result.head.left.reduce((a, b) => a + b.width, 0),
            middle: result.head.middle.reduce((a, b) => a + b.width, 0),
            right: result.head.right.reduce((a, b) => a + b.width, 0)
        };
        return result;
    }
};

export default util;