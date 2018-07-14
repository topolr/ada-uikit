import {Service} from "adajs";
import menuIcon from "./icons/arrow.icon";

class MenuService extends Service{
	defaultData(){
		return {
			menuIcon
		};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default MenuService;
