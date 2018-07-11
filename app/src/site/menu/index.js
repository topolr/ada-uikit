import {view,View} from "adajs";
import MenuService from "./state.js";

@view({
    className:"menu",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:MenuService
    }
})
class Menu extends View{
}

export default Menu;
