import {dataset, root, StaticViewGroup} from "adajs";
import FlipTable from "./../table/fliptable";
import {addIcon, closeIcon} from "./../table/icons/icon";

@root()
class Root extends StaticViewGroup {
    oncreated() {
        this.addChild(FlipTable, {
            option: {
                url: "test.json",
                btns: [
                    {"name": "add", icon: addIcon},
                    {"name": "remove", icon: closeIcon}
                ],
                tableOption: {
                    rows: [
                        {name: "Name", key: "name", width: 120, align: "center", append: "middle"},
                        {name: "Sex", key: "sex", width: 120, align: "center", append: "middle"},
                        {name: "Age", key: "age", width: 120, align: "center", append: "middle"}
                    ]
                }
            }
        });
    }
}

export default Root;