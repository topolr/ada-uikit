import {view, binder, handler, View} from "adajs";

@view({
    className: "alert",
    template: "./template/alert.html",
    style: "./style/alert.scss"
})
class Alert extends View {
    constructor(parameters) {
        super(parameters);
        this.render();
        setTimeout(() => {
            this.getElement().classList.add(this.getThisClass("in"));
        }, 100);
    }

    defaultOption() {
        return {
            content: "this is alert",
            btns: [
                {name: "close", action: "close"}
            ]
        };
    }

    computed() {
        return this.getOption();
    }

    @binder("action")
    action({item}) {
        this.dispatchEvent(item.action, item);
    }

    @handler("close")
    close() {
        this.getElement().classList.remove(this.getThisClass("in"));
        setTimeout(() => {
            this.getParent() && this.getParent().removeChild(this);
        }, 400);
    }
}

export default Alert;