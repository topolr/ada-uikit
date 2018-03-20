import {Service, action} from "adajs";
import util from "./util";

class PannelService extends Service {
    defaultData() {
        return util.getFinalPannelDates(new Date());
    }

    @action("prevmonth")
    prevMonth(current) {
        let year = current.current.year, month = current.current.month;
        if (month - 1 <= 0) {
            month = 1;
            year = year - 1;
        } else {
            month = month - 1;
        }
        return util.getFinalPannelDates(new Date(`${year}/${month}/1 0:0:0`), current.selectDates, current.range);
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
        console.log(year, month);
        return util.getFinalPannelDates(new Date(`${year}/${month}/1 0:0:0`), current.selectDates, current.range);
    }

    @action("gotodate")
    gotoDate(current, date) {
        return util.getFinalPannelDates(date, current.selectDates, current.range);
    }

    @action("select")
    select(current, date) {
        current.selectDates = [date];
        util.setSelected(current.current.year, current.current.month, current.days, current.selectDates);
        return current;
    }

    @action("setrange")
    setRange(current, range) {
        current.range = range;
        util.setRange(current.current.year, current.current.month, current.days, current.range);
        return current;
    }
}

export default PannelService;