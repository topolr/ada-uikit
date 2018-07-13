import {view,BondViewGroup} from "adajs";
import SubmenuService from "./state.js";

@view({
    className:"submenu",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:SubmenuService
    }
})
class Submenu extends BondViewGroup{
}

export default Submenu;