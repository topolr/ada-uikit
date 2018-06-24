import {view, StaticViewGroup} from "adajs";
import Pannel from "./pannel";
import RangePannel from "./rangepannel";
import RangGroup from "./rangegroup"

@view({
	className: "picker"
})
class Picker extends StaticViewGroup {
	oncreated() {
		this.addChild(RangGroup, {
			container: this.getElement()
		});
	}
}

export default Picker;