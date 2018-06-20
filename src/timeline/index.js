import {view,View} from "adajs";
import TimelineService from "./state.js";

@view({
    className:"timeline",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:TimelineService
    }
})
class Timeline extends View{
}

export default Timeline;
