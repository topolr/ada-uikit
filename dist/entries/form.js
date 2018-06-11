import {dataset, root, StaticViewGroup} from "adajs";
import SimpleForm from "../form/simpleform";
import FormService from "./../form/datasets/form";
import Input from "../form/input";
import Textarea from "../form/textarea";

@root()
class Root extends StaticViewGroup {
    @dataset(FormService)
    formDataSet;

    oncreated() {
        this.addChild(SimpleForm).then(() => {
            this.formDataSet.commit("set", [
                {type: Input, name: "aa", value: "aa", label: "aa", required: true},
                // {type: Input, name: "bb", value: "bb", label: "bb"},
                {type: Textarea, name: "cc", value: "cc", label: "cc"}
            ]);
        });
    }
}

export default Root;