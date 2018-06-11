import {refer, view, View, binder} from "adajs";
import MixService from "./datasets/mix";

@view({
    className: "mixtable",
    template: "./template/mix.html",
    style: "./style/mix.scss"
})
class MixTable extends View {
    @refer(MixService)
    mixDataSet;

    onready() {
        this.finder("body").getElement().addEventListener("scroll", (e) => {
            let target = e.target;
            this.finder("middle").getElement().scrollLeft = target.scrollLeft;
            this.finder("left").getElement().scrollTop = target.scrollTop;
            this.finder("right").getElement().scrollTop = target.scrollTop;
        });
    }

    @binder("toggle")
    toggle({row}) {
        this.mixDataSet.commit("toggle", row);
    }

    @binder("toggleAll")
    toggleAll() {
        this.mixDataSet.commit("toggleAll");
    }

    @binder("action")
    doAction({index, action}) {
        this.dispatchEvent("action", {
            row: this.mixDataSet.getComputeData("rowdata", index),
            rowIndex: index,
            action
        });
    }
}

export default MixTable;