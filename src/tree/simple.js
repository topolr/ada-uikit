import {view, binder, View, context} from "adajs";
import {TreeDataSet} from "./datasets/tree";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "simpletree",
    template: "./simple.html",
    style: "./simple.scss"
})
class SimpleTree extends View {

    @context(TreeDataSet)
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