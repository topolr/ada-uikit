import {Service} from "adajs";

class StepsService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default StepsService;
