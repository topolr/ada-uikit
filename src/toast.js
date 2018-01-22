import {view, View} from "adajs";

@view({
    className: "toast",
    template: "./template/toast.html",
    style: "./style/toast.scss"
})
class Toast extends View {
    constructor(parameters) {
        super(parameters);
        this.combine(this.getOption());
        this.render().then(() => {
            this.getElement().style.marginLeft = `-${this.getElement().getBoundingClientRect().width / 2}px`;
            setTimeout(() => {
                this.getElement().classList.add(this.getThisClass("out"));
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