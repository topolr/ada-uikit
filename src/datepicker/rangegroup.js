import {handler, view, ViewGroup} from "adajs";
import RangeGroupService from "./state/rangegroup";
import RangePannel from "./rangepannel";
import util from "./state/util";

@view({
    className: "rangegroup",
    template: "./template/rangegroup.html",
    style: "./style/rangegroup.scss",
    dataset: {
        service: RangeGroupService
    }
})
class RangeGroup extends ViewGroup {
    tags() {
        return {
            pannel: RangePannel
        }
    }

    @handler("change")
    change(e) {
        let date = new Date(`${e.data.current.year}/${e.data.current.month}/1 0:0:0`);
        let {name} = this.getTheOtherPannel(e.target), current = "left";
        if (name === "left") {
            current = "right";
        }
        let et = [];
        if (current === "left") {
            et = [date, util.getNextMonthDate(date)];
        } else {
            et = [util.getPrevMonthDate(date), date];
        }
        this.commit("setdate", et);
    }

    @handler("select")
    select(e) {
        let left = this.getChildByName("left"), right = this.getChildByName("right");
        let leftState = left.getCurrentState(), rightState = right.getCurrentState();
        this.commit("select", {left: leftState, right: rightState});
    }

    @handler("sethoverend")
    setHoverEnd({target}) {
        this.commit("setrange", target.getCurrentState().hover);
    }

    getTheOtherPannel(pannel) {
        let left = this.getChildByName("left");
        if (pannel === left) {
            return {
                name: "right",
                pannel
            };
        } else {
            return {
                name: "left",
                pannel: this.getChildByName("left")
            };
        }
    }
}

export default RangeGroup;