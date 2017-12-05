import {view, View} from "adajs";

@view({
    className: "toast",
    template: "./template/toast.html",
    style: "./style/toast.scss"
})
class Toast extends View {
    constructor(parameters) {
        super(parameters);
        this.render({
            content: "toast"
        }).then(() => {
            this.getElement().style.marginLeft = `-${this.getElement().getBoundingClientRect().width / 2}px`;
            setTimeout(() => {
                this.getElement().classList.add("toast-out");
                setTimeout(() => {
                    this.getParent() && this.getParent().removeChild(this);
                }, 1500);
            }, 2000);
        });
    }
}

export default Toast;