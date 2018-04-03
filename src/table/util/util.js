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
            head: {
                left: [],
                middle: [],
                right: []
            },
            rows: {
                left: [],
                middle: [],
                right: []
            }
        };
        if (option.checkbox && option.checkbox.display) {
            option.checkbox.type = "checkbox";
            result.head.left.push(option.checkbox);
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
        if (option.tools && option.tools.display) {
            option.tools.type = "tools";
            result.head.right.push(option.tools);
        }
        data.forEach(item => {
            if (option.checkbox && option.checkbox.display) {
                option.checkbox.checked = false;
                result.rows.left.push(option.checkbox);
            }
            let k = [];
            option.rows.forEach(row => {
                if (row.append === "left") {
                    result.rows.left.push({
                        value: item[row.key],
                        width: row.width,
                        align: row.align,
                        type: "text"
                    });
                }
                if (row.append === "middle") {
                    k.push({
                        value: item[row.key],
                        width: row.width,
                        align: row.align
                    });
                }
                if (row.append === "right") {
                    result.rows.middle.push({
                        value: item[row.key],
                        width: row.width,
                        align: row.align,
                        type: "text"
                    });
                }
            });
            result.rows.middle.push(k);
            if (option.tools && option.tools.display) {
                result.rows.right.push(option.tools);
            }
        });
        result.widths = {
            left: result.head.left.reduce((a, b) => a + b.width, 0),
            middle: result.head.middle.reduce((a, b) => a + b.width, 0),
            right: result.head.right.reduce((a, b) => a + b.width, 0)
        };
        console.log(result)
        return result;
    }
};

export default util;