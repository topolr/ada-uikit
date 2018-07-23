import {binder, TransactDataSet, view, View} from "adajs";
import TodoService from "./state.js";

@view({
    className: "todo",
    template: "./template.html",
    style: "./style.scss",
    dataset: {
        service: TodoService,
        type: TransactDataSet
    }
})
class Todo extends View {
    @binder("add")
    add({e}) {
        if (e.keyCode === 13) {
            let value = e.target.value;
            if (value) {
                e.target.value = '';
                e.target.focus();
                this.commit("add", {name: value});
                this.dispatchEvent("commit", this.getDataSet().getTransactionList().length);
            }
        }
    }

    @binder("change")
    change({e}) {
        let value = e.target.value;
        this.getDataSet().travel(value);
    }
}

export default Todo;