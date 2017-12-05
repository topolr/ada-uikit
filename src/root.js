import {root, StaticViewGroup} from "adajs";
import Phototcutter from "./photocutter";

@root()
class Root extends StaticViewGroup {
    constructor(option) {
        super(option);
        this.addChild(Phototcutter);
    }
}

export default Root;