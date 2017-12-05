import {view, View} from "adajs";

@view({
    className: "toast",
    template: "./template/toast.html",
    style: "./style/toast.scss"
})
export class Toast extends View {
    constructor(option) {
        super(option);
    }
}