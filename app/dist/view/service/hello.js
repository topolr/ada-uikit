"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _desc, _value, _class;

var _adajs = require("adajs");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

let HelloService = (_dec = (0, _adajs.action)("hello"), (_class = class HelloService extends _adajs.Service {
    hello(current) {
        return Promise.resolve({ desc: "hello ::ada::" });
    }
}, (_applyDecoratedDescriptor(_class.prototype, "hello", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "hello"), _class.prototype)), _class));
exports.default = HelloService;