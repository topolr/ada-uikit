"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _adajs = require("adajs");

var _hello = require("view/service/hello.js");

var _hello2 = _interopRequireDefault(_hello);

var _add_box = require("view/icons/add_box.icon");

var _add_box2 = _interopRequireDefault(_add_box);

var _add_circle = require("view/icons/add_circle.icon");

var _add_circle2 = _interopRequireDefault(_add_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Hello = (_dec = (0, _adajs.view)({className:"hello",template:"view/template/hello.html",style:"view/style/hello.scss"}), _dec(_class = class Hello extends _adajs.View {
    constructor(parameters) {
        super(parameters);
        let service = this.service = _adajs.Service.getService(_hello2.default);
        service.connect(this);
        service.trigger("hello");
    }

    render(data) {
        data.addBox = _add_box2.default;
        data.addCircle = _add_circle2.default;
        return super.render(data);
    }

    onunload() {
        console.log("i am gone");
    }
}) || _class);
exports.default = Hello;