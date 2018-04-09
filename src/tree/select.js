import {view, View, refer, binder} from "adajs";
import SimpleTree from "./simple";
import SelectService from "./datasets/select";
import checkBoxIcon from "./icons/check-box.icon";
import checkBoxOutline from "./icons/check-box-outline-blank.icon";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "selectree",
    template: "./template/select.html",
    style: "./style/select.scss"
})
class SelectTree extends SimpleTree {
    @refer(SelectService)
    treeDataSet;

    defaultState(){
        return {icons: {triangleRight, checkBoxIcon, checkBoxOutline},list:[]};
    }

    @binder("toggleselect")
    toggleSelect({item}) {
        this.treeDataSet.commit("toggleselect", item);
    }
}

export default SelectTree;