const util = {
    getDate(str) {
        return new Date(str.replace(/\-/g, "/"));
    },
    isLeap(y) {
        return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0);
    },
    getMonthDays(year, month) {
        return [31, (28 + (this.isLeap(year) ? 0 : 1)), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31][month - 1];
    },
    getPrevMonthDays(year, month) {
        let prev = month - 1;
        if (prev <= 0) {
            prev = 12;
            year = year - 1;
        }
        return this.getMonthDays(year, prev);
    },
    getNextMonthDays(year, month) {
        let next = month + 1;
        if (next > 12) {
            next = 1;
            year = year + 1;
        }
        return this.getMonthDays(year, next);
    },
    getPrevMonth(year, month) {
        if (month - 1 <= 0) {
            month = 12;
            year = year - 1;
        } else {
            month = month - 1;
        }
        return {year, month};
    },
    getNextMonth(year, month) {
        if (month + 1 > 12) {
            month = 1;
            year = year + 1;
        } else {
            month = month + 1;
        }
        return {year, month};
    },
    getQuarterStartMonth(nowMonth) {
        let quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    },
    getMonthStartDate(year, month) {
        return new Date(year, month, 1);
    },
    getMonthEndDate(year, month) {
        return new Date(year, month, this.getMonthDays(year, month));
    },
    getPannelDates(dateObject) {
        let year = dateObject.getFullYear(),
            month = dateObject.getMonth() + 1;
        let now = new Date(),
            now_year = now.getFullYear(),
            now_month = now.getMonth() + 1,
            now_day = now.getDate();
        let days = util.getMonthDays(year, month);
        let prevDays = util.getPrevMonthDays(year, month);
        let date = util.getDate(`${year}/${month}/01 0:0:0`);
        let first = date.getDay() - 1;
        let prevs = [], nexts = [], currents = [];
        let {year: prevYear, month: prevMonth} = util.getPrevMonth(year, month);
        for (let i = first; i > 0; i--) {
            prevs.push({
                type: "prev",
                day: prevDays - i,
                selected: false,
                disabled: false,
                year: prevYear,
                month: prevMonth
            });
        }
        for (let i = 1; i < days; i++) {
            currents.push({
                type: "current",
                day: i,
                current: (now_year === year && now_month === month && i === now_day),
                selected: false,
                disabled: false,
                year,
                month
            });
        }
        let last = 42 - days - first + 1;
        let {year: nextYear, month: nextMonth} = util.getNextMonth(year, month);
        for (let i = 1; i <= last; i++) {
            nexts.push({
                type: "next",
                day: i,
                selected: false,
                disabled: false,
                year: nextYear,
                month: nextMonth
            });
        }
        let all = [...prevs, ...currents, ...nexts];
        let result = [[]];
        all.forEach((item, index) => {
            result[result.length - 1].push(item);
            if ((index + 1) % 7 === 0) {
                result.push([]);
            }
        });
        result.pop();
        return {
            now,
            isToday: (now_year === year && now_month === month),
            today: {
                year: now_year,
                month: now_month,
                day: now_day
            },
            current: {
                year,
                month
            },
            header: ["一", "二", "三", "四", "五", "六", "日"],
            days: result
        };
    },
    setSelected(year, month, dayInfos, selectDates) {
        if (!selectDates || selectDates.length <= 0) {
            return dayInfos;
        } else {
            let compares = selectDates.map(date => {
                return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
            });
            dayInfos.forEach(dayInfo => {
                dayInfo.forEach(k => {
                    let a = `${k.year}${k.month}${k.day}`;
                    if (compares.indexOf(a) === -1) {
                        k.selected = false;
                    } else {
                        k.selected = true;
                    }
                });
            });
        }
    },
    setRange(year, month, dayInfos, range) {
        if (range.before) {
            let before = new Date(`${range.before.getFullYear()}/${range.before.getMonth()}/${range.before.getDate()} 0:0:0`).getTime();
            dayInfos.forEach(dayInfo => {
                dayInfo.forEach(k => {
                    let a = new Date(`${k.year}/${k.month}/${k.day} 0:0:0`);
                    if (a <= before) {
                        k.disabled = false;
                    } else {
                        k.disabled = true;
                    }
                });
            });
        }
        if (range.after) {
            let after = new Date(`${range.after.getFullYear()}/${range.after.getMonth()}/${range.after.getDate()} 0:0:0`);
            dayInfos.forEach(dayInfo => {
                dayInfo.forEach(k => {
                    let a = new Date(`${k.year}/${k.month}/${k.day} 0:0:0`);
                    if (a >= after) {
                        k.disabled = false;
                    } else {
                        k.disabled = true;
                    }
                });
            });
        }
    },
    setHeader(result) {
        let years = [[]], months = [[]];
        let yc = 1, mc = 1;
        for (let i = 1940; i < 2032; i++) {
            years[years.length - 1].push({
                year: i,
                current: (i === result.today.year),
                selected: (i === result.current.year)
            });
            if (yc % 4 === 0) {
                years.push([]);
            }
            yc++;
        }
        for (let i = 1; i <= 12; i++) {
            months[months.length - 1].push({
                month: i,
                current: (i === result.today.month),
                selected: (i === result.current.month)
            });
            if (mc % 2 === 0) {
                months.push([]);
            }
            mc++;
        }
        result.pannel = {years, months};
        return result;
    },
    getFinalPannelDates(dateObject, selectDates = [], range = {before: null, after: null}) {
        let result = this.getPannelDates(dateObject);
        this.setSelected(result.current.year, result.current.month, result.days, selectDates);
        this.setRange(result.current.year, result.current.month, result.days, range);
        return this.setHeader(Object.assign({
            selectDates,
            range
        }, result));
    }
};

export default util;