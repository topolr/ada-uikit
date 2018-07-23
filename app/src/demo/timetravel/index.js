import {binder, handler, view, ViewGroup} from "adajs";
import TimetravelService from "./state.js";
import Todo from "./../todo";

@view({
    className: "timetravel",
    template: "./template.html",
    style: "./style.scss",
    dataset: {
        service: TimetravelService
    }
})
class Timetravel extends ViewGroup {
    tags() {
        return {
            todo: Todo
        }
    }

    @binder("change")
    change({e}) {
        let value = e.target.value;
        this.getChildAt(0).getDataSet().travel(value);
    }

    @handler("commit")
    commitStep({data}) {
        this.commit("step", data);
    }
}

export default Timetravel;