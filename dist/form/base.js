import {BondViewGroup, pipe, View, ViewGroup} from "adajs";
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

    setValue() {
        return this;
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
        this.state = Object.assign(this.state || {}, data);
        this.render();
    }

    fieldable() {
        return true;
    }
};
let mixForm = (superClass) => class extends superClass {
    @pipe(FormService)
    formDataSet;

    getAllFields() {
        return this.getChildren().filter(child => child.fieldable && child.fieldable());
    }

    getFieldsByName(name) {
        return this.getAllFields().filter(child => child.getFieldName() === name);
    }

    getFieldByName(name) {
        return this.getFieldsByName()[0];
    }

    getValue() {
        return this.getAllFields().reduce((a, b) => {
            return a.then((value) => {
                let _result = b.getValue();
                if (_result.then) {
                    return _result.then(_value => {
                        Object.assign(value, {[b.getFieldName()]: _value});
                        return value;
                    });
                } else {
                    Object.assign(value, {[b.getFieldName()]: _result});
                    return Promise.resolve(value);
                }
            });
        }, Promise.resolve({}));
    }

    setValue(name, value) {
        return this.formDataSet.commit("setvalue", {name, value});
    }

    check() {
        return this.getAllFields().reduce((a, b) => {
            return a.then((value) => {
                if (value) {
                    let r = b.check();
                    if (r.then) {
                        return r;
                    } else {
                        return Promise.resolve(r);
                    }
                } else {
                    return Promise.resolve(false);
                }
            });
        }, Promise.resolve(true));
    }

    disabled() {
        this.getAllFields().forEach(child => child.disabled());
    }

    undisabled() {
        this.getAllFields().forEach(child => child.undisabled());
    }

    formable() {
        return true;
    }
};

class Field extends mixField(View) {
}

class FieldGroup extends mixField(ViewGroup) {
}

class BondFieldGroup extends mixField(BondViewGroup) {
}

class Form extends mixForm(ViewGroup) {
}

class BondForm extends mixForm(BondViewGroup) {
}

export {Field, FieldGroup, BondFieldGroup, Form, BondForm, mixForm, mixField};