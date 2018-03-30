import {binder, pipe, view, View} from "adajs";
import PannelService from "./datasets/pannel";
import leftIcon from "./icons/left.icon";
import rightIcon from "./icons/right.icon";
import backIcon from "./icons/back.icon";

@view({
    className: "datepannel",
    template: "./template/pannel.html",
    style: "./style/pannel.scss"
})
class Pannel extends View {
    @pipe(PannelService)
    pannelDataset;

    defaultState() {
        return {
            icons: {leftIcon, rightIcon, backIcon}
        };
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

    @binder("gotoyear")
    gotoYear({item}) {
        this.pannelDataset.commit("gotoyear", item.year);
    }

    @binder("gotomonth")
    gotoMonth({item}) {
        this.pannelDataset.commit("gotomonth", item.month);
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
        this.pannelDataset.commit("today");
    }

    focusScroll() {
        let target = this.finder("scroll").getElement().querySelector(`.${this.getThisClassName("selected")}`);
        if (target) {
            this.finder("scroll").getElement().scrollTop = target.offsetTop - 30;
        }
    }

    render() {
        return super.render().then(() => this.focusScroll());
    }
}

export default Pannel;