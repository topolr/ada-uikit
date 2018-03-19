import {View, ViewGroup, BondViewGroup, dataset} from "adajs";
import FormService from "./datasets/form";

let mixField = (superclass) => class extends superclass {
    defaultOption() {
        return {
            name: "",
            label: ""
        };
    }

    getFieldName() {
        return this.state.name;
    }

    getValue() {
        return "";
    }

    disabled() {
        return this;
    }

    undisabled() {
        return this;
    }

    check() {
        return true;
    }

    onchange(data) {
        this.state = Object.assign({}, data);
        this.render();
    }

    isField() {
        return true;
    }
};
let mixForm = (superClass) => class extends superClass {
    getValue() {
        let result = {};
        return this.getChildren().reduce((a, b) => {
            return a.then((value) => {
                Object.assign(result, value);
                let _result = b.getValue();
                if (_result.then) {
                    return _result;
                } else {
                    return Promise.resolve({[b.getFieldName()], _result});
                }
            });
        }, Promise.resolve(result)).then(() => result);
    }

    setValue(name, value) {
    }

    check() {
    }

    disabled() {
    }

    undisabled() {
    }
};

class Field extends mixField(View) {
}

class FieldGroup extends mixField(ViewGroup) {
}

class BondFieldGroup extends mixField(BondFieldGroup) {
}

class Form extends mixForm(ViewGroup) {
}

class BondForm extends mixForm(BondViewGroup) {
}

export {Field, FieldGroup, BondFieldGroup, Form, BondForm, mixForm, mixField};