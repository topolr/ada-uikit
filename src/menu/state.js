import {Service} from "adajs";

class MenuService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default MenuService;
