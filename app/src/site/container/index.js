import {binder, view, ViewGroup} from "adajs";
import ContainerService from "./state.js";
import Content from "./../content";
import Submenu from "./../submenu";
import Menu from "./../menu";

@view({
    className: "container",
    template: "./template.html",
    style: "./style.scss",
    dataset: {
        service: ContainerService
    }
})
class Container extends ViewGroup {
    tags() {
        return {
            content: Content,
            submenu: Submenu,
            menu: Menu
        }
    }

    @binder("open")
    open({item}) {
        this.finder("list").getElement().classList.remove(this.getThisClassName("open"));
        this.commit("open", item);
    }

    @binder("openmenu")
    openmenu(){
        this.finder("list").getElement().classList.add(this.getThisClassName("open"));
    }
}

export default Container;
