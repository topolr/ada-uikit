import {Service, action} from "adajs";
import util from "../util/util";
import {
    addIcon,
    autoRenewIcon,
    checkBoxIcon,
    checkBoxOutlineBlankIcon,
    closeIcon,
    moreVertIcon,
    modeEditIcon
} from "./../icons/icon";

class MixService extends Service {
    defaultData() {
        return {
            head: {
                left: [
                    {key: "", name: "", width: 120, align: "center"}
                ],
                middle: [],
                right: []
            },
            rows: {
                left: [],
                middle: [],
                right: []
            },
            widths: {left: 0, middle: 0, right: 0}
        }
    }

    defaultOption() {
        return {
            rows: [],
            tools: {
                display: true,
                width: 40,
                icon: moreVertIcon,
                value: "tool",
                align:"center",
                items: [
                    {name: "remove", icon: closeIcon},
                    {name: "edit", icon: modeEditIcon}
                ]
            },
            checkbox: {
                display: true,
                width: 40,
                align:"center",
                checkedIcon: checkBoxIcon,
                uncheckedIcon: checkBoxOutlineBlankIcon
            }
        }
    }

    @action("set")
    set(current, data) {
        return util.mix(data, this.option);
    }
}

export default MixService;