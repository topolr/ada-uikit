import {action, Service, util} from "adajs";

class TimetravelService extends Service {
    defaultData() {
        return {
            steps: 0
        };
    }

    onupdate(current, data) {
        return util.extend(current, data);
    }

    @action("step")
    step(current, num) {
        current.steps = num;
        return current;
    }
}

export default TimetravelService;