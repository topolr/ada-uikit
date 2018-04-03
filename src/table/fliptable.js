import {view, dataset, ViewGroup} from "adajs";
import MixTable from "./mix";
import MixService from "./datasets/mix";
import FlipService from "./datasets/flip";

@view({
    className: "table",
    template: "./template/fliptable.html",
    style: "./style/fliptable.scss"
})
class Table extends ViewGroup {

    @dataset(MixService)
    tableDataSet;

    @dataset(FlipService)
    flipDataSet;

    constructor(parameters) {
        super(parameters);
        let {pageSize, pagesizeName, pageName, url} = this.option;
        this.tableDataSet.setOption(this.option.tableOption);
        this.flipDataSet.setOption({pageSize, pagesizeName, pageName, url});
        this.tableDataSet.commit("set", []);
    }

    oncreated() {
        this.gotoPage(1);
    }

    defaultOption() {
        return {
            btns: [],
            url: "",
            pageSize: 10,
            pagesizeName: "pagesize",
            pageName: "page",
            tableOption: {}
        }
    }

    defaultState() {
        let {btns} = this.option;
        return {btns};
    }

    onupdate(updater) {
        return updater.isOption();
    }

    gotoPage(page) {
        this.flipDataSet.commit("goto", page).then(() => {
            this.tableDataSet.commit("set", this.flipDataSet.getData());
        });
    }

    tags() {
        return {
            thistable: MixTable
        }
    }
}

export default Table;