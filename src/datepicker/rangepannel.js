import {view} from "adajs";
import Pannel from "./pannel";
import RangeService from "./state/rangepannel";

@view({
    dataset: {
        service: RangeService
    }
})
class RangePannel extends Pannel {
    oncreated() {
        this.getElement().addEventListener("mouseover", e => {
            if (e.target.classList && e.target.classList.contains("datepannel-inner")) {
                window.requestAnimationFrame(() => {
                    let type = e.target.dataset.type || "in";
                    this.commit("sethoverend", {day: e.target.innerHTML, type}).then(() => {
                        this.dispatchEvent("sethoverend");
                    });
                });
            }
        });
    }
}

export default RangePannel;