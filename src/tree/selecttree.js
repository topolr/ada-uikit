import {view, View, pipe, binder} from "adajs";
import SimpleTree from "./simple";
import SelectService from "./datasets/select";
import checkBoxIcon from "./icons/check-box.icon";
import checkBoxOutline from "./icons/check-box-outline-blank.icon";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "selectree",
    template: "./selecttree.html",
    style: "./selecttree.scss"
})
class SelectTree extends SimpleTree {
    @pipe(SelectService)
    treeDataSet;

    oncreated() {
        this.state = {icons: {triangleRight, checkBoxIcon, checkBoxOutline}};
    }

    @binder("toggleselect")
    toggleSelect({item}) {
        this.treeDataSet.commit("toggleselect", item);
    }
}

export default SelectTree;