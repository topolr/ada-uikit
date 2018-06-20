import {Service} from "adajs";

class TabService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default TabService;
