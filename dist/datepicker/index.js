import {view, StaticViewGroup} from "adajs";
import Pannel from "./pannel";

@view({
	className: "picker"
})
class Picker extends StaticViewGroup {
	oncreated() {
		this.addChild(Pannel, {
			container: this.getElement()
		});
	}
}

export default Picker;