import {view,View} from "adajs";
import ListService from "./state.js";

@view({
    className:"list",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:ListService
    }
})
class List extends View{
}

export default List;
