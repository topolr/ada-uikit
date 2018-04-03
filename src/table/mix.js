import {pipe, view, View} from "adajs";
import MixService from "./datasets/mix";

@view({
    className: "mixtable",
    template: "./template/mix.html",
    style: "./style/mix.scss"
})
class MixTable extends View {
    @pipe(MixService)
    mixDataSet;
}

export default MixTable;