import {view, View} from "adajs";

@view({
    className: "toast",
    template: "./toast/template.html",
    style: "./toast/style.scss"
})
class Toast extends View {
    oncreated() {
        this.state = this.option;
        this.render().then(() => {
            this.getElement().style.marginLeft = `-${this.getElement().getBoundingClientRect().width / 2}px`;
            setTimeout(() => {
                this.getElement().classList.add(this.getThisClassName("out"));
                setTimeout(() => {
                    this.getParent() && this.getParent().removeChild(this);
                }, 1500);
            }, 2000);
        });
    }

    defaultOption() {
        return {
            content: "this is toast"
        }
    }
}

export default Toast;