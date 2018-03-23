import {view, ViewGroup, dataset, binder} from "adajs";
import FormService from "./datasets/form";

@view({
    className: "simpleform",
    template: "./template/simpleform.html",
    style: "./style/simpleform.scss"
})
class SimpleForm extends ViewGroup {
    @dataset(FormService)
    formDataSet;

    oncreated() {
        this.render();
    }

    render() {
        console.log("--->form", this.isRenderingBy(this.formDataSet));
        return super.render();
    }

    @binder("getValue")
    getValue() {
        console.log(this.formDataSet.getData());
    }

    @binder("submit")
    submit() {
    }

}

export default SimpleForm;