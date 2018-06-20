import {root, StaticViewGroup} from "adajs";
import Picker from "../datepicker/index";

@root()
class Root extends StaticViewGroup {
	oncreated() {
		this.addChild(Picker);
	}
}

export default Root;