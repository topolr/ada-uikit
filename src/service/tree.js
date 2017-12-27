import {action, Service} from "adajs";

class Treeservice extends Service {
    constructor(parameters) {
        super(parameters);
        Treeservice.set(parameters.list);
    }

    static set(data) {
        data.forEach(item => {
            item._opened = false;
            Treeservice.set(item.list);
        });
    }

    @action("get")
    get(old) {
        return old;
    }

    @action("toggle")
    toggle(old, item) {
        item._opened = item._opened ? false : true;
        return old;
    }
}

export default Treeservice;