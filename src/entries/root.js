import {root, StaticViewGroup} from "adajs";
import Alert from "../alert";
import Loading from "../loading";
import Messagebox from "../messagebox/index";
import Photocutter from "../photocutter/index";
import Toast from "./../toast";
import Datapicker from "./../datepicker";
import Lazyimage from "./../lazyimage";
import Tab from "./../tab";

@root
class Root extends StaticViewGroup {
	oncreated() {
		// this.addChild(Messagebox,{
		// 	parameter:{
		//        title: "this is title22222",
		//        width: "360px",
		//        btns: [
		//            {name: "close", action: "close"}
		//        ]
		// 	}
		// });
		// let e = document.createElement("div");
		// e.style.cssText = "height:800px;";
		// this.getElement().appendChild(e);
		// this.addChild(Lazyimage, {
		// 	parameter: {
		// 		url: "https://static.npmjs.com/images/enterprise/pressure-tested-02.svg"
		// 	},
		// 	container: this.getElement()
		// })
		this.addChild(Tab, {
			parameter: {
				tabs: [
					{title: "tab1", content: "xxxxx", type: "text"},
					{title: "tab2", content: Datapicker, type: "view"},
					{title: "tab3", content: "xxxxxeeeee", type: "text"}
				]
			}
		});
	}
}

export default Root;