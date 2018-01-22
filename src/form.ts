import {view, View} from "adajs";

export interface Field {
    getValue(): any
    setValue(val: any): void
    check(): boolean
    getName(): string
    reset(): void
    disable(): void
    undisable(): void
}
export interface Form {
    getValue(): any
    setValue(): void
    reset(): void
    disable(): void
    undisable(): void
    check(): boolean
    submit(): Promise
}

@view({
    className: "form_text",
    template: "./template/form/text.html",
    style: "./style/form/text.scss"
})
class Text extends View implements Field {

    defaultOption() {
        return {
            name: "",
            label: "",
            value: "",
            type: "text",
            placeholder: "",
            isReadonly: false,
            isRequired: false
        };
    }

    oncreated() {
        this.render(this.getOption());
    }

    getValue() {
        return this.finder("input").getElement().value;
    }

    setValue(val: any) {
        this.render(Object.assign({value: val}, this.getOption));
    }

    check() {
        return true;
    }

    getName() {
        return this.getOption.name;
    }

    reset() {
    }

    disable() {
    }

    undisable() {
    }
}

export {Field, Form, Text};