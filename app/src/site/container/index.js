import {view,ViewGroup} from "adajs";
import ContainerService from "./state.js";

@view({
    className:"container",
    template:"./template.html",
    style:"./style.scss",
    dataset:{
    	service:ContainerService
    }
})
class Container extends ViewGroup{
}

export default Container;
