import {pipe, view} from "adajs";
import {Form,mixForm} from "./base";
import FormService from "./datasets/form";

@view({
    className: "simpleform",
    template: './template/simpleform.html',
    style: "./style/simpleform.scss"
})
class SimpleForm extends Form {
    @pipe(FormService)
    formDataSet;
}

export default SimpleForm;