import {pipe, View, view} from "adajs";
import SimpleService from "./datasets/simple";

@view({
    className: "simpletable",
    template: "./template/simple.html",
    style: "./style/simple.scss"
})
class SimpleTable extends View {
    @pipe(SimpleService)
    tableDataSet;
}

export default SimpleTable;