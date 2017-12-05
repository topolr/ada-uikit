import {view, View} from "adajs";
import refreshCw from "./icons/refresh-cw.icon";
import baseCss from "./style/base.scss";

@view({
    className: "loading",
    template: "./template/loading.html",
    style: "./style/loading.scss"
})
class Loading extends View {
    constructor(option) {
        super(option);
        this.render({refreshCw});
    }
}

export  default Loading;