import {view, View, Service} from "adajs";
import HelloService from "./service/hello";
import addBox from "./icons/add_box.icon";
import addCircle from "./icons/add_circle.icon";

@view({
    className: "hello",
    template: "./template/hello.html",
    style: "./style/hello.scss"
})
class Hello extends View {
    constructor(parameters) {
        super(parameters);
        let service = this.service = Service.getService(HelloService);
        service.connect(this);
        service.trigger("hello");
    }

    render(data) {
        data.addBox = addBox;
        data.addCircle = addCircle;
        return super.render(data);
    }

    onunload() {
        console.log("i am gone");
    }
}

export default Hello;