import {view, StaticViewGroup} from "adajs";
import ContentService from "./state.js";
import prism from "./../../lib/prism";
import "./../../lib/prism.css";

@view({
	className: "content",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: ContentService
	}
})
class Content extends StaticViewGroup {
	onready() {
		this.commit("get").then(() => {
			let h2s = [];
			[...this.getElement().querySelectorAll("h2")].forEach(element => {
				h2s.push({title: element.innerText, id: element.getAttribute("id"), subs: [], element});
			});
			[...this.getElement().querySelectorAll("h3")].forEach(element => {
				let a = element;
				while (a) {
					if (a.tagName && a.tagName.toLowerCase() === "h2") {
						break;
					} else {
						a = a.previousSibling;
					}
				}
				if (a && a.tagName && a.tagName.toLowerCase() === "h2") {
					h2s.some(info => {
						if (info.element === a) {
							info.subs.push({
								title: element.innerText,
								id: element.getAttribute("id")
							});
							return true;
						}
					});
				}
			});
			prism.highlightAllUnder(this.getElement());
			this.dispatchEvent("setsubmenu", h2s);
		});
	}
}

export default Content;