import {action, Service} from "adajs";
import util from "./util";

class RangeGroupService extends Service {
    defaultData() {
        return {
            hover: {start: null, end: null},
            selectDates: [],
            left: new Date(),
            right: util.getNextMonthDate(new Date())
        }
    }

    @action("setrange")
    setRange(current, hover) {
        current.hover = hover;
        return current;
    }

    @action("setdate")
    setDate(current, data) {
        current.left = data[0];
        current.right = data[1];
        return current;
    }

    @action("select")
    select(current, {left, right, target}) {
        let ls = left.selectDates, rs = right.selectDates;
        if (target === "left") {
            current.selectDates = ls;
            current.hover.start = ls[0];
            if (ls.length === 2) {
                current.hover.start = null;
            }
        } else {
            current.selectDates = rs;
            current.hover.start = rs[0];
            if (rs.length === 2) {
                current.hover.start = null;
            }
        }
        return current;
    }
}

export default RangeGroupService;