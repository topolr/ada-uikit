import {action, Service, util as tool} from "adajs";
import util from "./util";

class PannelService extends Service {
    defaultData() {
        return util.getFinalPannelDates(new Date());
    }

    @action("prevmonth")
    prevMonth(current) {
        let year = current.current.year, month = current.current.month;
        if (month - 1 <= 0) {
            month = 12;
            year = year - 1;
        } else {
            month = month - 1;
        }
        return tool.extend(current, util.getFinalPannelDates(new Date(`${year}/${month}/1 0:0:0`), current.selectDates, current.offset, current.hover));
    }

    @action("nextmonth")
    nextMonth(current) {
        let year = current.current.year, month = current.current.month;
        if (month + 1 > 12) {
            month = 1;
            year = year + 1;
        } else {
            month = month + 1;
        }
        return tool.extend(current, util.getFinalPannelDates(new Date(`${year}/${month}/1 0:0:0`), current.selectDates, current.offset, current.hover));
    }

    @action("gotoyear")
    gotoYear(current, year) {
        return tool.extend(current, util.getFinalPannelDates(new Date(`${year}/${current.current.month}/1 0:0:0`), current.selectDates, current.offset, current.hover));
    }

    @action("gotomonth")
    gotoMonth(current, month) {
        return tool.extend(current, util.getFinalPannelDates(new Date(`${current.current.year}/${month}/1 0:0:0`), current.selectDates, current.offset, current.hover));
    }

    @action("gotodate")
    gotoDate(current, date) {
        return tool.extend(current, util.getFinalPannelDates(date, current.selectDates, current.offset, current.hover));
    }

    @action("today")
    today(current) {
        return tool.extend(current, util.getFinalPannelDates(current.now, current.selectDates, current.offset, current.hover));
    }

    @action("select")
    select(current, date) {
        current.selectDates = [date];
        util.setSelected(current.current.year, current.current.month, current.days, current.selectDates);
        return current;
    }

    @action("setoffset")
    setOffset(current, offset) {
        current.offset = offset;
        util.setOffset(current.current.year, current.current.month, current.days, current.offset);
        return current;
    }
}

export default PannelService;