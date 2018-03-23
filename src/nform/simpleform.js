import {view, ViewGroup, pipe} from "adajs";
import FormService from "./datasets/form";

@view({
    className: "simpleform",
    template: "./template/simpleform.html",
    style: "./style/simpleform.scss"
})
class SimpleForm extends ViewGroup {
    @pipe(FormService)
    formDataSet;

    oncreated() {
    }
}

export default SimpleForm;