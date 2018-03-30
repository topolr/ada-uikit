import {view, StaticViewGroup, dataset} from "adajs";
import Pannel from "./pannel";
import PannelService from "./datasets/pannel";

@view({
    className: "picker"
})
class Picker extends StaticViewGroup {
    @dataset(PannelService)
    pannelDataSet;

    oncreated() {
        this.addChild(Pannel);
    }
}

export default Picker;