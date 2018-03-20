import {dataset, root, StaticViewGroup} from "adajs";
import PannelService from "./../datepicker/datasets/pannel";
import Picker from "./../datepicker/picker";

@root()
class Root extends StaticViewGroup {
    @dataset(PannelService)
    pannelDataSet;

    oncreated() {
        this.render().then(() => {
            this.addChild(Picker);
        });
    }
}

export default Root;