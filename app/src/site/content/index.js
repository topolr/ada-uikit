import {StaticViewGroup, view} from "adajs";
import ContentService from "./state.js";
import prism from "./../../lib/prism";
import Loading from "./../loading";
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
		return this.addChild(Loading, {
			container: this.getElement()
		}).then(loading => {
			this.commit("get").then(() => {
				if (!this.isRemoved()) {
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
					this.autoLoadModule();
					this.dispatchEvent("setsubmenu", h2s);
				}
				this.removeChild(loading);
			});
		});
	}

	autoLoadModule() {
		[...this.getElement().querySelectorAll(".ada-module")].reduce((a, element) => {
			return a.then(() => {
				let type = element.dataset.type,
					option = element.dataset.option ? JSON.parse(element.dataset.option) : {};
				return import(type).then(module => {
					this.addChild(module, {
						parameter: option,
						container: element
					});
				});
			});
		}, Promise.resolve());
	}
}

export default Content;