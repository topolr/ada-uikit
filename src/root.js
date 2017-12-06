import {root, StaticViewGroup} from "adajs";
import Phototcutter from "./photocutter";
import Loading from "./loading";
import Toast from "./toast";
import Tween from "./tween";
import Browser from "./browser";
import transition from "./transition";

@root()
class Root extends StaticViewGroup {
    constructor(option) {
        super(option);
        this.addChild(Loading).then((loading) => {
            loading.showLoading("loading");
            window.loading = loading;
        });
        console.log(Browser)

        transition(this.getElement()).set("opacity").when((element) => {
            element.style.opacity = 0;
        }).then(() => {
            console.log("done")
        });
    }
}

export default Root;