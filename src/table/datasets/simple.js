import {action, Service} from "adajs";

class SimpleService extends Service {

    defaultOption() {
        return {
            rows: [
                {key: "", name: "", width: 120, align: "center"}
            ]
        }
    }

    defaultData() {
        return {
            head: [],
            rows: []
        }
    }

    @action("set")
    set(current, data) {
        let head = this.option.rows.map(op => {
            return {name: op.name, width: op.width, align: op.align};
        });
        let rows = data.map(item => {
            let r = [];
            this.option.rows.forEach(row => {
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
}

export default SimpleService;