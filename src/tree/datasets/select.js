import {action} from "adajs";
import SimpleService from "./simple";
import util from "./util";

class SelectService extends SimpleService {

    @action("set")
    set(old, data) {
        util.initSelectAll(data);
        return {
            list: data
        };
    }

    @action("toggleselect")
    toggleSelect(current, item) {
        util.selectCascade(current.list, item);
        return current;
    }
}

export default SelectService;