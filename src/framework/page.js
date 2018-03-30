import {view, pipe, StaticViewGroup} from "adajs";
import BaseInfoService from "./datasets/baseinfo";

@view({
    className: "pagecontainer"
})
class PageContainer extends StaticViewGroup {

    @pipe(BaseInfoService)
    baseInfoDataSet;
}

export default PageContainer;