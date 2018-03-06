import {view, View, ViewGroup} from "adajs";
import {Mixin, mix} from "mixwith";

let Field = Mixin(base => class extends base {
    setValue() {
    }

    getValue() {
    }

    check() {
    }

    getFieldName() {
    }

    disable() {
    }

    undisable() {
    }
});
let Form = Mixin(base => class extends base {
    getValue() {
        return Promise.resolve({});
    }

    setValue() {
    }

    submit() {
    }
});

@view({
    className: "text",
    template: "./template/text.html",
    style: "./style/text.scss"
})
class Text extends mix(View).with(Field) {
    oncreated() {
        this.watch(this.getOption());
        this.render();
    }
}

@view({
    className: "form",
    template: "./template/listform.html",
    style: "./style/listform.scss"
})
class ListForm extends mix(ViewGroup).with(Form) {
    oncreated() {
        this.watch(this.getOption());
        this.render();
    }

    defaultOption() {
        return {
            fields: []
        }
    }
}

export {Field, Form, Text};