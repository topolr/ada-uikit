import {Service, action} from "adajs";

class FormService extends Service {
    defaultData() {
        return {
            fields: []
        }
    }

    @action("setvalue")
    setValue(current, info) {
        current.fields.filter(field => field.name === info.name).forEach(field => field.value = info.value);
        return current;
    }

    @action("set")
    set(current, fields) {
        return {fields};
    }
}

export default FormService;