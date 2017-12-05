import {root, StaticViewGroup} from "adajs";
import Phototcutter from "./photocutter";
import Loading from "./loading";
import Toast from "./toast";

@root()
class Root extends StaticViewGroup {
    constructor(option) {
        super(option);
        this.addChild(Toast);
    }
}

export default Root;