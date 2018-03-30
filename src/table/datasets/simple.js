import {action, Service} from "adajs";
import util from "./../util/util";

class SimpleService extends Service {

    defaultOption() {
        return {
            rows: [
                {key: "", name: "", width: 120, align: "center"}
            ]
        }
    }

    defaultData() {
        return {
            head: [],
            rows: []
        }
    }

    @action("set")
    set(current, data) {
        return util.simple(data,this.option);
    }
}

export default SimpleService;