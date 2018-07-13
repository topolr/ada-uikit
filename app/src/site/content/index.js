import {view,BondViewGroup} from "adajs";
import ContentService from "./state.js";

@view({
    className:"content",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:ContentService
    }
})
class Content extends BondViewGroup{
}

export default Content;