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
    select(current, {left, right}) {
        if (left.selectDates.length === 1) {
            current.hover.start = left.selectDates[0];
            current.selectDates = [left.selectDates[0]];
        }
        if (right.selectDates.length === 1) {
            current.hover.start = right.selectDates[0];
            current.selectDates = [right.selectDates[0]];
        }
        if (left.selectDates.length > 1) {
            current.hover.start = null;
            current.hover.end = null;
            current.selectDates = left.selectDates;
        }
        if (right.selectDates.length > 1) {
            current.hover.start = null;
            current.hover.end = null;
            current.selectDates = right.selectDates;
        }
        return current;
    }
}

export default RangeGroupService;