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
        let defaultType = parameters.option.defaultType;
        if (!defaultType || ["loading", "error", "success"].indexOf(defaultType) === -1) {
            defaultType = "loading";
        }
        this[`show${defaultType[0].toUpperCase()}${defaultType.substring(1)}`]().then(() => {
            setTimeout(() => {
                this.getElement().classList.add("loading-in");
            }, 100);
        });
    }

    render(data) {
        Object.assign(data, this.getOption());
        return super.render(data);
    }

    showLoading() {
        return this.render({
            icon: refreshCw,
            circle: true,
            color: "black"
        });
    }

    showSuccess() {
        return this.render({
            icon: checkCircle,
            circle: false,
            color: "green"
        });
    }

    showError() {
        return this.render({
            icon: minusCircle,
            circle: false,
            color: "red"
        });
    }
}

export default Loading;