import {view, View} from "adajs";
import refreshCw from "./icons/refresh-cw.icon";
import checkCircle from "./icons/check-circle.icon";
import minusCircle from "./icons/minus-circle.icon";
import "./style/base.scss";

@view({
    className: "loading",
    template: "./template/loading.html",
    style: "./style/loading.scss"
})

class Loading extends View {
    oncreated() {
        this.state = {
            icon: refreshCw,
            circle: true,
            color: "black",
            content: "loading..."
        };
        let defaultType = this.option.defaultType;
        this[`show${defaultType[0].toUpperCase()}${defaultType.substring(1)}`]().then(() => {
            setTimeout(() => {
                this.getElement().classList.add(this.getThisClassName("in"));
            }, 100);
        });
    }

    defaultOption() {
        return {
            defaultType: "loading"
        };
    }

    showLoading(content) {
        Object.assign(this.state, {
            icon: refreshCw,
            circle: true,
            color: "black",
            content: content || "loading..."
        });
        return this.render();
    }

    showSuccess(content) {
        Object.assign(this.state, {
            icon: checkCircle,
            circle: false,
            color: "green",
            content: content || "Success done"
        });
        return this.render();
    }

    showError(content) {
        Object.assign(this.state, {
            icon: minusCircle,
            circle: false,
            color: "red",
            content: content || "Error occur"
        });
        return this.render();
    }

    close(delay = 2000) {
        setTimeout(() => {
            if (!this.isRemoved()) {
                this.getElement().classList.remove(this.getThisClassName("in"));
                setTimeout(() => {
                    this.getParent() && this.getParent().removeChild(this);
                }, 400);
            }
        }, delay);
    }
}

export default Loading;