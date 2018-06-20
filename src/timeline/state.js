import {Service} from "adajs";

class TimelineService extends Service{
	defaultData(){
		return {};
	}
	
	onupdate(current,data){
		return current;
	}
}

export default TimelineService;
