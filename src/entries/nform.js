import {dataset, root, StaticViewGroup} from "adajs";
import SimpleForm from "./../nform/simpleform";
import FormService from "./../nform/datasets/form";
import Input from "./../nform/input";

@root()
class Root extends StaticViewGroup {
    @dataset(FormService)
    formDataSet;

    oncreated() {
        this.render().then(() => {
            this.addChild(SimpleForm).then(() => {
                this.formDataSet.commit("set", [
                    {type: Input, name: "aa", value: "aa", label: "aa", required: true},
                    {type: Input, name: "bb", value: "bb", label: "bb"}
                ]);
            });
        });
    }
}

export default Root;