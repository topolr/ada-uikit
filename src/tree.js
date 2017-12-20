import {view, binder, View, Service} from "adajs";
import Treeservice from "./service/tree";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "simpletree",
    template: "./template/simpletree.html",
    style: "./style/tree.scss"
})
class Simpletree extends View {
    constructor(parameters) {
        super(parameters);
        let service = this.service = Service.getService(Treeservice, this.getOption());
        service.connect(this);
        service.trigger("get");
    }

    render(data) {
        data.icons = {triangleRight};
        return super.render(data);
    }

    @binder("toggle")
    toggle({item}) {
        this.service.trigger("toggle", item);
    }
}

export default Simpletree;