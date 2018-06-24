import {binder, view, View} from "adajs";
import PannelService from "./state/pannel";

@view({
    className: "datepannel",
    template: "./template/pannel.html",
    style: "./style/pannel.scss",
    dataset: {
        service: PannelService
    }
})
class Pannel extends View {
    @binder("select")
    select({item}) {
        this.getDataSet().commit("select", new Date(`${item.year}/${item.month}/${item.day} 0:0:0`)).then(() => {
            this.dispatchEvent("select", this.getCurrentState());
        });
    }

    @binder("prev")
    prev() {
        this.getDataSet().commit("prevmonth").then(() => {
            this.dispatchEvent("change", this.getCurrentState());
        });
    }

    @binder("next")
    next() {
        this.getDataSet().commit("nextmonth").then(() => {
            this.dispatchEvent("change", this.getCurrentState());
        });
    }

    @binder("gotoyear")
    gotoYear({item}) {
        this.getDataSet().commit("gotoyear", item.year).then(() => {
            this.dispatchEvent("change", this.getCurrentState());
        });
    }

    @binder("gotomonth")
    gotoMonth({item}) {
        this.getDataSet().commit("gotomonth", item.month).then(() => {
            this.dispatchEvent("change", this.getCurrentState());
        });
    }

    @binder("showpannel")
    showPannel() {
        this.getElement().classList.toggle(this.getThisClassName("showpannel"));
        this.focusScroll();
    }

    @binder("closepannel")
    closePannel() {
        this.getElement().classList.remove(this.getThisClassName("showpannel"));
    }

    @binder("today")
    today() {
        this.getDataSet().commit("today").then(() => {
            this.dispatchEvent("change", this.getCurrentState());
        });
    }

    focusScroll() {
        let target = this.finder("scroll").getElement().querySelector(`.${this.getThisClassName("selected")}`);
        if (target) {
            this.finder("scroll").getElement().scrollTop = target.offsetTop - 30;
        }
    }

    onupdated() {
        this.focusScroll();
    }
}

export default Pannel;