import {view, View, pipe, binder} from "adajs";
import PannelService from "./datasets/pannel";

@view({
    className: "datepannel",
    template: "./template/pannel.html",
    style: "./style/pannel.scss"
})
class Pannel extends View {
    @pipe(PannelService)
    pannelDataset;

    oncreated() {
        this.render();
    }

    @binder("select")
    select({item}) {
        this.pannelDataset.commit("select", new Date(`${item.year}/${item.month + 1}/${item.day} 0:0:0`));
    }

    @binder("prev")
    prev() {
        this.pannelDataset.commit("prevmonth");
    }

    @binder("next")
    next() {
        this.pannelDataset.commit("nextmonth");
    }
}

export default Pannel;