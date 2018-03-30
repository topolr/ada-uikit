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
    }
};

export default util;