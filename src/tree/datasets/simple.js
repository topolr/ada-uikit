import {DataSet, Service, action} from "adajs";
import util from "./util";

class TreeService extends Service {
    defaultData() {
        return [];
    }

    @action("set")
    set(old, data) {
        util.initAll(data);
        return {
            list: data
        };
    }

    @action("toggle")
    toggle(old, item) {
        item._opened = item._opened ? false : true;
        return old;
    }

    @action("active")
    active(current, item) {
        util.unactiveAll(current.list);
        item._actived = true;
        return current;
    }
}

export default TreeService;