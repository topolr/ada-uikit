import {view, binder, handler, View} from "adajs";

@view({
    className: "alert",
    template: "./template/alert.html",
    style: "./style/alert.scss"
})
class Alert extends View {
    oncreated() {
        this.state = this.option;
        this.render();
        setTimeout(() => {
            this.getElement().classList.add(this.getThisClassName("in"));
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

    @binder("action")
    action({item}) {
        this.dispatchEvent(item.action, item);
    }

    @handler("close")
    close() {
        this.getElement().classList.remove(this.getThisClassName("in"));
        setTimeout(() => {
            this.getParent() && this.getParent().removeChild(this);
        }, 400);
    }
}

export default Alert;