import {action, Service, util} from "adajs";
import listIcon from "./icons/list.icon";
import checkIcon from "./icons/check_box.icon";
import checkBlankIcon from "./icons/check_box_outline_blank.icon";
import removeIcon from "./icons/close.icon";

class TodoService extends Service {
    defaultData() {
        return {
            list: [],
            listIcon,
            checkIcon,
            checkBlankIcon,
            removeIcon
        };
    }

    onupdate(current, data) {
        return util.extend(current, data);
    }

    @action("add")
    add(current, item) {
        current.list.push({
            active: false,
            name: item.name,
            id: new Date().getTime()
        });
        return current;
    }

    @action("toggle")
    toggle(current, item) {
        let target = current.list.find(_item => _item.id === item.id);
        if (target) {
            target.active = !target.active;
        }
        return current;
    }

    @action("remove")
    remove(current, item) {
        let index = current.list.findIndex(_item => _item.id === item.id);
        if (index !== -1) {
            current.list.splice(index, 1);
        }
        return current;
    }
}

export default TodoService;