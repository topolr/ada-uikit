import {binder, view, handler, subscribe, config, ViewGroup} from "adajs";
import ContainerService from "./state.js";
import Content from "./../content";
import Submenu from "./../submenu";
import Menu from "./../menu";
import router from "ada-uikit/src/router";
import dispatcher from "ada-uikit/src/dispatcher";

@view({
	className: "container",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: ContainerService
	}
})
class Container extends ViewGroup {
	onready() {
		dispatcher.observe(this);
		let site = config.get().basePath;
		let _router = this.router = router(`${window.location.protocol}//${window.location.host}${site.substring(0, site.length - 1)}`);
		this.getDataSet().getComputeData("links").forEach(item => {
			_router.bind(item.link === "/" ? "/" : item.link, (e) => {
				this.commit("flip", item);
			});
		});
		this.router.run();
	}

	tags() {
		return {
			content: Content,
			submenu: Submenu,
			menu: Menu
		}
	}

	@subscribe("click")
	click({target}) {
		if (!this.finder("list").getElement().contains(target)) {
			this.finder("list").getElement().classList.remove(this.getThisClassName("open"));
		}
	}

	@binder("open")
	open({item}) {
		this.finder("list").getElement().classList.remove(this.getThisClassName("open"));
		this.commit("open", item);
	}

	@binder("openmenu")
	openmenu() {
		this.finder("list").getElement().classList.add(this.getThisClassName("open"));
	}

	@handler("flip")
	flip({data}) {
		this.router.open(data.link);
	}

	@handler("setsubmenu")
	setSubMenu(e) {
		this.commit("setsubmenu", e.data);
	}
}

export default Container;
