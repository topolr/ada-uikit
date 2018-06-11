import {view} from "adajs";
import Input from "./input";


@view({
    className: "formtext",
    template: "./template/textarea.html",
    style: "./style/textarea.scss"
})
class Textarea extends Input {
}

export default Textarea;