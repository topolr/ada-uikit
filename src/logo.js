import {view, View} from "adajs";

@view({
    className: "logo",
    template: "./logo/template.html",
    style: "./logo/style.scss"
})
class Logo extends View {
    oncreated() {
        this.render();
    }
}

export default Logo;