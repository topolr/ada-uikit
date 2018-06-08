import {root, StaticViewGroup} from "adajs";
import Alert from "../alert";
import Loading from "../loading";
import Messagebox from "../messagebox/index";
import Photocutter from "../photocutter/index";
import Toast from "./../toast";
import Datapicker from "./../datepicker";

@root
class Root extends StaticViewGroup {
	oncreated() {
		this.addChild(Messagebox,{
			parameter:{
                title: "this is title22222",
                width: "360px",
                btns: [
                    {name: "close", action: "close"}
                ]
			}
		});
	}
}

export default Root;