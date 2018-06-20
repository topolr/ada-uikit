import {view,View} from "adajs";
import StepsService from "./state.js";

@view({
    className:"steps",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:StepsService
    }
})
class Steps extends View{
}

export default Steps;
