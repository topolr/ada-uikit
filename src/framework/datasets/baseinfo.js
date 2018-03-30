import {Service} from "adajs";

class BaseInfoService extends Service {
    defaultData() {
        return {
            user: {
                username: ""
            },
            menu: [
                {name: "menu1", link: "/menu1", type: ""}
            ],
            app: {
                logo: "",
                name: "",
                copyright: ""
            }
        }
    }
}

export default BaseInfoService;