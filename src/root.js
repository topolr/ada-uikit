import {root, StaticViewGroup} from "adajs";
import Hello from "./hello";

@root()
class Root extends StaticViewGroup {
    constructor(option) {
        super(option);
        this.addChild(Hello);
    }
}

export default Root;