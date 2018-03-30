import {root, StaticViewGroup} from "adajs";
import Alert from "./../alert";
import Loading from "./../loading";
import Messagebox from "./../messagebox";
import Photocutter from "./../photocutter";

@root
class Root extends StaticViewGroup {
    oncreated() {
        this.addChild(Photocutter);
    }
}

export default Root;