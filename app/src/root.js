import "./style/reset.scss";
import {root, StaticViewGroup} from "adajs";
import Container from "./site/container";

@root()
class Root extends StaticViewGroup {
    oncreated() {
        this.addChild(Container);
    }
}

export default Root;