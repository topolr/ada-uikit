import {binder, dataset, view, ViewGroup} from "adajs";
import MixTable from "./mix";
import MixService from "./datasets/mix";
import FlipService from "./datasets/flip";
import {navigateBeforeIcon, navigateNextIcon} from "./icons/icon";

@view({
    className: "filptable",
    template: "./template/fliptable.html",
    style: "./style/fliptable.scss"
})
class Table extends ViewGroup {

    @dataset(MixService)
    tableDataSet;

    @dataset(FlipService)
    flipDataSet;

    oncreated() {
        let {pageSize, pagesizeName, pageName, url} = this.option;
        this.tableDataSet.setOption(() => this.option.tableOption);
        this.flipDataSet.setOption(() => {
            return {pageSize, pagesizeName, pageName, url}
        });
        this.tableDataSet.commit("set", []);
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
        return {
            btns, icons: {
                navigateBeforeIcon,
                navigateNextIcon
            }
        };
    }

    computed(a) {
        console.log(a);
        return a;
    }

    gotoPage(page) {
        this.flipDataSet.commit("goto", page).then(() => {
            console.log("=>", this.flipDataSet.getData());
            this.tableDataSet.commit("set", this.flipDataSet.getData().list);
        });
    }

    tags() {
        return {
            thistable: MixTable
        }
    }

    @binder("nextpage")
    nextPage() {
    }

    @binder("prevpage")
    prevPage() {
    }

    @binder("goto")
    goto({page}) {
        this.gotoPage(page.num);
    }
}

export default Table;