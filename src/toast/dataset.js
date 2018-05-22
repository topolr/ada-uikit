import {Service} from "adajs";

class ToaseService extends Service{
	defaultData(){
		return {
			content: "this is toast"
		}
	}
}

export default ToaseService;