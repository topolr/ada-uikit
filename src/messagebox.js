import {view, binder, handler, BondViewGroup, View} from "adajs";

@view()
class Text extends View {
    oncreated() {
        this.getElement().innerHTML = "this is content";
    }
}

@view({
    className: "messagebox",
    template: "./messagebox/template.html",
    style: "./messagebox/style.scss"
})
class Messagebox extends BondViewGroup {
    oncreated() {
        setTimeout(() => {
            this.getElement().classList.add(this.getThisClassName("in"));
        }, 100);
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
        this.getElement().classList.remove(this.getThisClassName("in"));
        setTimeout(() => {
            this.getParent() && this.getParent().removeChild(this);
        }, 400);
    }
}

export default Messagebox;