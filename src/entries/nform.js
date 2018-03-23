import {root, StaticViewGroup} from "adajs";
import SimpleForm from "./../nform/simpleform";
import Input from "./../nform/input";

@root()
class Root extends StaticViewGroup {
    oncreated() {
        this.render().then(() => {
            this.addChild(SimpleForm).then((form) => {
                form.formDataSet.commit("set", [
                    {type: Input, name: "aa", value: "aa", label: "aa", required: true},
                    {type: Input, name: "bb", value: "bb", label: "bb"}
                ]);
            });
        });
    }
}

export default Root;