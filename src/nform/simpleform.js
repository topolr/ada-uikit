import {view, ViewGroup, dataset} from "adajs";
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

    render(){
        console.log("===>form",this.isRenderingBy(this.formDataSet))
        return super.render();
    }
}

export default SimpleForm;