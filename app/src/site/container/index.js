import {view,ViewGroup} from "adajs";
import ContainerService from "./state.js";
import Content from "./../content";
import Submenu from "./../submenu";
import Menu from "./../menu";

@view({
    className:"container",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:ContainerService
    }
})
class Container extends ViewGroup{
    tags(){
        return {
            content:Content,
            submenu:Submenu,
            menu:Menu
        }
    }
}

export default Container;
