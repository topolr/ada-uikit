import { root, StaticViewGroup } from "adajs";
import PhototCutter from './../photocutter';

@root
class Root extends StaticViewGroup {
	oncreated() {
		this.addChild(PhototCutter);
	}
}

export default Root;