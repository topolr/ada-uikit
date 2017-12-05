import {view, View} from "adajs";

@view({
    className: "loading",
    template: "./template/loading.html",
    style: "./style/loading.scss"
})
export class Loading extends View {
    constructor(option) {
        super(option);
        this.render();
    }
}