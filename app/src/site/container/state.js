import {Service} from "adajs";

class ContainerService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default ContainerService;
