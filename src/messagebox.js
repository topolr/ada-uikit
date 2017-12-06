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
        this.render(Object.assign({
            title: "this is title",
            content: [
                {type: Text, option: {}}
            ],
            btns: [
                {name: "close", action: "close"}
            ]
        }, parameters.option)).then(() => {
            setTimeout(() => {
                this.getElement().classList.add("messagebox-in");
            }, 100);
        });
    }

    @binder("action")
    action({item}) {
        this.dispatchEvent(item.action, item);
    }

    @handler("close")
    close() {
        this.getElement().classList.remove("messagebox-in");
        setTimeout(() => {
            this.getParent() && this.getParent().removeChild(this);
        }, 400);
    }
}

export default Messagebox;