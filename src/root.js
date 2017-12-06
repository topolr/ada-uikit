import {root, StaticViewGroup} from "adajs";
import Phototcutter from "./photocutter";
import Loading from "./loading";
import Toast from "./toast";
import Tween from "./tween";

@root()
class Root extends StaticViewGroup {
    constructor(option) {
        super(option);
        this.addChild(Loading).then((loading) => {
            loading.showLoading("loading");
            window.loading = loading;
        });
    }
}

export default Root;