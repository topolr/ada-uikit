import {binder, dataset, view, ViewGroup, StaticViewGroup} from "adajs";
import MixTable from "./mix";
import MixService from "./datasets/mix";
import FlipService from "./datasets/flip";
import {navigateBeforeIcon, navigateNextIcon} from "./icons/icon";

class AppendTable extends StaticViewGroup {
    @dataset(MixService)
    tableDataSet;

    oncreated() {
        this.tableDataSet.setOption(() => this.option);
        this.addChild(MixTable, {
            container: this.getElement()
        });
    }
}

@view({
    className: "filptable",
    template: "./template/fliptable.html",
    style: "./style/fliptable.scss"
})
class Table extends ViewGroup {

    @dataset(FlipService)
    flipDataSet;

    oncreated() {
        this.state.tableOption = this.option.tableOption;
        let {pageSize, pagesizeName, pageName, url} = this.option;
        this.flipDataSet.setOption(() => {
            return {pageSize, pagesizeName, pageName, url}
        });
    }

    onready() {
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

    gotoPage(page) {
        this.flipDataSet.commit("goto", page);
    }

    tags() {
        return {
            thistable: AppendTable
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

    computed(a){
        console.log(a)
        return a;
    }
}

export default Table;