import {action, get, Service, util} from "adajs";
import {addIcon, closeIcon, navigateBeforeIcon, navigateNextIcon} from "../icons";

class FlipService extends Service {
    defaultData() {
        return {
            url: "/mock/test.json",
            btns: [
                {"name": "add", icon: addIcon},
                {"name": "remove", icon: closeIcon}
            ],
            tableOption: {},
            pageSize: 10,
            pagesizeName: "",
            pageName: "",
            list: [],
            totalPage: 1,
            current: 1,
            end: false,
            total: 1,
            icons: {navigateBeforeIcon, navigateNextIcon},
            pages: []
        };
    }

    onupdate(current, data) {
        util.extend(current, data);
        return current;
    }

    getParameter(current, page) {
        if (page <= 0) {
            page = 1;
        }
        let paras = {};
        paras[current.pageName] = current.from + (page - 1) * current.pageSize;
        paras[current.pagesizeName] = current.pageSize;
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
        return get(current.url, this.getParameter(current, page)).then((data) => {
            data = JSON.parse(data).data;
            let _current = (page <= 0 ? 1 : page), total = data.total, end = false, totalPage = 0;
            if (data.total) {
                total = data.total;
                let a = data.total % current.pageSize;
                if (a === 0) {
                    totalPage = data.total / current.pageSize;
                } else {
                    totalPage = parseInt(data.total / current.pageSize) + 1;
                }
            }
            if (data.list) {
                end = data.list.length < current.pageSize;
            } else {
                end = true;
            }
            util.extend(current, {
                list: data.list,
                totalPage,
                current: _current,
                end,
                total,
                pages: this.getPagesData(_current, totalPage)
            });
            return current;
        });
    }
}

export default FlipService;