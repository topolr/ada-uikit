import {view, View} from "adajs";

@view({
    className: "logo",
    template: "./template/logo.html",
    style: "./style/logo.scss"
})
class Logo extends View {
    constructor(parameters) {
        super(parameters);
        this.render();
    }
}

export default Logo;