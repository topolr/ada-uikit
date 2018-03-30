import {view, BondViewGroup, pipe} from "adajs";
import BaseInfoService from "./datasets/baseinfo";
import PageContainer from "./page";
import Menu from "./menu";

@view({
    className: "pagecontainer",
    template: "./template/container.html",
    style: "./style/container.scss"
})
class Container extends BondViewGroup {

    @pipe(BaseInfoService)
    baseInfoDataSet;

    defaultState() {
        return {
            types: {
                menu: Menu,
                page: PageContainer
            }
        }
    }
}

export default Container;