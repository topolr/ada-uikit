import {action, Service} from "adajs";

class Treeservice extends Service {
    static set(data) {
        data.forEach(item => {
            item._opened = false;
            Treeservice.set(item.list);
        });
    }

    @action("get")
    get(old) {
        Treeservice.set(old.list);
        return old;
    }

    @action("toggle")
    toggle(old, item) {
        item._opened = item._opened ? false : true;
        return old;
    }
}

export default Treeservice;