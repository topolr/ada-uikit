import {action, util as tool} from "adajs";
import PannelService from "./pannel";
import util from "./util";

class RangeService extends PannelService {
    onupdate(current, info) {
        console.log(info.date.getMonth());
        tool.extend(current, util.getFinalPannelDates(info.date, info.selectDates, undefined, info.hover));
        return current;
    }

    select(current, date) {
        if (current.selectDates.length === 0 || current.selectDates.length > 1) {
            current.selectDates = [date];
            current.hover.start = date;
            current.hover.end = null;
        } else {
            current.selectDates.push(date);
            current.hover.start = null;
            current.hover.end = null;
        }
        util.setHover(current.current.year, current.current.month, current.days, current.hover);
        util.setSelected(current.current.year, current.current.month, current.days, current.selectDates);
        return current;
    }

    @action("sethover")
    setHover(current, hover) {
        current.hover = hover;
        util.setHover(current.current.year, current.current.month, current.days, current.hover);
        return current;
    }

    @action("sethoverend")
    setHoverEnd(current, {day, type}) {
        if (current.hover.start) {
            let month = current.current.month, year = current.current.year;
            if (type === "next") {
                month = month + 1;
                if (month > 12) {
                    year = year + 1;
                    month = 1;
                }
            }
            if (type === "prev") {
                month = month - 1;
                if (month < 1) {
                    year = year - 1;
                    month = 12;
                }
            }
            current.hover.end = new Date(`${year}/${month}/${day} 0:0:0`);
            util.setHover(current.current.year, current.current.month, current.days, current.hover);
        }
        return current;
    }
}

export default RangeService;