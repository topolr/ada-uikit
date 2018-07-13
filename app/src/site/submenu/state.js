import {Service,util} from "adajs";

class SubmenuService extends Service{
	defaultData(){
		return {};
	}

	onupdate(current,data){
		return util.extend(current,data);
	}
}

export default SubmenuService;