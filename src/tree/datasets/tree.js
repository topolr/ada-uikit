import {DataSet, Service, action} from "adajs";

class TreeService extends Service {
    static set(data) {
        data.forEach(item => {
            item._opened = false;
            TreeService.set(item.list);
        });
    }

    defaultData() {
        return [];
    }

    @action("set")
    set(old, data) {
        TreeService.set(data);
        return {
            list: data
        };
    }

    @action("toggle")
    toggle(old, item) {
        item._opened = item._opened ? false : true;
        return old;
    }
}

class TreeDataSet extends DataSet {
    defaultService() {
        return TreeService;
    }
}

export {
    TreeService,
    TreeDataSet
};