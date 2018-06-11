import {binder, handler, view, View} from "adajs";
import MixService from "./states/mix";

@view({
    className: "mixtable",
    template: "./template/mix.html",
    style: "./style/mix.scss",
    dataset: {
        service: MixService
    }
})
class MixTable extends View {

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
        this.getDataSet().commit("toggle", row);
        this.dispatchEvent("toggle", row);
    }

    @binder("toggleAll")
    toggleAll() {
        this.getDataSet().commit("toggleAll");
    }
}

export default MixTable;