import {root, StaticViewGroup} from "adajs";
import Alert from "../alert";
import Loading from "../loading";
import Messagebox from "../messagebox/index";
import Photocutter from "../photocutter/index";
import Toast from "./../toast";

@root
class Root extends StaticViewGroup {
    oncreated() {
        this.addChild(Toast);
    }
}

export default Root;