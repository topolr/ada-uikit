import {Service, action} from "adajs";

class FormService extends Service {
    defaultData() {
        return {
            fields: []
        }
    }

    getFieldByName(current, name) {
        return current.fields.filter(field => field.name === name)[0];
    }

    setFieldStateByName(current, name, state) {
        let field = this.getFieldByName(current, name);
        if (field) {
            Object.assign(field, state);
        }
        return current;
    }

    @action("set")
    set(current, fields) {
        current.fields = fields;
        return current;
    }

    @action("setstate")
    setState(current, info) {
        current = this.setFieldStateByName(current, info.name, info);
        return current;
    }
}

export default FormService;