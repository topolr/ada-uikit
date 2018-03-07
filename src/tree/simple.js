import {view, binder, View, pipein} from "adajs";
import TreeService from "./datasets/tree";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "simpletree",
    template: "./simple.html",
    style: "./simple.scss"
})
class SimpleTree extends View {

    @pipein(TreeService)
    treeDataSet;

    oncreated() {
        this.state = {icons: {triangleRight}};
    }

    @binder("toggle")
    toggle({item}) {
        this.treeDataSet.commit("toggle", item);
    }
}


export default SimpleTree;