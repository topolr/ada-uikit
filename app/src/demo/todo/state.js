import {action, Service, util} from "adajs";

class TodoService extends Service {
    defaultData() {
        return {
            list: [],
            steps: 0
        };
    }

    onupdate(current, data) {
        return util.extend(current, data);
    }

    @action("add")
    add(current, item) {
        current.list.push(item);
        return current;
    }
}

export default TodoService;