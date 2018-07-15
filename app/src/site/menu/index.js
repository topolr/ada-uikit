import {view, binder, View} from "adajs";
import MenuService from "./state.js";

@view({
	className: "menu",
	template: "./template.html",
	style: "./style.scss",
	dataset: {
		service: MenuService
	}
})
class Menu extends View {
	@binder("flip")
	flip({sub}) {
		this.dispatchEvent("flip", sub);
	}
}

export default Menu;
