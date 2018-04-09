import {view, binder, View,refer} from "adajs";
import TreeService from "./datasets/simple";
import triangleRight from "./icons/triangle-right.icon";

@view({
    className: "simpletree",
    template: "./template/simple.html",
    style: "./style/simple.scss"
})
class SimpleTree extends View {

    @refer(TreeService)
    treeDataSet;

    defaultState(){
        return {icons: {triangleRight}};
    }

    @binder("toggle")
    toggle({item}) {
        this.treeDataSet.commit("toggle", item);
    }

    @binder("active")
    active({item}){
        this.treeDataSet.commit("active",item);
    }
}


export default SimpleTree;