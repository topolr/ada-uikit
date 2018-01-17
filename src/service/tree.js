import {action, Service} from "adajs";

class Treeservice extends Service {
    static set(data) {
        data.forEach(item => {
            item._opened = false;
            Treeservice.set(item.list);
        });
    }

    @action("set")
    set(old, data) {
        Treeservice.set(data.list);
        return data;
    }

    @action("toggle")
    toggle(old, item) {
        item._opened = item._opened ? false : true;
        return old;
    }
}

export default Treeservice;