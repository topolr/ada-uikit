import {action, Service} from "adajs";
import menu from "./../../menu.json";

class ContainerService extends Service {
    defaultData() {
        menu[0].active = true;
        menu[0].list[0].active = true;
        menu[0].list[0].list[0].active = true;
        return {
            menu,
            current: menu[0]
        };
    }

    onupdate(current, data) {
        return current;
    }

    resetItem(list) {
        list.forEach(item => {
            item.active = false;
            if (item.list) {
                this.resetItem(item.list);
            }
        });
    }

    @action("open")
    open(current, item) {
        let target = current.menu.find(_item => _item.name === item.name);
        if (target) {
            this.resetItem(current.menu);
            target.active = true;
            target.list[0].active = true;
            target.list[0].list[0].active = true;
            current.current = target;
        }
        return current;
    }
}

export default ContainerService;
