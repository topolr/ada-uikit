import {Service, action} from "adajs";

class HelloService extends Service {

    @action("hello")
    hello(current) {
        return Promise.resolve({desc: "hello ::ada::"});
    }
}

export default HelloService;