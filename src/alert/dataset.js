import {Service} from "adajs";

class AlertService extends Service{
	defaultData(){
		return {
			content: "this is alert",
			btns: [
				{name: "close", action: "close"}
			]
		};
	}
}

export default AlertService;