import {refer, View, view} from "adajs";
import SimpleService from "./datasets/simple";

@view({
    className: "simpletable",
    template: "./template/simple.html",
    style: "./style/simple.scss"
})
class SimpleTable extends View {
    @refer(SimpleService)
    tableDataSet;
}

export default SimpleTable;