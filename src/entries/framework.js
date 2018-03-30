import {root, dataset, StaticViewGroup} from "adajs";
import Container from "./../framework/container";
import BaseInfoService from "./../framework/datasets/baseinfo";

@root
class Root extends StaticViewGroup {
    @dataset(BaseInfoService)
    baseInfoDataSet;

    oncreated() {
        this.addChild(Container);
    }
}

export default Root;