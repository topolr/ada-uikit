import {view,View} from "adajs";
import ProgressService from "./state.js";

@view({
    className:"progress",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:ProgressService
    }
})
class Progress extends View{
}

export default Progress;
