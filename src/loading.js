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
    }

    render(data) {
        Object.assign(data, this.getOption());
        return super.render(data);
    }

    showLoading() {
        this.render({
            icon: refreshCw,
            circle: true
        });
    }

    showSuccess() {
        this.render({
            icon: checkCircle,
            circle: false
        });
    }

    showError() {
        this.render({
            icon: minusCircle,
            circle: false
        });
    }
}

export  default Loading;