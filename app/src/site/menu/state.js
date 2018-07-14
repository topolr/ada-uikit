import {Service} from "adajs";
import menuIcon from "./icons/arrow.icon";

class MenuService extends Service {
    defaultData() {
        return {
            menu: []
        };
    }

    onupdate(current, data) {
        current.menu = data.menu;
        return current;
    }
}

export default MenuService;
