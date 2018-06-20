import {Service} from "adajs";

class ListService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default ListService;
