import {Service,util} from "adajs";

class ContentService extends Service{
	defaultData(){
		return {};
	}

	onupdate(current,data){
		return util.extend(current,data);
	}
}

export default ContentService;