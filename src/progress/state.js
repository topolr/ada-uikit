import {Service} from "adajs";

class ProgressService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default ProgressService;
