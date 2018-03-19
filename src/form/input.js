import {binder, pipe, view} from "adajs";
import {Field} from "./base";
import FormService from "./datasets/form";

@view({
    className: "forminput",
    template: "./template/input.html",
    style: "./style/input.scss"
})
class Text extends Field {
    @pipe(FormService)
    formDataSet;

    oncreated() {
        this.state = Object.assign({
            label: "text",
            name: "text",
            textType: "text",
            value: "value",
            placeholder: "",
            required: false,
            validate: {
                min: 0,
                max: 100,
                reg: ".*"
            },
            iserror: false,
            errormsg: ""
        }, this.data);
        this.render();
    }

    @binder("keyup")
    keyUp({e}) {
        this.state.value = e.target.value;
        this.check();
    }

    setValue(value) {
        this.formDataSet.commit("setvalue", {name: this.getFieldName(), value});
        return this;
    }

    getValue() {
        return this.state.value;
    }

    check() {
        let value = this.getValue();
        let result = true;
        if (this.state.required && value.length === 0) {
            result = false;
            this.state.errormsg = `field can not empty`;
        }
        if (result) {
            let reg = new RegExp(this.state.validate.reg);
            if (reg.test(value)) {
                if (!(value.length >= this.state.validate.min && value.length <= this.state.validate.max)) {
                    result = false;
                    this.state.errormsg = `length between ${this.state.validate.min} and ${this.state.validate.max}`;
                }
            } else {
                result = false;
                this.state.errormsg = `reg error`;
            }
        }
        if (!result) {
            this.state.iserror = true;
        } else {
            this.state.iserror = false;
            this.state.errormsg = "";
        }
        this.render();
        return result;
    }
}

export default Text;
