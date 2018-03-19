import {view, pipe} from "adajs";
import {Form} from "./../../base";
import FormService from "./../../datasets/form";

@view({
    className: "simpleform",
    template: './template.html',
    style: "./style.scss"
})
class SimpleForm extends Form {
    @pipe(FormService)
    formDataSet;
}

export default SimpleForm;