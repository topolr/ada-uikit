import {Service, util, View, view} from "adajs";

@view()
class Textt extends View {
    oncreated() {
        this.getElement().innerHTML = "this is content";
    }
}

class MessageboxService extends Service {
    defaultData() {
        return {
            title: "this is title",
            width: "360px",
            content: [
                {type: Textt, option: {}}
            ],
            btns: [
                {name: "close", action: "close"}
            ]
        }
    }

    onupdate(current, info) {
        util.extend(current, info);
        return current;
    };
}

export default MessageboxService;