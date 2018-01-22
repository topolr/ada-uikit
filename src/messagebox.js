import {view, binder, handler, BondViewGroup, View} from "adajs";

@view()
class Text extends View {
    constructor(parameters) {
        super(parameters);
        this.render();
        this.getElement().innerHTML = "this is content";
    }
}

@view({
    className: "messagebox",
    template: "./template/messagebox.html",
    style: "./style/messagebox.scss"
})
class Messagebox extends BondViewGroup {
    constructor(parameters) {
        super(parameters);
        this.combine(this.getOption());
        this.render().then(() => {
            setTimeout(() => {
                this.getElement().classList.add(this.getThisClass("in"));
            }, 100);
        });
    }

    defaultOption() {
        return {
            title: "this is title",
            width: "360px",
            content: [
                {type: Text, option: {}}
            ],
            btns: [
                {name: "close", action: "close"}
            ]
        }
    }

    @binder("action")
    action({item}) {
        this[item.action] && this[item.action](item);
    }

    @handler("close")
    close() {
        this.getElement().classList.remove(this.getThisClass("in"));
        setTimeout(() => {
            this.getParent() && this.getParent().removeChild(this);
        }, 400);
    }
}

export default Messagebox;