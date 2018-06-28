import {subscribe, view, View} from "adajs";
import LazyimageService from "./state.js";
import eventDispatcher from "../dispatcher";
import "./../style/base.scss";

@view({
	className: "lazyimage",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: LazyimageService
	}
})
class Lazyimage extends View {
	oncreated() {
		eventDispatcher.observe(this);
		this.scroll();
	}

	@subscribe("scroll")
	scroll() {
		let height = document.documentElement.clientHeight;
		let top = this.getElement().getBoundingClientRect().top;
		if (top <= height) {
			this.loadImage();
		}
	}

	loadImage() {
		let state = this.getCurrentState();
		if (state.url && !state.loaded) {
			let image = document.createElement("img");
			image.addEventListener("load", () => {
				let target = this.finder("image").getElement();
				target.innerHTML = "";
				target.appendChild(image);
				this.commit("loaded", true);
			});
			image.setAttribute("src", state.url);
		}
	}
}

export default Lazyimage;