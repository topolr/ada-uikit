import {view, binder, View, service} from "adajs";
import Treeservice from "./service/tree";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "simpletree",
    template: "./template/simpletree.html",
    style: "./style/tree.scss"
})
class Simpletree extends View {

    @service(Treeservice)
    treeService;

    oncreated() {
        this.treeService.trigger("set", this.getOption());
    }

    computed(data) {
        return Object.assign(data, {icons: {triangleRight}});
    }

    @binder("toggle")
    toggle({item}) {
        this.treeService.trigger("toggle", item);
    }
}

export default Simpletree;