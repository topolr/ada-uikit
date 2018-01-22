import {view, View} from "adajs";
import refreshCw from "./icons/refresh-cw.icon";
import checkCircle from "./icons/check-circle.icon";
import minusCircle from "./icons/minus-circle.icon";
import baseCss from "./style/base.scss";

@view({
    className: "loading",
    template: "./template/loading.html",
    style: "./style/loading.scss"
})

class Loading extends View {
    constructor(parameters) {
        super(parameters);
        baseCss.active();
        this.data = this.watch({
            icon: refreshCw,
            circle: true,
            color: "black",
            content: "loading..."
        });
        let defaultType = this.getOption().defaultType;
        this[`show${defaultType[0].toUpperCase()}${defaultType.substring(1)}`]().then(() => {
            setTimeout(() => {
                this.getElement().classList.add(this.getThisClass("in"));
            }, 100);
        });
    }

    defaultOption() {
        return {
            defaultType: "loading"
        };
    }

    showLoading(content) {
        Object.assign(this.data, {
            icon: refreshCw,
            circle: true,
            color: "black",
            content
        });
    }

    showSuccess(content) {
        Object.assign(this.data, {
            icon: checkCircle,
            circle: false,
            color: "green",
            content
        });
    }

    showError(content) {
        Object.assign(this.data, {
            icon: minusCircle,
            circle: false,
            color: "red",
            content
        });
    }

    close(delay = 2000) {
        setTimeout(() => {
            this.getElement().classList.remove(this.getThisClass("in"));
            setTimeout(() => {
                this.getParent() && this.getParent().removeChild(this);
            }, 400);
        }, delay);
    }
}

export default Loading;