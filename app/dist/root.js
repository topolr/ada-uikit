"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _adajs = require("adajs");

var _hello = require("view/hello.js");

var _hello2 = _interopRequireDefault(_hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Root = (_dec = (0, _adajs.root)(), _dec(_class = class Root extends _adajs.StaticViewGroup {
    constructor(option) {
        super(option);
        this.addChild(_hello2.default);
    }
}) || _class);
exports.default = Root;