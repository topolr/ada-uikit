import {dataset, root, StaticViewGroup} from "adajs";
import SimpleForm from "./../form/forms/simple";
import FormService from "./../form/datasets/form";

@root()
class Root extends StaticViewGroup {
    @dataset(FormService)
    formDataSet;

    oncreated() {
        this.render().then(() => {
            this.addChild(SimpleForm).then(() => {
                this.tableDataSet.commit("set", [
                    {type: "form/fields/text/base.js", name: "aa", value: "aa", label: "aa"}
                ])
            });
        });
    }

    onchildremoved(view) {
        console.log(view);
    }
}

export default Root;