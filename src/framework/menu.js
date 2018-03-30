import {view, dataset, View} from "adajs";
import BaseInfoService from "./datasets/baseinfo";

@view({
    className: "pagemenu",
    template: "./template/menu.html",
    style: "./style/menu.scss"
})
class Menu extends View {

    @dataset(BaseInfoService)
    baseInfoDataSet;

    onupdate(updater) {
        return updater.isDataSet();
    }
}

export default Menu;