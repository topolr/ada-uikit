import {action, get, Service, DataSet, refer} from "adajs";
import MixService from "./mix";

class FlipService extends Service {
    @refer.child(MixService)
    tableDataSet;

    defaultOption() {
        return {
            pageSize: 10,
            pagesizeName: "",
            pageName: "",
            url: ""
        };
    }

    defaultData() {
        return {
            list: [],
            totalPage: 1,
            current: 1,
            end: false,
            total: 1,
            pages: []
        };
    }

    getParameter(page) {
        if (page <= 0) {
            page = 1;
        }
        let paras = {};
        paras[this.option.pageName] = this.option.from + (page - 1) * this.option.pageSize;
        paras[this.option.pagesizeName] = this.option.pageSize;
        return paras;
    }

    getPagesData(current, total) {
        let r = [];
        let prevpage = {
            name: "prev"
        }, nextpage = {
            name: "next"
        }, dots1 = {
            name: "dot",
            none: false
        }, dots2 = {
            name: "dot",
            none: false
        };
        let btns = {
            page0: {
                name: "btn",
                num: 1
            },
            page1: {
                name: "btn",
                num: 2
            },
            page2: {
                name: "btn",
                num: 3
            },
            page3: {
                name: "btn",
                num: 4
            },
            page4: {
                name: "btn",
                num: 5
            }
        };
        let num = current;
        if (total <= 5) {
            dots1.none = true;
            dots2.none = true;
            for (let i = 0; i < 5; i++) {
                if (i < total) {
                    btns["page" + i].none = false;
                    btns["page" + i].num = (i + 1);
                } else {
                    btns["page" + i].none = true;
                }
            }
        } else {
            btns.page4.num = total;
        }
        for (let i = 0; i < 5; i++) {
            btns["page" + i].iscurrent = false;
        }
        if (num < 4) {
            if (total > 5) {
                dots1.none = true;
                dots2.none = false;
            }
            btns["page" + (num - 1)].iscurrent = true;
            btns.page1.num = 2;
            btns.page2.num = 3;
            btns.page3.num = 4;
        } else {
            if (num <= total - 3) {
                dots1.none = false;
                dots2.none = false;
                btns.page1.num = (num - 1);
                btns.page2.num = (num);
                btns.page3.num = (num + 1);
                btns.page2.iscurrent = true;
            } else {
                if (total > 5) {
                    dots1.none = false;
                    dots2.none = true;
                }
                btns.page1.num = (total - 3);
                btns.page2.num = (total - 2);
                btns.page3.num = (total - 1);
                btns.page4.iscurrent = true;
            }
        }
        if (num === 1) {
            if (total === 1) {
                prevpage.disabled = true;
                nextpage.disabled = true;
            } else {
                prevpage.disabled = true;
                nextpage.disabled = false;
            }
        } else if (num === total) {
            prevpage.disabled = false;
            nextpage.disabled = true;
        } else {
            prevpage.disabled = false;
            nextpage.disabled = false
        }
        return [prevpage, btns.page0, dots1, btns.page1, btns.page2, btns.page3, dots2, btns.page4, nextpage];
    }

    @action("goto")
    goto(current, page) {
        return get(this.option.url, this.getParameter(page)).then((data) => {
            data = JSON.parse(data).data;
            let current = (page <= 0 ? 1 : page), total = data.total, end = false, totalPage = 0;
            if (data.total) {
                total = data.total;
                let a = data.total % this.option.pageSize;
                if (a === 0) {
                    totalPage = data.total / this.option.pageSize;
                } else {
                    totalPage = parseInt(data.total / this.option.pageSize) + 1;
                }
            }
            if (data.list) {
                end = data.list.length < this.option.pageSize;
            } else {
                end = true;
            }
            if (this.tableDataSet.length > 0) {
                return this.tableDataSet[0].commit("set", data.list).then(() => {
                    return {
                        list: data.list,
                        totalPage,
                        current,
                        end,
                        total,
                        pages: this.getPagesData(current, total)
                    };
                });
            } else {
                return {
                    list: data.list,
                    totalPage,
                    current,
                    end,
                    total,
                    pages: this.getPagesData(current, total)
                };
            }
        });
    }

    onupdate(a) {
        console.log("------>>")
        return a;
    }
}

export default FlipService;