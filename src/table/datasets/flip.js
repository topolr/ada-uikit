import {Service, action} from "adajs";

class FlipService extends Service {
    defaultOption() {
        return {
            pageSize: 10,
            pagesizeName: "",
            pageName: "",
            url: ""
        };
    }

    defaultData() {
        return [];
    }

    @action("goto")
    goto(current, page) {
    }
}

export default FlipService;