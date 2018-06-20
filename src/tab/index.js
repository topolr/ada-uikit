import {view,View} from "adajs";
import TabService from "./state.js";

@view({
    className:"tab",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:TabService
    }
})
class Tab extends View{
}

export default Tab;
