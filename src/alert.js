import {view, binder, handler, View} from "adajs";

@view({
    className: "alert",
    template: "./template/alert.html",
    style: "./style/alert.scss"
})
class Alert extends View {
    constructor(parameters) {
        super(parameters);
        this.render(Object.assign({
            content: "this is alert",
            btns: [
                {name: "close", action: "close"}
            ]
        }, parameters.option));
        setTimeout(() => {
            this.getElement().classList.add("alert-in");
        }, 100);
    }

    @binder("action")
    action({item}) {
        this.dispatchEvent(item.action, item);
    }

    @handler("close")
    close() {
        this.getElement().classList.remove("alert-in");
        setTimeout(() => {
            this.getParent() && this.getParent().removeChild(this);
        }, 400);
    }
}

export default Alert;