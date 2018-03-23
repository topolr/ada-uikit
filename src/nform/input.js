import {view, View, pipe, binder} from "adajs";
import FormService from "./datasets/form";

@view({
    className: "input",
    template: "./template/input.html",
    style: "./style/input.scss"
})
class Input extends View {
    @pipe(FormService)
    formDataSet;

    oncreated() {
        this.state = this.data;
        this.render();
    }

    onchange(data) {
        this.state = data;
        this.render();
    }

    @binder("keyup")
    keyup({e}) {
        this.formDataSet.commit("setstate", {
            name: this.getCurrentState().name,
            value: e.target.value
        });
    }
}

export default Input;