/*! adajs 1.0.2 https://github.com/topolr/ada | https://github.com/topolr/ada/blob/master/LICENSE */
(function (map,moduleName) {var Installed={};var requireModule = function (index) {if (Installed[index]) {return Installed[index].exports;}var module = Installed[index] = {exports: {}};map[index].call(module.exports, module, module.exports, requireModule);return module.exports;};var mod=requireModule(0);window&&window.Ada.installModule(moduleName,mod);})([function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.binder = exports.handler = exports.root = exports.view = exports.post = exports.get = exports.ajax = exports.action = exports.DispatchService = exports.Service = exports.BondViewGroup = exports.StaticViewGroup = exports.ViewGroup = exports.View = undefined;

var _metadata = require(1);

var _metadata2 = _interopRequireDefault(_metadata);

var _request = require(2);

var _view = require(3);

var _loader = require(4);

var _loader2 = _interopRequireDefault(_loader);

var _service = require(5);

var _factory = require(6);

var _factory2 = _interopRequireDefault(_factory);

var _client = require(7);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ada = {
    modules: _loader.Modules,
    boot: _factory2.default.boot,
    unpack(info) {
        _loader2.default.decompress(info);
    },
    installModule(name, module) {
        _loader.Modules.set(name, module);
    }
};
window.Ada = ada;
_client2.default.start();
exports.View = _view.View;
exports.ViewGroup = _view.ViewGroup;
exports.StaticViewGroup = _view.StaticViewGroup;
exports.BondViewGroup = _view.BondViewGroup;
exports.Service = _service.Service;
exports.DispatchService = _service.DispatchService;
exports.action = _service.action;
exports.ajax = _request.ajax;
exports.get = _request.get;
exports.post = _request.post;
exports.view = _view.view;
exports.root = _view.root;
exports.handler = _view.handler;
exports.binder = _view.binder;
exports.default = ada;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const METADATAKEY = "[[metadata]]";
Reflect.defineMetadata = function (metadataKey, metadataValue, target) {
    if (Reflect.ownKeys(target).indexOf(METADATAKEY) === -1) {
        Reflect.defineProperty(target, METADATAKEY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: {}
        });
    }
    target[METADATAKEY][metadataKey] = metadataValue;
};
Reflect.hasMetadata = function (metadataKey, target) {
    let current = target,
        has = false;
    while (current) {
        if (Reflect.ownKeys(current).indexOf(METADATAKEY) !== -1 && current[METADATAKEY][metadataKey]) {
            has = true;
            break;
        }
        current = Reflect.getPrototypeOf(current);
    }
    return has;
};
Reflect.hasOwnMetadata = function (metadataKey, target) {
    return Reflect.ownKeys(target).indexOf(METADATAKEY) !== -1 && target[METADATAKEY][metadataKey] !== undefined;
};
Reflect.getMetadata = function (metadataKey, target) {
    let current = target,
        result = undefined;
    while (current) {
        if (Reflect.ownKeys(current).indexOf(METADATAKEY) !== -1) {
            result = current[METADATAKEY][metadataKey];
            break;
        }
        current = Reflect.getPrototypeOf(current);
    }
    return result;
};
Reflect.getOwnMetadata = function (metadataKey, target) {
    if (Reflect.ownKeys(target).indexOf(METADATAKEY) !== -1) {
        return target[METADATAKEY][metadataKey];
    } else {
        return undefined;
    }
};
Reflect.getMetadataKeys = function (target) {
    let current = target,
        result = [{}];
    while (current) {
        if (Reflect.ownKeys(current).indexOf(METADATAKEY) !== -1) {
            result.push(current[METADATAKEY]);
        }
        current = Reflect.getPrototypeOf(current);
    }
    if (result.length > 1) {
        return Reflect.ownKeys(Object.assign(...result)).map(key => key);
    } else {
        return [];
    }
};
Reflect.getOwnMetadataKeys = function (target) {
    if (target[METADATAKEY]) {
        return Reflect.ownKeys(target[METADATAKEY]).map(key => key);
    } else {
        return [];
    }
};
Reflect.deleteMetadata = function (metadataKey, target) {
    if (target[METADATAKEY]) {
        Reflect.deleteProperty(target[METADATAKEY], metadataKey);
    }
};

exports.default = {};},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = exports.get = exports.ajax = undefined;

var _util = require(8);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EVENTYPES = ["readystatechange", "loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];

let request = class request {
    constructor({
        data = {},
        url = "",
        method = "post",
        dataType = "text",
        async = true,
        timeout = 3000000,
        headers = {},
        events = {},
        mimeType = ''
    }) {
        this.option = arguments[0];
        let _xhr = new XMLHttpRequest();
        this._xhr = _xhr;
        if (mimeType) {
            _xhr.overrideMimeType(mimeType);
        }
        if (method === "get") {
            let querystr = _util2.default.queryString(data);
            url += url.indexOf("?") !== -1 ? querystr === "" ? "" : "&" + querystr : querystr === "" ? "" : "?" + querystr;
        } else {
            data = _util2.default.postData(data);
        }
        _xhr.open(method, url, async);
        if (async) {
            _xhr.responseType = dataType === "json" ? "text" : dataType;
            _xhr.timeout = timeout;
        }
        EVENTYPES.forEach(type => {
            _xhr.addEventListener(type, e => {
                let deal = events[e.type];
                deal && deal.call(this, e);
            }, false);
        });
        _xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        for (let i in headers) {
            _xhr.setRequestHeader(i, headers[i]);
        }
        if (_util2.default.isQueryString(data)) {
            _xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        _xhr.send(data);
    }
};


function ajax(option = {}) {
    return new Promise((resolve, reject) => {
        option.events = Object.assign({
            error(e) {
                reject(e);
            },
            load(e) {
                let status = this._xhr.status;
                if (status >= 200 && status < 300 || status === 304 || status === 0) {
                    let result = this._xhr.response;
                    if (this.option.dataType === "json") {
                        try {
                            result = JSON.parse(this._xhr.responseText);
                        } catch (e) {
                            throw Error("[topolr] ajax unvaliable json string,url is '" + option.url + "' " + e);
                        }
                    }
                    resolve(result);
                } else {
                    reject(e);
                }
            }
        }, option.events);
        new request(option);
    });
}
function get(url, data = {}) {
    return ajax({ url, data, method: "get" });
}
function post(url, data = {}) {
    return ajax({ url, data, method: "post", dataType: "json" });
}

exports.ajax = ajax;
exports.get = get;
exports.post = post;
exports.default = request;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BondViewGroup = exports.StaticViewGroup = exports.ViewGroup = exports.View = exports.binder = exports.handler = exports.root = exports.view = undefined;

var _metadata = require(1);

var _metadata2 = _interopRequireDefault(_metadata);

var _ddm2 = require(9);

var _ddm3 = _interopRequireDefault(_ddm2);

var _util = require(8);

var _util2 = _interopRequireDefault(_util);

var _factory = require(6);

var _factory2 = _interopRequireDefault(_factory);

var _const = require(10);

var _macros = require(11);

var _macros2 = _interopRequireDefault(_macros);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function view(info = null) {
    return function (target) {
        Reflect.defineMetadata("view", info || {}, target.prototype);
    };
}

function root(info = null) {
    return function (target) {
        Reflect.defineMetadata("root", info || {}, target.prototype);
    };
}

function handler(name) {
    if (name) {
        return function (target, methodName, descriptor) {
            let info = Reflect.getMetadata("handler", target) || {};
            name.split(",").forEach(key => info[key] = methodName);
            Reflect.defineMetadata("handler", info, target);
        };
    } else {
        throw Error('handler name can not empty');
    }
}

function binder(name) {
    if (name) {
        return function (target, methodName, descriptor) {
            let info = Reflect.getMetadata("binder", target) || {};
            name.split(",").forEach(key => info[key] = methodName);
            Reflect.defineMetadata("binder", info, target);
        };
    } else {
        throw Error('handler name can not empty');
    }
}

_ddm3.default.setDefaultMacro("icon", function ({ attrs }) {
    let str = `<svg class="${attrs.class || "ada-icon"}"><use xlink:href="#${attrs.id}"></use></svg>`;
    return { template: str, props: {} };
});

let ViewEvent = class ViewEvent {
    constructor(target, type, data) {
        this.target = target;
        this.data = data;
        this.type = type;
        this._goon = true;
        this.currentTarget = null;
    }

    stopPropagation() {
        this._goon = false;
    }
};
let View = class View {
    constructor({ template = "", parent = null, option = {}, dom = window.document.body }) {
        _util2.default.setProp(this, _const.TEMPLATETAG, template);
        _util2.default.setProp(this, _const.PARENTVIEWTAG, parent);
        _util2.default.setProp(this, _const.ELEMENTTAG, dom);
        _util2.default.setProp(this, _const.OPTIONTAG, option);
        _util2.default.setProp(this, _const.IDNAME, _util2.default.randomid(10));
    }

    onunload() {}

    onoptionchange() {}

    getTemplateText() {
        return this[_const.TEMPLATETAG];
    }

    getElement() {
        return this[_const.ELEMENTTAG];
    }

    getDDMContainer() {
        return this[_const.ELEMENTTAG];
    }

    getDDM() {
        return this[_const.DDMTAG];
    }

    getParent() {
        return this[_const.PARENTVIEWTAG];
    }

    getOption() {
        return this[_const.OPTIONTAG];
    }

    getId() {
        return this[_const.IDNAME];
    }

    render(data) {
        this._render(data, {}, {});
        return Promise.resolve();
    }

    isRemoved() {
        return this._isremoved === true;
    }

    triggerEvent(e) {
        e.currentTarget = this;
        let handlerInfo = Reflect.getMetadata("handler", this.constructor.prototype);
        if (handlerInfo && handlerInfo[e.type]) {
            return this[handlerInfo[e.type]](e);
        } else {
            return true;
        }
    }

    dispatchEvent(type, data, isdefault = true) {
        let event = new ViewEvent(this, type, data);
        if (isdefault === true) {
            let i = this;
            while (i) {
                i.triggerEvent(event);
                if (event._goon) {
                    i = i.getParent();
                } else {
                    break;
                }
            }
        } else {
            this.triggerEvent(event);
            if (!this.isRemoved()) {
                if (event._goon && (this instanceof ViewGroup || this instanceof StaticViewGroup)) {
                    this.getChildren().forEach(child => {
                        if (!this.isRemoved()) {
                            child.dispatchEvent(type, data, false);
                        } else {
                            return false;
                        }
                    });
                }
            }
        }
    }

    getCurrentState() {
        return this[_const.CURRENTSTATE];
    }

    refresh() {
        this.render(this.getCurrentState());
    }

    _render(data, binders, macro) {

        if (!this.isRemoved()) {
            try {
                if (!this.getDDM()) {
                    let _ddm = new _ddm3.default({
                        id: this.getId(),
                        container: this.getDDMContainer(),
                        templateStr: this.getTemplateText(),
                        binders: ({ method, parameters }) => {
                            let info = Reflect.getMetadata("binder", this.constructor.prototype);
                            if (info) {
                                let _method = info[method];
                                if (_method && this[_method]) {
                                    this[_method](parameters);
                                }
                            }
                        },
                        macro
                    });
                    _util2.default.setProp(this, _const.DDMTAG, _ddm);
                    _ddm.render(data);
                } else {
                    this.getDDM().render(data);
                }
                _util2.default.setProp(this, _const.CURRENTSTATE, data);
            } catch (e) {
                let info = null;
                if (Reflect.hasMetadata("root", this.constructor.prototype)) {
                    info = Reflect.getMetadata("root", this.constructor.prototype);
                } else {
                    info = Reflect.getMetadata("view", this.constructor.prototype);
                }
                console.error(`[ada] view rendered error template is [${info.template}] class is [${this.constructor.name}] =>`, e.message);
            }
        }
    }

    _remove() {
        if (!this.isRemoved()) {
            let parent = this.getParent();
            if (parent) {
                if (parent.onchildremoved) {
                    parent.onchildremoved(this);
                }
                parent.getChildren().splice(parent.getChildren().indexOf(this), 1);
                this.onunload && this.onunload();
                Reflect.deleteProperty(this.getElement(), _const.VIEWTAG);
                Reflect.ownKeys(this).forEach(key => {
                    this[key] = null;
                });
                this._isremoved = true;
            }
        }
    }
};
let ViewGroup = class ViewGroup extends View {
    constructor(option = {}) {
        super(option);
        _util2.default.setProp(this, _const.CHILDRENTAG, []);
    }

    onchildremoved() {}

    onchildadded() {}

    render(data) {
        this._render(data, {}, _macros2.default);
        return this._refresh();
    }

    getChildAt(index = 0) {
        return this[_const.CHILDRENTAG][index];
    }

    getChildByType(type) {
        if (type) {
            return this.getChildren().filter(child => child instanceof type);
        } else {
            return [];
        }
    }

    getChildren() {
        return this[_const.CHILDRENTAG];
    }

    _refresh() {
        return _util2.default.queue(this.getDDM().modules().map(item => () => {
            let cache = item.element()[_const.VIEWTAG],
                props = item.getAttributes();
            let clazz = props["type"],
                option = props["option"];
            if (!cache || cache.constructor !== clazz || cache.isRemoved()) {
                return _factory2.default.getViewInstance(clazz, option, this, item.element()).then(_view => {
                    this.onchildadded && this.onchildadded(_view);
                    return _view;
                });
            } else {
                if (cache && !_util2.default.isEqual(cache.getOption(), option)) {
                    cache.onoptionchange(option);
                }
                return Promise.resolve(cache);
            }
        })).then(children => {
            this[_const.CHILDRENTAG].push(...children);
        });
    }
};
let StaticViewGroup = class StaticViewGroup extends ViewGroup {
    constructor(option = {}) {
        super(option);
    }

    render(data) {
        this._render(data, {}, {});
        return Promise.resolve();
    }

    addChild(type = null, { option = {}, container = null, attrs = {} } = {}) {
        if (!container) {
            container = window.document.body;
        }
        let _dom = document.createElement("div");
        _dom.setAttribute("data-module", `out:${this.getId()}`);
        Reflect.ownKeys(attrs).forEach(attr => _dom.setAttribute(attr, attrs[attr]));
        container.appendChild(_dom);
        return _factory2.default.getViewInstance(type, option, this, _dom).then(view => {
            this.getChildren().push(view);
            this.onchildadded && this.onchildadded(view);
            return view;
        });
    }

    removeChild(view) {
        let index = this.getChildren().indexOf(view);
        if (index !== -1) {
            view.getElement().parentNode.removeChild(view.getElement());
        }
        return this;
    }

    removeChildAt(index = 0) {
        let view = this.getChildren()[index];
        if (view) {
            this.removeChild(view);
        }
        return this;
    }

    removeAllChild() {
        let children = this.getChildren();
        while (children && children.length > 0) {
            this.removeChild(children[0]);
        }
        return this;
    }

    removeChildByType(type) {
        if (type) {
            let children = this.getChildByType(type);
            while (children.length > 0) {
                this.removeChild(children[0]);
            }
        }
        return this;
    }
};
let BondViewGroup = class BondViewGroup extends ViewGroup {
    constructor(option) {
        super(option);
        let ddmcontainer = document.createElement("div");
        this.getElement().appendChild(ddmcontainer);
        _util2.default.setProp(this, _const.DDMCONTAINER, ddmcontainer);
    }

    getDDMContainer() {
        return this[_const.DDMCONTAINER];
    }

    render(data) {
        this._render(data, {}, _macros2.default);
        return this._refresh();
    }

    addChild(type = null, { option = {}, container = null, attrs = {} } = {}) {
        if (!container) {
            container = window.document.body;
        }
        let _dom = document.createElement("div");
        _dom.setAttribute("data-module", `out:${this.getId()}`);
        Reflect.ownKeys(attrs).forEach(attr => _dom.setAttribute(attr, attrs[attr]));
        if (!this.getDDMContainer().contains(container)) {
            container.appendChild(_dom);
            return _factory2.default.getViewInstance(type, option, this, _dom).then(view => {
                this.getChildren().push(view);
                this.onchildadded && this.onchildadded(view);
                return view;
            });
        } else {
            throw Error("[ada] BondViewGroup can not append child in the DDM container element");
        }
    }

    removeChild(view) {
        let index = this.getChildren().indexOf(view);
        if (index !== -1) {
            if (!this.getDDMContainer().contains(view.getElement())) {
                view.getElement().parentNode.removeChild(view.getElement());
            } else {
                throw Error("[ada] BondViewGroup can not remove child in the DDM container");
            }
        }
        return this;
    }

    removeChildByType(type) {
        if (type) {
            let children = this.getChildByType(type);
            while (children.length > 0) {
                this.removeChild(children[0]);
            }
        }
        return this;
    }
};
exports.view = view;
exports.root = root;
exports.handler = handler;
exports.binder = binder;
exports.View = View;
exports.ViewGroup = ViewGroup;
exports.StaticViewGroup = StaticViewGroup;
exports.BondViewGroup = BondViewGroup;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Option = exports.Source = exports.ActiveSource = exports.Modules = undefined;

var _request = require(2);

var _util = require(8);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Option = {
    basePath: "",
    sourceMap: "",
    develop: true
};

const Persistence = {
    target: null,
    get() {
        if (!Persistence.target) {
            let target;
            if (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB) {
                target = Persistence.database;
            } else if (window.localStorage) {
                target = Persistence.storage;
            } else {
                target = Persistence.empty;
            }
            Persistence.target = target;
        }
        return Persistence.target;
    },
    empty: {
        getAll: function () {
            return Promise.resolve({});
        },
        saveAll: function (data) {
            return Promise.resolve();
        },
        clean: function () {
            return Promise.resolve();
        }
    },
    storage: {
        getAll: function () {
            var r = {};
            try {
                r = window.localStorage.getItem("ada-local-source");
            } catch (e) {}
            return Promise.resolve(r);
        },
        saveAll: function (data) {
            try {
                window.localStorage.setItem("ada-local-source", window.JSON.stringify(data));
            } catch (e) {}
            return Promise.resolve();
        },
        clean: function () {
            try {
                window.localStorage.removeItem("ada-local-source");
            } catch (e) {}
            return Promise.resolve();
        }
    },
    database: {
        db: null,
        info: {
            name: "ada",
            version: 1,
            store: "ada-local-source",
            key: "name",
            value: "local"
        },
        ready: function () {
            if (!Persistence.database.db) {
                if (!window.indexedDB) {
                    window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB;
                }
                return new Promise(resolve => {
                    let request = indexedDB.open(Persistence.database.info.name, Persistence.database.info.version);
                    request.onupgradeneeded = function (event) {
                        let db = request.result;
                        if (db.objectStoreNames.contains(Persistence.database.info.store)) {
                            db.deleteObjectStore(Persistence.database.info.store);
                        }
                        let store = db.createObjectStore(Persistence.database.info.store, { keyPath: Persistence.database.info.key });
                        store.put({ name: Persistence.database.info.value, data: {} });
                    };
                    request.onsuccess = function (e) {
                        Persistence.database.db = request.result;
                        resolve();
                    };
                    request.onerror = function () {
                        resolve();
                    };
                });
            } else {
                return Promise.resolve();
            }
        },
        getAll: function () {
            return new Promise(resolve => {
                this.ready().then(() => {
                    let transaction = Persistence.database.db.transaction([Persistence.database.info.store], "readwrite");
                    transaction.onerror = function (event) {
                        resolve({});
                    };
                    let request = transaction.objectStore(Persistence.database.info.store).get(Persistence.database.info.value);
                    request.onerror = function (event) {
                        resolve({});
                    };
                    request.onsuccess = function (event) {
                        resolve(request.result ? request.result.data : {});
                    };
                });
            });
        },
        saveAll: function (data) {
            return new Promise(resolve => {
                this.ready().then(() => {
                    let transaction = Persistence.database.db.transaction([Persistence.database.info.store], "readwrite");
                    transaction.oncomplete = function (event) {
                        resolve();
                    };
                    transaction.onerror = function (event) {
                        resolve();
                    };
                    transaction.objectStore(Persistence.database.info.store).put({
                        name: Persistence.database.info.value,
                        data: data
                    });
                });
            });
        },
        clean: function () {
            return new Promise(resolve => {
                this.ready().then(() => {
                    let transaction = Persistence.database.db.transaction([Persistence.database.info.store], "readwrite");
                    transaction.oncomplete = function (event) {
                        resolve();
                    };
                    transaction.onerror = function (event) {
                        resolve();
                    };
                    transaction.objectStore(Persistence.database.info.store).delete(Persistence.database.info.value);
                });
            });
        }
    }
};
const ModuleLoader = {
    installed: {},
    moduleFnsLoaded: {},
    getExcutor(path, code) {
        let suffix = path.split("/").pop().split(".").pop();
        let source = code;
        if (suffix === "js") {
            source = code;
        } else if (suffix === "css" || suffix === "scss" || suffix === "less") {
            source = `if(!document.getElementById("${path}")){var _a = document.createElement("style");_a.setAttribute("media", "screen");_a.setAttribute("type", "text/css");_a.setAttribute("id","${path.replace(/\//g, "-")}");_a.appendChild(document.createTextNode(${JSON.stringify(code)}));document.getElementsByTagName("head")[0].appendChild(_a);}module.exports={};`;
        } else if (suffix === "json") {
            source = `module.exports=${code}`;
        } else if (suffix === "html" || suffix === "text") {
            source = `module.exports=JSON.stringify(${code})`;
        } else {
            source = code;
        }
        source += `//# sourceURL=${Option.basePath}/${path}`;
        return new Function("module", "exports", "require", "imports", source);
    },
    getModuleDependenceInfo(path, code) {
        let paths = [];
        code = code.replace(/require\(.*?\)/g, one => {
            let _path = one.substring(8, one.length - 1).replace(/['|"|`]/g, "").trim();
            paths.push(_path);
            return `require("${_path}")`;
        });
        return { code, paths };
    },
    getModuleDependenceMap(path) {
        return Source.get(path).then(source => {
            let { paths, code: moduleCode } = ModuleLoader.getModuleDependenceInfo(path, source);
            let result = { [path]: moduleCode };
            let works = [];
            paths.map(path => {
                if (!ModuleLoader.installed[path]) {
                    works.push(ModuleLoader.getModuleDependenceMap(path));
                }
            });
            return Promise.all(works).then(maps => {
                Object.assign(result, ...maps);
                return result;
            });
        });
    },
    excute(path) {
        if (ModuleLoader.installed[path]) {
            return ModuleLoader.installed[path].exports;
        }
        let module = ModuleLoader.installed[path] = {
            path: path,
            exports: {}
        };
        ModuleLoader.moduleFnsLoaded[path].call(module.exports, module, module.exports, ModuleLoader.excute, path => {
            return ModuleLoader.load(path).then(_result => _result.__esModule ? _result.default : _result);
        });
        return module.exports;
    },
    load(path) {
        let current = ModuleLoader.installed[path];
        if (current) {
            return Promise.resolve(current.exports);
        } else {
            return ModuleLoader.getModuleDependenceMap(path).then(moduleMap => {
                for (let i in moduleMap) {
                    ModuleLoader.moduleFnsLoaded[i] = ModuleLoader.getExcutor(i, moduleMap[i]);
                }
                return ModuleLoader.excute(path);
            });
        }
    }
};
const Modules = {
    excute(path) {
        return ModuleLoader.load(path);
    },
    scan(fn) {
        if (fn) {
            for (let i in ModuleLoader.installed) {
                let a = ModuleLoader.installed[i];
                let r = fn(i, a.exports);
                if (r === false) {
                    break;
                }
            }
        }
    },
    scanClass(fn) {
        if (fn) {
            for (let i in ModuleLoader.installed) {
                let a = ModuleLoader.installed[i];
                if (!a.exports.__esModule && _util2.default.isFunction(a.exports)) {
                    if (fn(i, a.exports) === false) {
                        break;
                    }
                }
                for (let t in a.exports) {
                    let e = a.exports[t];
                    if (_util2.default.isFunction(e)) {
                        if (fn(i, e) === false) {
                            break;
                        }
                    }
                }
            }
        }
    },
    filter(fn) {
        let result = [];
        if (fn) {
            for (let i in ModuleLoader.installed) {
                let a = ModuleLoader.installed[i];
                let r = fn(i, a.exports.__esModule ? a.exports.default : a.exports);
                if (r !== undefined) {
                    result.push(r);
                }
            }
        }
        return result;
    },
    get(path) {
        let a = ModuleLoader.installed[path];
        if (a) {
            return a.exports.__esModule ? a.exports.default : a.exports;
        }
        return null;
    },
    has(path) {
        return ModuleLoader.installed[path] !== undefined;
    },
    set(path, _exports) {
        ModuleLoader.installed[path] = { exports: _exports };
        return this;
    }
};

const Source = {
    isinit: false,
    source: {},
    ready() {
        if (!this.isinit) {
            return Persistence.get().getAll().then(source => {
                this.source = Object.assign({}, source, this.source);
                return Persistence.target.saveAll(this.source);
            });
        } else {
            return Promise.resolve();
        }
    },
    get(path) {
        return this.ready().then(() => {
            return this.getSource(path);
        });
    },
    decompress(source = {}) {
        if (!this.source) {
            this.source = {};
        }
        Object.assign(this.source, source);
    },
    getRealPath(path, ispackage = false) {
        let r = path,
            hash = "";
        if (ispackage) {
            hash = Option.sourceMap[path.split(".").shift()];
        } else {
            hash = Option.sourceMap[_util2.default.getMappedPath(path)];
        }
        if (!Option.develop) {
            let a = path.split("/");
            let b = a.pop();
            let c = b.split(".");
            a.push(`${hash}.${c[1]}`);
            r = a.join("/");
        } else {
            r = `${path}?h=${new Date().getTime()}`;
        }
        return `${Option.basePath[Option.basePath.length - 1] === "/" ? Option.basePath : Option.basePath + "/"}${r}`;
    },
    getSource(filepath) {
        let path = _util2.default.getMappedPath(filepath);
        if (this.source[path]) {
            let hash = this.source[path].hash,
                rhash = Option.sourceMap[path];
            if (hash && rhash) {
                if (rhash === hash) {
                    return this.source[path].code;
                } else {
                    let r = 0;
                    let file = Reflect.ownKeys(Option.sourceMap.packages).filter(packetname => {
                        return Option.sourceMap.packages[packetname].indexOf(rhash) !== -1;
                    })[0];
                    Option.sourceMap.packages[file].split("|").forEach(key => {
                        let name = Reflect.ownKeys(Option.sourceMap).filter(name => Option.sourceMap[name] === key)[0];
                        if (!this.source[name] || this.source[name].hash !== key) {
                            r += 1;
                        }
                    });
                    if (r > 1) {
                        return (0, _request.get)(`${this.getRealPath(file + ".js", true)}`).then(code => {
                            let info = JSON.parse(code.substring(11, code.length - 1));
                            Object.assign(this.source, info);
                            return Persistence.get().saveAll(this.source).then(() => {
                                return this.source[path].code;
                            });
                        });
                    } else {
                        return (0, _request.get)(`${this.getRealPath(filepath)}`).then(code => {
                            this.source[path] = { code, hash: rhash };
                            return Persistence.get().saveAll(this.source).then(() => code);
                        });
                    }
                }
            } else {
                return (0, _request.get)(`${this.getRealPath(filepath)}`);
            }
        } else {
            if (Option.sourceMap) {
                let rhash = Option.sourceMap[path];
                let file = Reflect.ownKeys(Option.sourceMap.packages).filter(packetname => {
                    return Option.sourceMap.packages[packetname].indexOf(rhash) !== -1;
                })[0];
                return (0, _request.get)(`${this.getRealPath(file + ".js", true)}`).then(code => {
                    let info = JSON.parse(code.substring(11, code.length - 1));
                    Object.assign(this.source, info);
                    return Persistence.get().saveAll(this.source).then(() => {
                        return this.source[path].code;
                    });
                });
            } else {
                return (0, _request.get)(`${this.getRealPath(filepath)}`);
            }
        }
    }
};

const ActiveSource = {
    cache: {},
    excute(path) {
        if (!this.cache[path]) {
            return Source.get(path).then(code => {
                this.cache[path] = code;
                return code;
            });
        } else {
            return Promise.resolve(this.cache[path]);
        }
    },
    has(path) {
        return this.cache[path] !== undefined;
    }
};

const exportSource = {
    setOption(option) {
        Object.assign(Option, option);
    },
    loadModule(path) {
        return Modules.excute(path);
    },
    loadSource(path) {
        return ActiveSource.excute(path);
    },
    decompress(info = {}) {
        Source.decompress(info);
    }
};

exports.Modules = Modules;
exports.ActiveSource = ActiveSource;
exports.Source = Source;
exports.Option = Option;
exports.default = exportSource;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.action = exports.DispatchService = exports.Service = undefined;

var _metadata = require(1);

var _metadata2 = _interopRequireDefault(_metadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function action(name) {
    if (name) {
        return function (target, methodName, descriptor) {
            let info = Reflect.getMetadata("action", target) || {};
            name.split(",").forEach(key => info[key] = methodName);
            Reflect.defineMetadata("action", info, target);
        };
    } else {
        throw Error('trigger name can not empty');
    }
}

let Service = class Service {
    constructor() {}

    static getService(serviceClass, data) {
        return new ServiceWapper(serviceClass, data);
    }
};
let DispatchService = class DispatchService extends Service {
    constructor(wapper) {
        super();
        this._wrapper = wapper;
    }

    dispatch(data) {
        this._wrapper._data = data;
        this._wrapper.dispatch();
    }
};
let ServiceWapper = class ServiceWapper {

    constructor(serviceClass, data) {
        if (serviceClass.prototype instanceof Service) {
            this._listeners = [];
            this._data = data || {};
            this._service = new serviceClass(this);
        } else {
            throw Error("[ada] must be a Service class");
        }
    }

    connect(view) {
        if (this._listeners.indexOf(view) === -1) {
            this._listeners.push(view);
        }
        return this;
    }

    disconnect(view) {
        this._listeners.splice(this._listeners.indexOf(view), 1);
        return this;
    }

    trigger(type, data) {
        let actionInfo = Reflect.getMetadata("action", this._service.constructor.prototype);
        if (actionInfo) {
            let method = actionInfo[type];
            if (method && this._service[method]) {
                let result = this._service[method](this.getState(), data);
                if (result && result.then) {
                    return result.then(info => {
                        this._data = info || {};
                        this.dispatch();
                        return info;
                    });
                } else {
                    this._data = result || {};
                    this.dispatch();
                    return Promise.resolve(result);
                }
            }
        }
        console.warn(`[ada] service action is undefind name is ${type}`);
        return Promise.reject();
    }

    getState() {
        return this._data;
    }

    dispatch() {
        this._listeners = this._listeners.filter(view => {
            if (!view.isRemoved()) {
                view.render(this.getState());
                return true;
            } else {
                return false;
            }
        });
    }
};
exports.Service = Service;
exports.DispatchService = DispatchService;
exports.action = action;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _metadata = require(1);

var _metadata2 = _interopRequireDefault(_metadata);

var _loader = require(4);

var _loader2 = _interopRequireDefault(_loader);

var _const = require(10);

var _util = require(8);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let factory = {
    cleanView(target) {
        if (target.querySelectorAll) {
            [target, ...target.querySelectorAll("[data-module]")].reverse().forEach(module => {
                module[_const.VIEWTAG] && module[_const.VIEWTAG]._remove && module[_const.VIEWTAG]._remove();
            });
        }
    },
    getViewInstance(viewClass, option, parent, dom, tag = "view") {
        let info = Reflect.getMetadata(tag, viewClass.prototype);
        let text = "",
            ps = Promise.resolve();
        if (info.template) {
            ps = ps.then(() => _loader2.default.loadSource(info.template).then(code => {
                text = _util2.default.parseTemplate(code, info.className);
            }));
        }
        if (info.style) {
            ps = ps.then(() => _loader2.default.loadSource(info.style).then(code => {
                _util2.default.excuteStyle(_util2.default.parseStyle(code, info.className), `${info.style.replace(/\//g, "-")}:${info.className}`);
            }));
        }
        return ps.then(() => {
            let ops = {
                option,
                template: text,
                parent: parent,
                dom
            };
            if (info.className) {
                dom.classList.add(info.className);
            }
            let _view = new viewClass(ops);
            _util2.default.setProp(dom, _const.VIEWTAG, _view);
            return _view;
        });
    },
    getRootView(viewClass, option = {}) {
        let root = window.document.body[_const.VIEWTAG];
        if (!root) {
            return factory.getViewInstance(viewClass, option, null, window.document.body, "root");
        }
        return Promise.resolve(root);
    },
    boot({ root = "", basePath = "", option = {}, map = {}, develop = true } = {}) {
        _loader2.default.setOption({ basePath, sourceMap: map, develop });
        if (root.indexOf("./") === 0) {
            root = root.substring(2);
        }
        if (root.indexOf("/") === 0) {
            root = root.substring(1);
        }
        return _loader2.default.loadModule(root).then(view => {
            let rootClass = null;
            _loader.Modules.scanClass((path, module) => {
                let info = Reflect.getMetadata("root", module.prototype);
                if (info) {
                    rootClass = module;
                    return false;
                }
            });
            if (rootClass) {
                return factory.getRootView(rootClass, option).then(view => {
                    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    if (MutationObserver) {
                        new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutation) {
                                [...mutation.removedNodes].forEach(target => {
                                    factory.cleanView(target);
                                });
                            });
                        }).observe(window.document, { childList: true, subtree: true });
                    } else {
                        window.document.body.addEventListener("DOMNodeRemoved", e => {
                            factory.cleanView(e.target);
                        });
                    }
                    return view;
                });
            } else {
                console.error("root class can not find");
                return Promise.reject();
            }
        });
    }
};

exports.default = factory;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _updater = require(13);

var _updater2 = _interopRequireDefault(_updater);

var _controlbar = require(14);

var _controlbar2 = _interopRequireDefault(_controlbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let client = {
    state: true,
    start() {
        if (window.EventSource) {
            _controlbar2.default.start();
            let source = new EventSource('/ada/sse');
            source.addEventListener('message', e => {
                if (_controlbar2.default.getState()) {
                    try {
                        var data = JSON.parse(e.data);
                        if (data.type === "edit") {
                            _updater2.default.refresh(data.files, data.map).catch(e => console.log(e));
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
            source.addEventListener("open", function (event) {
                console.log("sse open");
            }, false);
            source.addEventListener("error", function (event) {
                console.log("sse error");
            }, false);
        }
    }
};

exports.default = client;},function(module,exports,require){'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let util = {
    randomid(len = 7) {
        if (len <= 2) {
            len = 7;
        }
        return Math.random().toString(36).slice(2, len + 2);
    },
    isString(obj) {
        return typeof obj === 'string' && obj.constructor === String;
    },
    setProp(target, key, value) {
        Reflect.defineProperty(target, key, {
            enumerable: false,
            configurable: false,
            writable: true,
            value: value
        });
    },
    isFunction: function (obj) {
        return typeof obj === 'function' && obj.constructor === window.Function;
    },
    isEqual(one, two) {
        if (one === null || one === undefined || two === null || two === undefined) {
            return one === two;
        }
        if (one.constructor !== two.constructor) {
            return false;
        }
        if (one instanceof Function) {
            return one === two;
        }
        if (one instanceof RegExp) {
            return one === two;
        }
        if (one === two || one.valueOf() === two.valueOf()) {
            return true;
        }
        if (Array.isArray(one) && one.length !== two.length) {
            return false;
        }
        if (one instanceof Date) {
            return false;
        }
        if (!(one instanceof Object)) {
            return false;
        }
        if (!(two instanceof Object)) {
            return false;
        }
        let p = Object.keys(one);
        return Object.keys(two).every(function (i) {
            return p.indexOf(i) !== -1;
        }) && p.every(function (i) {
            return util.isEqual(one[i], two[i]);
        });
    },
    queue(arr) {
        let current = null,
            result = [];
        arr.forEach(task => {
            if (!current) {
                current = task();
            } else {
                current = current.then(info => {
                    result.push(info);
                    return task();
                });
            }
        });
        return current ? current.then(info => {
            result.push(info);
            return result;
        }) : Promise.resolve([]);
    },
    isObject(obj) {
        return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isQueryString(str) {
        return util.isString(str) && /(^|&).*=([^&]*)(&|$)/.test(str);
    },
    queryString(obj) {
        let result = [];
        if (obj) {
            for (let i in obj) {
                let val = obj[i];
                if (util.isString(val)) {
                    result.push(`${i}=${window.encodeURIComponent(val)}`);
                } else if (util.isObject(val) || util.isArray(val)) {
                    result.push(`${i}=${window.encodeURIComponent(JSON.stringify(val))}`);
                } else {
                    result.push(`${i}=${val !== undefined && val !== null ? window.encodeURIComponent(val.toString()) : ""}`);
                }
            }
            return result.join("&");
        } else {
            return "";
        }
    },
    postData(obj) {
        if (obj) {
            if (obj instanceof FormData || obj instanceof Blob || obj instanceof ArrayBuffer) {
                return obj;
            } else if (util.isObject(obj)) {
                let has = false;
                for (let i in obj) {
                    if (obj[i] instanceof Blob || obj[i] instanceof ArrayBuffer || obj[i] instanceof File) {
                        has = true;
                        break;
                    }
                }
                if (has) {
                    let fd = new FormData();
                    for (let i in obj) {
                        if (obj[i] instanceof Blob) {
                            fd.append(i, obj[i]);
                        } else if (obj[i] instanceof File) {
                            fd.append(i, obj[i]);
                        } else if (util.isArray(obj[i]) || util.isObject(obj[i])) {
                            fd.append(i, window.encodeURIComponent(JSON.stringify(obj[i])));
                        } else if (obj[i] instanceof FormData) {} else {
                            fd.append(i, window.encodeURIComponent(obj[i].toString()));
                        }
                    }
                    return fd;
                } else {
                    return util.queryString(obj);
                }
            } else if (util.isArray(obj)) {
                return window.encodeURIComponent(JSON.stringify({ key: obj }));
            } else {
                return obj;
            }
        } else {
            return null;
        }
    },
    parseTemplate(code, className) {
        if (className) {
            return code.replace(/class=(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {
                if (str.indexOf("{{") === -1) {
                    let val = str.substring(7, str.length - 1).trim();
                    let r = val.split(" ").map(k => {
                        if (k[0] === ":") {
                            return k.substring(1);
                        } else {
                            return className + "-" + k;
                        }
                    });
                    let dot = str.substr(6, 1);
                    return `class=${dot}${r.join(" ")}${dot}`;
                } else {
                    let val = str.substring(9, str.length - 3).trim();
                    return `class="{{(${val}).split(" ").map(key=>key?(key[0]!==":"?("${className}-"+key):key.substring(1)):"").join(" ")}}"`;
                }
            });
        } else {
            return code;
        }
    },
    parseStyle(codes, className) {
        if (codes && className) {
            let all = codes;
            if (!Array.isArray(codes)) {
                all = [codes];
            }
            let str = "";
            all.forEach(code => {
                let _r = [],
                    _t = [];
                code.split(/\{|\}/).forEach(_a => {
                    let _b = _a.trim();
                    if (_b.indexOf("@media") !== -1) {
                        _t.push([].concat(_r));
                        _r = [];
                    }
                    _r.push(_b);
                });
                _t.push(_r);
                _t.forEach(_a => {
                    let _has = false,
                        r = [];
                    if (_a[0].indexOf("@media") !== -1) {
                        _has = true;
                        str += _a[0] + "{";
                        _a.shift();
                    }
                    _a.forEach((_b, i) => {
                        _b = _b.trim();
                        if ((i + 1) % 2 !== 0) {
                            r.push(_b.replace(/\.[0-9a-zA-Z-]+/g, str => {
                                if (str.substring(1).trim() !== className) {
                                    return `.${className}-${str.substring(1)}`;
                                } else {
                                    return str;
                                }
                            }));
                        } else {
                            _b && r.push("{" + _b + "}");
                        }
                    });
                    if (_has) {
                        str += r.join("") + "}";
                    } else {
                        str += r.join("");
                    }
                });
            });
            return str;
        } else {
            return codes;
        }
    },
    excuteStyle(code, path) {
        if (!document.getElementById(path)) {
            let _a = document.createElement("style");
            _a.setAttribute("media", "screen");
            _a.setAttribute("type", "text/css");
            _a.setAttribute("id", path);
            _a.appendChild(document.createTextNode(code));
            document.getElementsByTagName("head")[0].appendChild(_a);
        }
    },
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            var character = str.charCodeAt(i);
            hash = (hash << 5) - hash + character;
            hash = hash & hash;
        }
        return hash;
    },
    getMappedPath(path) {
        return `P${Math.abs(util.hashCode(path))}`;
    }
};
exports.default = util;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event2 = require(12);

var _event3 = _interopRequireDefault(_event2);

var _util = require(8);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REGS = {
    k: /\r/g,
    l: /\n/g,
    a: /&lt;/g,
    b: /&gt;/g,
    d: /<%|%>/g,
    e: /^=.*;$/,
    i: /\r\n/g,
    f: />[\s]+</g,
    g: /<%[\s\S]*%>/,
    h: /\<\!\-\-[\s\S]*?\-\-\>/g,
    startdot: /&lt;/g,
    enddot: /&gt;/g,
    isDoctype: /\<\!DOCTYPE[\s\S]*?\>/g,
    isNote: /\<\!\-\-[\s\S]*?\-\-\>/g,
    isXmlTag: /\<\?[\s\S]*?\?\>/g,
    propcode: /\@\[\[[0-9]+\]\]\@/g,
    eventcode: /\$\[\[[0-9]+\]\]\$/g,
    assigncode: /\(\(\[[0-9]+\]\)\)/g,
    expresscode: /\[\[[0-9]+\]\]/g,
    nodecode: /\{\{node\}\}/g
};
const SINGLETAG = ["br", "hr", "img", "input", "param", "link", "meta", "area", "base", "basefont", "param", "col", "frame", "embed", "keygen", "source"];
const TEMPLATECACHE = new Map();
const IDNAME = "$$ID";

let DefaultMacros = {
    self({ props, context }) {
        return { template: context._templateStr, data: props.data };
    }
};

let Parser = {
    beatySyntax: {
        syntaxs: {
            defaults(str) {
                return `<%=${str.substring(2, str.length - 2)};%>`;
            },
            log(str) {
                return `<%console.log(${str.join(" ")});%>`;
            },
            map(a) {
                let dataname = a.shift();
                a.shift();
                let keyname = a.shift() || "$value",
                    indexname = a.shift() || "$key",
                    iname = "_" + _util2.default.randomid(8);
                return `<%for(var ${iname} in ${dataname}){var ${keyname}=${dataname}[${iname}];var ${indexname}=${iname};%>`;
            },
            "/map"() {
                return "<%}%>";
            },
            list(a) {
                var dataname = a.shift();
                a.shift();
                let keyname = a.shift() || "$item",
                    indexname = a.shift() || "$index",
                    iname = "_" + _util2.default.randomid(8),
                    lenname = "_" + _util2.default.randomid(6);
                return `<%if(${dataname}&&${dataname}.length>=0)for(var ${iname}=0,${indexname}=0,${lenname}=${dataname}.length;${iname}<${lenname};${iname}++){var ${keyname}=${dataname}[${iname}];${indexname}=${iname};%>`;
            },
            "/list"(str) {
                return "<%}%>";
            },
            if(str) {
                return `<%if(${str.join(" ")}){%>`;
            },
            "elseif"(str) {
                return `<%}else if(${str.join(" ")}){%>`;
            },
            "else"() {
                return "<%}else{%>";
            },
            "/if"() {
                return "<%}%>";
            },
            break() {
                return "<%break;%>";
            },
            set(str) {
                return `<%var ${str.join(" ")};%>`;
            }
        },
        parse(strs = "") {
            return strs.replace(/\{\{[\s\S]+?\}\}/g, str => {
                let a = str.substring(2, str.length - 2),
                    b = a.split(" "),
                    c = b.shift();
                try {
                    if (Parser.beatySyntax.syntaxs[c]) {
                        return Parser.beatySyntax.syntaxs[c](b);
                    } else {
                        return Parser.beatySyntax.syntaxs.defaults(str);
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }
    },
    nodeParser: {
        getNodeStr(node) {
            let _events = {},
                _attrs = {},
                _props = {},
                _binders = [];
            Reflect.ownKeys(node.props).forEach(function (key) {
                if (key.startsWith("on")) {
                    let _key = key.substring(2);
                    _events[_key] = node.props[key];
                    _binders.push(_key);
                } else if (key.startsWith("@")) {
                    let _key = key.substring(1);
                    _props[_key] = node.props[key];
                } else if (key === "data-find") {
                    _attrs["data-find"] = `${IDNAME}+":${node.props["data-find"]}"`;
                } else if (key === "data-group") {
                    _attrs["data-group"] = `${IDNAME}+":${node.props["data-group"]}"`;
                } else if (key === "data-module") {
                    _attrs["data-module"] = `${IDNAME}`;
                } else {
                    _attrs[key] = `"${node.props[key]}"`;
                }
            });
            if (_binders.length > 0) {
                _attrs["data-bind"] = `${IDNAME}+":${_binders.join(",")}"`;
            }
            return `{tag:"${node.tag}",attrs:{${Reflect.ownKeys(_attrs).map(i => `"${i}":${_attrs[i]}`).join(",")}},events:{${Reflect.ownKeys(_events).map(i => `${i}:$${_events[i]}$`).join(",")}},props:{${Reflect.ownKeys(_props).map(i => `${i}:@${_props[i]}@`).join(",")}},children:[]}`;
        },
        code(node, lev) {
            if (!node.isTextNode) {
                let pname = "",
                    t = "";
                let tempstr = Parser.nodeParser.getNodeStr(node);
                if (!node.parent) {
                    pname = "$$NODE" + lev;
                    t = `var ${pname}=${tempstr};$$CURRENT=${pname};`;
                } else {
                    pname = "$$NODE" + lev;
                    t = `${tempstr};$$CURRENT=${pname};`;
                }
                node.children.forEach(child => {
                    if (child.isTextNode && /\(\[[0-9]+\]\)/.test(child.content)) {
                        t += child.content;
                    } else {
                        let q = "$$NODE" + (lev + 1);
                        lev += 1;
                        let _tempstr = Parser.nodeParser.code(child, lev);
                        t += `var ${q}=${_tempstr}; ${pname}.children.push(${q}); $$CURRENT=${pname};`;
                    }
                });
                return t;
            } else {
                let tempstr = "";
                if (!/\(\[[0-9]+\]\)/.test(node.content)) {
                    tempstr = `{content:"${node.content || ""}"}`;
                } else {
                    tempstr = node.content;
                }
                return tempstr;
            }
        }
    },
    getHTMLString(nodes) {
        let str = "";

        function html(node) {
            let result = "",
                issingletag = SINGLETAG.indexOf(node.tag) !== -1;
            if (node.content !== undefined) {
                result = node.content || "";
            } else {
                let _props = [];
                if (node.attrs) {
                    Reflect.ownKeys(node.attrs).forEach(function (prop, i) {
                        if (node.attrs[prop]) {
                            _props.push(`${prop}="${node.attrs[prop]}"`);
                        }
                    });
                }
                if (issingletag) {
                    result = `<${node.tag} ${_props.join(" ")}/>`;
                } else {
                    let _content = [];
                    node.children.forEach(function (child) {
                        if (child) {
                            _content.push(html(child));
                        }
                    });
                    result = `<${node.tag} ${_props.join(" ")}>${_content.join("")}</${node.tag}>`;
                }
            }
            return result;
        }

        nodes.forEach(function (node) {
            str += html(node);
        });
        return str;
    },
    preparse(str = "") {
        str.trim().replace(REGS.isNote, "").replace(REGS.isDoctype, "").replace(REGS.isXmlTag, "").replace(REGS.a, "<").replace(REGS.b, ">").replace(REGS.h, "").replace(REGS.f, "><").replace(REGS.i, "").replace(REGS.k, "").replace(REGS.l, "");
        SINGLETAG.forEach(tag => {
            let reg = new RegExp(`<${tag} .*?>`, "g");
            str = str.replace(reg, function (a) {
                return a.substring(0, a.length - 1) + "/>";
            });
        });
        return str;
    },
    parseMacro(str = "") {
        if (str.indexOf("<@") !== -1) {
            let i = -1,
                current = "",
                state = "start",
                tagname = "",
                propname = "",
                propnamestart,
                propvalue = "";
            let isbody = true,
                endtagname = "",
                props = {},
                tagindex = 0,
                tagendindex = 0,
                endtagindex = 0,
                endtagendindex = 0,
                obj = [];
            while (i < str.length) {
                i++;
                current = str[i];
                if (state === "start" && current === "<" && str[i + 1] === "@") {
                    state = "tagstart";
                    tagindex = i;
                    continue;
                }
                if (state === "tagstart" && current === "@") {
                    state = "tagname";
                    tagname = "";
                    props = {};
                    continue;
                }
                if (state === "start" && current === "<" && str[i + 1] === "/" && str[i + 2] === "@") {
                    endtagindex = i;
                    state = "endtag";
                    endtagname = "";
                    i += 2;
                    continue;
                }
                if (state === "endtag" && current === ">") {
                    state = "start";
                    endtagendindex = i + 1;
                    obj.push({
                        type: "endtag",
                        tagname: endtagname,
                        start: endtagindex,
                        end: endtagendindex
                    });
                    continue;
                }
                if (state === "tagname" && current === " ") {
                    state = "propname";
                    propname = "";
                    continue;
                }
                if (state === "tagname" && (current === "/" || current === ">")) {
                    if (current === ">") {
                        tagendindex = i + 1;
                        state = "start";
                        isbody = true;
                    } else if (current === "/") {
                        tagendindex = i + 2;
                        state = "start";
                        isbody = false;
                    }
                    if (tagname !== "") {
                        obj.push({
                            type: "tag",
                            tagname: tagname,
                            props: props,
                            body: isbody,
                            start: tagindex,
                            end: tagendindex
                        });
                    }
                    continue;
                }
                if (state === "propname" && current === "=") {
                    state = "propvalue";
                    continue;
                }
                if (state === "propvalue" && (current === "'" || current === "\"")) {
                    state = "propvalueing";
                    propnamestart = current;
                    propvalue = "";
                    continue;
                }
                if (state === "propvalueing" && current === propnamestart) {
                    state = "tagname";
                    props[propname] = propvalue;
                    continue;
                }
                if (state === "endtag") {
                    endtagname += current;
                }
                if (state === "tagname") {
                    tagname += current;
                }
                if (state === "propname") {
                    propname += current;
                }
                if (state === "propvalueing") {
                    propvalue += current;
                }
            }
            let index = 0,
                start = 0,
                end = 0,
                inner = false,
                _current = null,
                result = [],
                vt = "",
                startin = 0;
            Reflect.ownKeys(obj).forEach(key => {
                let _info = obj[key];
                if (_info.type === "tag" && _info.body === false && inner === false) {
                    _info.bodystr = "";
                    _info.from = _info.start;
                    _info.to = _info.end;
                    result.push(_info);
                }
                if (_info.type === "tag" && _info.body === true) {
                    inner = true;
                    if (_current === null) {
                        _current = _info;
                        _current.from = _info.start;
                    }
                    if (index === 0) {
                        start = _info.start;
                        end = _info.end;
                    }
                    index++;
                }
                if (_info.type === "endtag") {
                    index--;
                    if (index === 0) {
                        _current.to = _info.end;
                        _current.bodystr = str.substring(end, _info.start);
                        result.push(_current);
                        _current = null;
                        inner = false;
                    }
                }
            });
            result.forEach(item => {
                let macroProps = item.props;
                let _event = [],
                    _props = [],
                    _attrs = [];
                Reflect.ownKeys(macroProps).forEach(macroAttrName => {
                    let macroPropsValStr = macroProps[macroAttrName];
                    let macroPropsValue = "";
                    if (REGS.g.test(macroPropsValStr)) {
                        let cpp = "";
                        macroPropsValStr.split(REGS.d).forEach((val, index) => {
                            if ((index + 1) % 2 === 0) {
                                if (val !== "") {
                                    cpp += `${val}+`;
                                }
                            } else {
                                if (val !== "") {
                                    cpp += `'${val}'+`;
                                } else {
                                    cpp += val;
                                }
                            }
                        });
                        let npp = cpp.length > 0 ? cpp.substring(0, cpp.length - 1) : "''";
                        macroPropsValue = npp.substring(1, npp.length - 1);
                    } else {
                        macroPropsValue = `"${macroPropsValStr}"`;
                    }
                    if (macroAttrName.startsWith("on")) {
                        let _eventtype = macroAttrName.substring(2);
                        _event.push({ name: _eventtype, value: macroPropsValue });
                    } else if (macroAttrName.startsWith("@")) {
                        _props.push(`"${macroAttrName.substring(1)}":${macroPropsValue}`);
                    } else {
                        _attrs.push(`"${macroAttrName}":${macroPropsValue}`);
                    }
                });
                let _event_ = _event.map(info => {
                    let _val = info.value.split(/\(|\)/);
                    let method = _val.shift();
                    _val.pop();
                    let paranames = [];
                    let parameters = _val.map(a => {
                        if (a.indexOf(" as ") !== -1) {
                            let _b = a.split("as");
                            paranames.push(`${_b[1].trim()}`);
                            return _b[0].trim();
                        } else {
                            paranames.push(`${a.split(".").pop()}`);
                            return a;
                        }
                    });
                    return `"${info.name}":{method:"${method}",parameters:[${parameters.join(",")}],paranames:"${paranames.join(",")}"}`;
                });
                vt += `${str.substring(startin, item.from)}
                       <%var $$MACRORESULT=this._macro({tag:"${item.tagname}",props:{${_props.join(",")}},attrs:{${_attrs.join(",")}},events:{${_event_.join(",")}},bodyStr:"${item.bodystr}"});if($$MACRORESULT&&$$MACRORESULT.length){for(var $$INDEX=0;$$INDEX<$$MACRORESULT.length;$$INDEX++){{{node}}.children.push($$MACRORESULT[$$INDEX]);}}else{{{node}}.children.push({content:$$MACRORESULT||''});}%>`;
                startin = item.to;
            });
            vt += str.substring(startin, str.length);
            return vt;
        } else {
            return str;
        }
    },
    parseNode(str = "") {
        if (str && str !== "") {
            let stacks = [],
                nodes = [],
                current = null;
            let tagname = "",
                tagendname = "",
                propname = "",
                value = "",
                text = "";
            let tagnamestart = false,
                propstart = false,
                valuestart = false,
                tagendstart = false,
                element = false;

            for (let i = 0, len = str.length; i < len; i++) {
                let a = str[i];
                if (a !== "\r" && a !== "\n") {
                    if (a === "<") {
                        element = true;
                        if (text.trim() !== "") {
                            current = {
                                content: text.trim() || "",
                                parent: stacks[stacks.length - 1] || null,
                                isTextNode: true
                            };
                            if (stacks[stacks.length - 1]) {
                                stacks[stacks.length - 1].children.push(current);
                            } else {
                                nodes.push(current);
                            }
                            text = "";
                        }
                        if (str[i + 1] && str[i + 1] === "/") {
                            tagendstart = true;
                        } else {
                            current = {
                                tag: "",
                                props: {},
                                children: [],
                                parent: null,
                                hasProp: false,
                                isTextNode: false
                            };
                            stacks.push(current);
                            if (stacks.length - 2 >= 0) {
                                stacks[stacks.length - 2].children.push(current);
                                current.parent = stacks[stacks.length - 2];
                            }
                            tagnamestart = true;
                        }
                        continue;
                    } else if (a === " ") {
                        if (element) {
                            if (tagnamestart) {
                                tagnamestart = false;
                                current.tag = tagname.trim();
                                tagname = "";
                            }
                            if (!propstart && !valuestart) {
                                propstart = true;
                                continue;
                            }
                        }
                    } else if (a === "=") {
                        element && (propstart = false);
                    } else if (a === "'" || a === "\"") {
                        if (!valuestart && element) {
                            valuestart = a;
                            continue;
                        } else {
                            if (valuestart === a) {
                                valuestart = false, current.hasProp = true;
                                current.props[propname.trim()] = value.trim();
                                propname = "", value = "";
                            }
                        }
                    } else if (a === ">") {
                        element = false, propstart = false, valuestart = false, tagnamestart = false;
                        if (tagendstart) {
                            tagendstart = false, tagendname = "";
                            stacks.length === 1 && nodes.push(stacks[0]);
                            stacks.pop();
                        }
                        if (!current.hasProp) {
                            current.tag === "" && (current.tag = tagname.trim());
                            tagname = "";
                        }
                        continue;
                    } else if (a === "/") {
                        if (str[i + 1] && str[i + 1] === ">") {
                            element = false, valuestart = false, propstart = false, tagendstart = false, tagnamestart = false, tagendname = "";
                            if (stacks.length === 1) {
                                nodes.push(stacks[0]);
                            }
                            if (!current.hasProp) {
                                current.tag === "" && (current.tag = tagname.trim());
                                tagname = "";
                            }
                            stacks.pop();
                        } else {
                            if (!element) {
                                text += a;
                            } else {
                                valuestart && (value += a);
                            }
                        }
                        continue;
                    }
                    tagnamestart && (tagname += a);
                    propstart && (propname += a);
                    valuestart && (value += a);
                    tagendstart && (tagendname += a);
                    !element && (text += a);
                }
            }
            if (text) {
                nodes.push({ content: text || "", parent: null, isTextNode: true });
            }
            return nodes;
        } else {
            return [];
        }
    },
    code(temp = "") {
        let fn = "",
            outp = "",
            cc = [],
            ee = [];
        let t = `"use strict";\nvar $$RESULT=[],$$CURRENT=null;\n`;
        temp.split(REGS.d).forEach((e, index) => {
            if (index % 2 !== 0) {
                if (REGS.e.test(e)) {
                    fn += outp + `[[${cc.length}]]`;
                    cc.push(e);
                } else {
                    fn += `(([${ee.length}]))`;
                    ee.push(e);
                }
            } else {
                fn += outp + e;
            }
        });
        Parser.parseNode(fn).forEach((item, i) => {
            let pt = i + "_0";
            let ct = Parser.nodeParser.code(item, pt);
            t += ct + "\r\n";
            if (ct.indexOf("$$NODE" + pt) !== -1 && ct.indexOf("$$RESULT.push($$NODE" + pt + ")") === -1) {
                t += "$$RESULT.push($$NODE" + pt + ");\r\n";
            }
        });
        t = t.replace(REGS.assigncode, (a, b, c) => {
            return ee[a.substring(3, a.length - 3)];
        }).replace(REGS.propcode, (a, b, c) => {
            let aa = cc[a.substring(3, a.length - 3)];
            if (aa && aa[0] === "=") {
                return aa.substring(1, aa.length - 1);
            } else {
                return aa;
            }
        }).replace(REGS.eventcode, (a, b, c) => {
            let aa = cc[a.substring(3, a.length - 3)];
            if (aa && aa[0] === "=") {
                let qt = aa.substring(1, aa.length - 1),
                    qtt = qt.split(/\(|\)/);
                let paranames = [],
                    _paranames = [];
                if (qtt[1]) {
                    paranames = qtt[1].split(",").map(name => {
                        if (name.indexOf(" as ") !== -1) {
                            return name.split("as").pop().trim();
                        } else {
                            return name.indexOf(".") !== -1 ? name.split(".").pop() : name;
                        }
                    });
                    _paranames = qtt[1].split(",").map(name => {
                        if (name.indexOf(" as ") !== -1) {
                            return name.split("as").shift().trim();
                        } else {
                            return name;
                        }
                    });
                }
                return `{method:"${qtt[0]}",parameters:[${_paranames.join(",") || ''}],paranames:"${paranames.join(",")}"}`;
            } else {
                return aa;
            }
        }).replace(REGS.expresscode, (a, b, c) => {
            let aa = cc[a.substring(2, a.length - 2)];
            if (aa && aa[0] === "=") {
                return "\"+((" + aa.substring(1, aa.length - 1) + ")!==undefined?(" + aa.substring(1, aa.length - 1) + "):'')+\"";
            } else {
                return aa;
            }
        }).replace(REGS.nodecode, (a, b, c) => "$$CURRENT");
        t += "return $$RESULT;";
        return t;
    },
    parse(temp = "") {
        let result = "";
        if (!TEMPLATECACHE.has(temp)) {
            result = Parser.code(Parser.parseMacro(Parser.beatySyntax.parse(Parser.preparse(temp))));
            TEMPLATECACHE.set(temp, result);
        } else {
            result = TEMPLATECACHE.get(temp);
        }
        return result;
    }
};
let Differ = {
    childrenEvents(children = []) {
        let events = new Set();

        function walk(node) {
            if (node.events) {
                Reflect.ownKeys(node.events).forEach(type => events.add(type));
                if (!node.attrs || !node.attrs["data-module"]) {
                    node.children && node.children.forEach(child => walk(child));
                }
            }
        }

        children.forEach(child => walk(child));
        return Array.from(events);
    },
    diffNode(a, b, current, r) {
        if (a && b) {
            let lent = a.length;
            if (a.length === 0) {
                if (b.length !== 0) {
                    r.removeAll.push({
                        path: current.join(",")
                    });
                }
            } else {
                let removeids = [];
                if (a.length < b.length) {
                    if (a[0].attrs && a[0].attrs.unique && b[0].attrs && b[0].attrs.unique) {
                        removeids = Differ.checkRemove(a, b).map((removeIndex, index) => {
                            r.bremove.push({
                                path: current.join(",") + "," + removeIndex
                            });
                            return removeIndex;
                        });
                    } else {
                        lent = b.length;
                    }
                } else {
                    Differ.checkAdd(a, b).forEach(info => {
                        r.badd.push({
                            path: current.join(","),
                            node: info.node
                        });
                        b.push(info.node);
                    });
                }
                Differ.checkSort(a, b).map(node => {
                    r.sort.push({
                        path: current.join(",") + "," + node.from,
                        to: node.to,
                        from: node.from
                    });
                    return node;
                }).forEach(info => {
                    let from = b[info.from];
                    b[info.from] = b[info.to];
                    b[info.to] = from;
                });
                let newb = [];
                b.forEach((node, index) => {
                    if (removeids.indexOf(index) === -1) {
                        newb.push(node);
                    }
                });
                b = newb;
                if (b.length > a.length) {
                    lent = b.length;
                }
                for (let i = 0; i < lent; i++) {
                    current.push(i);
                    if (a[i]) {
                        if (b[i]) {
                            if (!(a[i].attrs && a[i].attrs["data-module"] !== undefined)) {
                                let ctp = Differ.checkNode(a[i], b[i]);
                                if (b[i].attrs && b[i].attrs["data-module"] !== undefined) {
                                    r.replace.push({
                                        path: current.join(","),
                                        node: a[i]
                                    });
                                } else {
                                    if (ctp === true) {
                                        Differ.diffNode(a[i].children, b[i].children, current, r);
                                    } else if (ctp === "replace") {
                                        r.replace.push({
                                            path: current.join(","),
                                            node: a[i]
                                        });
                                    } else {
                                        r.edit.push({
                                            path: current.join(","),
                                            attrs: ctp
                                        });
                                        Differ.diffNode(a[i].children, b[i].children, current, r);
                                    }
                                }
                            } else if (a[i].attrs["data-module"] !== undefined) {
                                let ctp = Differ.checkNode(a[i], b[i]);
                                if (ctp === "replace") {
                                    r.replace.push({
                                        path: current.join(","),
                                        node: a[i]
                                    });
                                } else if (ctp !== true) {
                                    r.removeAll.push({
                                        path: current.join(",")
                                    });
                                    r.edit.push({
                                        path: current.join(","),
                                        attrs: ctp
                                    });
                                }
                            }
                        } else {
                            r.add.push({
                                path: current.join(","),
                                node: a[i]
                            });
                        }
                    } else {
                        r.remove.push({
                            path: current.join(","),
                            node: b[i]
                        });
                    }
                    current.pop();
                }
            }
        }
    },
    checkAdd(a, b) {
        let r = [];
        if (a[0] && b[0] && a[0].attrs && a[0].attrs.unique && b[0].attrs && b[0].attrs.unique) {
            let ids = b.map(node => node.attrs.unique);
            a.forEach((node, index) => {
                let id = node.attrs.unique;
                if (ids.indexOf(id) === -1) {
                    r.push({
                        node: node,
                        index
                    });
                }
            });
        }
        return r;
    },
    checkSort(a, b) {
        let r = [];
        if (a[0] && b[0] && a[0].attrs && a[0].attrs.unique && b[0].attrs && b[0].attrs.unique) {
            let c = a.map(node => node.attrs.unique);
            b.forEach((node, i) => {
                let id = node.attrs.unique,
                    to = c.indexOf(id);
                if (to !== -1 && to !== i) {
                    r.push({
                        node: node,
                        from: i,
                        to
                    });
                }
            });
        }
        return r;
    },
    checkRemove(a, b) {
        let r = [],
            aa = a.map(node => node.attrs.unique);
        b.forEach((node, index) => {
            if (aa.indexOf(node.attrs.unique) === -1) {
                r.push(index);
            }
        });
        return r;
    },
    checkNode(a, b) {
        let r = true;
        if (a.content !== undefined) {
            if (a.content === b.content) {
                r = true;
            } else {
                r = "replace";
            }
        } else {
            if (a.tag === b.tag) {
                return Differ.checkProps(a.attrs, b.attrs);
            } else {
                r = "replace";
            }
        }
        return r;
    },
    checkProps(a, b) {
        let ap = Object.keys(a),
            bp = Object.keys(b),
            r = { final: a },
            t = ap.length,
            isedit = false;
        if (ap.length < bp.length) {
            t = bp.length;
        }
        for (let i = 0; i < t; i++) {
            let key = ap[i];
            if (key) {
                if (b[key] === undefined) {
                    isedit = true;
                    break;
                } else {
                    if (a[key] !== b[key]) {
                        isedit = true;
                        break;
                    }
                }
            } else {
                isedit = true;
                break;
            }
        }
        if (isedit) {
            return r;
        } else {
            return true;
        }
    },
    diff(newnode, oldnode) {
        let r = { add: [], replace: [], remove: [], edit: [], removeAll: [], bremove: [], badd: [], sort: [] },
            current = [];
        let a = Differ.diffNode(newnode, oldnode, current, r);
        oldnode.length = 0;
        return r;
    }
};
let Effecter = {
    element(data, issvg) {
        if (data.tag === "svg") {
            !issvg ? issvg = true : "";
        }
        if (data.content !== undefined) {
            if (issvg) {
                return window.document.createElementNS("http://www.w3.org/2000/svg", "text");
            } else {
                return window.document.createTextNode(data.content);
            }
        } else {
            let t = null;
            if (!issvg) {
                t = window.document.createElement(data.tag);
            } else {
                t = window.document.createElementNS("http://www.w3.org/2000/svg", data.tag);
            }
            for (let i in data.attrs) {
                if (!issvg) {
                    t.setAttribute(i, data.attrs[i]);
                } else {
                    let a = i.split(":");
                    if (a.length > 1) {
                        t.setAttributeNS("http://www.w3.org/1999/" + a[0], a[1], data.attrs[i]);
                    } else {
                        t.setAttributeNS(null, a[0], data.attrs[i]);
                    }
                }
            }
            for (let i = 0; i < data.children.length; i++) {
                t.appendChild(Effecter.element(data.children[i], issvg));
            }
            return t;
        }
    },
    effect(dom, actions) {
        console.log(`Badd:${actions.badd.length} Add:${actions.add.length} Replace:${actions.replace.length} Remove:${actions.remove.length} Edit:${actions.edit.length} RemoveAll:${actions.removeAll.length} Bremove:${actions.bremove.length} Sort:${actions.sort.length}`);
        let adds = {};
        actions.badd.forEach(action => {
            let t = dom;
            action.path.split(",").forEach(path => {
                t = t.childNodes[path / 1];
            });
            t.appendChild(Effecter.element(action.node));
        });
        if (actions.sort.length > 0) {
            let sorts = actions.sort.map(info => {
                let t = dom;
                info.path.split(",").forEach(path => t = t.childNodes[path / 1]);
                return {
                    node: t,
                    to: info.to,
                    from: info.from
                };
            });
            let mt = [...sorts[0].node.parentNode.childNodes];
            sorts.forEach(sort => {
                let a = mt[sort.to];
                mt[sort.to] = sort.node;
                mt[sort.from] = a;
            });
            let parent = mt[0].parentNode;
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < mt.length; i++) {
                fragment.appendChild(mt[i]);
            }
            parent.appendChild(fragment);
        }
        actions.bremove.map(remove => {
            let t = dom;
            remove.path.split(",").forEach(path => {
                t = t.childNodes[path / 1];
            });
            return t;
        }).forEach(node => node.parentNode.removeChild(node));
        actions.replace.forEach(action => {
            let t = dom,
                has = false;
            action.path.split(",").forEach(path => {
                let q = t.childNodes[path / 1];
                if (q) {
                    t = q;
                    has = true;
                } else {
                    has = false;
                    t.appendChild(Effecter.element(action.node));
                }
            });
            if (has) {
                t.parentNode.replaceChild(Effecter.element(action.node), t);
            }
        });
        actions.add.forEach(action => {
            let t = dom;
            let paths = action.path.split(",");
            paths.pop();
            let pname = paths.join("");
            paths.forEach(path => {
                t = t.childNodes[path / 1];
            });
            if (!adds[pname]) {
                adds[pname] = [{
                    p: t,
                    n: action.node
                }];
            } else {
                adds[pname].push({
                    p: t,
                    n: action.node
                });
            }
        });
        actions.edit.forEach(action => {
            let t = dom;
            action.path.split(",").forEach(path => t = t.childNodes[path / 1]);
            let attrs = action.attrs,
                attributes = [];
            if (t.attributes.getNamedItem) {
                attributes = [...t.attributes].map(attribute => attribute.nodeName);
            } else {
                for (let nt in t.attributes) {
                    attributes.push(nt);
                }
            }
            Reflect.ownKeys(attrs.final).forEach(propName => {
                if (propName.indexOf(":") === -1) {
                    if (t.getAttribute(propName) !== attrs.final[propName]) {
                        t.setAttribute(propName, attrs.final[propName]);
                        try {
                            t[propName] = attrs.final[propName];
                        } catch (e) {}
                    }
                    let etm = attributes.indexOf(propName);
                    if (etm !== -1) {
                        attributes.splice(etm, 1);
                    }
                } else {
                    let to = propName.split(":"),
                        top = to[1],
                        stop = to[0];
                    if (t.getAttributeNS("http://www.w3.org/1999/" + stop, top) !== attrs.final[propName]) {
                        t.setAttributeNS("http://www.w3.org/1999/" + stop, top, attrs.final[propName]);
                    }
                    let etm = attributes.indexOf(top);
                    if (etm !== -1) {
                        attributes.splice(etm, 1);
                    }
                    etm = attributes.indexOf(propName);
                    if (etm !== -1) {
                        attributes.splice(etm, 1);
                    }
                }
            });
            attributes.forEach(attribute => {
                if (attribute.indexOf(":") === -1) {
                    t.removeAttribute(attribute);
                } else {
                    let to = attribute.split(":"),
                        top = to[1],
                        stop = to[0];
                    t.removeAttributeNS("http://www.w3.org/1999/" + stop, top, attrs.final[tp]);
                }
            });
        });
        actions.remove.map(action => {
            let t = dom;
            let paths = action.path.split(",");
            let index = paths.pop();
            paths.forEach(path => t = t.childNodes[path / 1]);
            return t.childNodes[index];
        }).forEach(remove => remove.parentNode.removeChild(remove));
        actions.removeAll.forEach(action => {
            let t = dom;
            if (action.path) {
                action.path.split(",").forEach(path => {
                    if (t) {
                        t = t.childNodes[path / 1];
                    }
                });
            }
            if (t) {
                if (!t.dataset["module"]) {
                    t.innerHTML = "";
                }
            }
        });
        Reflect.ownKeys(adds).forEach(i => {
            let actions = adds[i];
            if (actions.length > 0) {
                let fm = window.document.createDocumentFragment();
                actions.forEach(action => fm.appendChild(Effecter.element(action.n)));
                actions[0].p.appendChild(fm);
            } else {
                actions.p.appendChild(Effecter.element(actions.n));
            }
        });
    }
};

let MapDom = class MapDom {
    static getElementPath(container = null, element = null) {
        let path = [],
            current = element;
        while (current && current !== container) {
            path.push([...current.parentNode.childNodes].indexOf(current));
            current = current.parentNode;
        }
        return path.reverse();
    }

    constructor(container = null, dom = null) {
        this._container = container;
        this._dom = dom;
    }

    getAttributes() {
        return this._container._cross.getAttributeByPath(MapDom.getElementPath(this._container._container, this._dom));
    }

    getAttribute(propName) {
        return this.getAttributes()[propName];
    }

    getEventInfo() {
        return this._container._cross.getEventsByPath(MapDom.getElementPath(this._container._container, this._dom));
    }

    isListenedEvent(type) {
        return this.getEventInfo()[type] !== undefined;
    }

    element() {
        return this._dom;
    }

    getElement() {
        return this._dom;
    }

    groupi(name = "") {
        return [...this._dom.querySelectorAll(`[data-groupi="${name}"]`)].map(element => new MapDom(this._container, element));
    }
};
let Template = class Template {
    constructor(template = "", macro = {}, id) {
        this._id = id;
        this._currentState = null;
        this._beforeState = null;
        this._macrofn = Object.assign({}, DefaultMacros, macro);
        this._templateStr = template;
        this._code = Parser.parse(template);
    }

    _macro({ tag: methodName, bodyStr, props, events, attrs }) {
        if (this._macrofn[methodName]) {
            let result = this._macrofn[methodName]({
                attrs,
                events,
                props,
                bodyStr,
                parseBody: function (values) {
                    if (bodyStr !== "") {
                        let et = new Template(bodyStr, this._macrofn, this._id);
                        let nt = et.render(values);
                        return nt;
                    } else {
                        return "";
                    }
                }.bind(this),
                context: this
            });
            if (result && result.template) {
                let _result = new Template(result.template, this._macrofn, this._id);
                let states = _result.getCurrentState(result.data);
                if (states.length === 1) {
                    let _out = states[0];
                    let _events = Reflect.ownKeys(events);
                    if (_events.length > 0) {
                        _out.attrs["data-bind"] = `${this._id}:${_events.map(key => key).join(",")}`;
                    }
                    Object.assign(_out.props, props);
                    Object.assign(_out.events, events);
                    Object.assign(_out.attrs, attrs);
                    return [_out];
                } else {
                    throw new Error("[ada] macro must return only one node");
                }
            } else {
                return result || "";
            }
        } else {
            console.error("[ada] macro can not found [" + methodName + "] template is " + this._templateStr);
            return "";
        }
    }

    getAttributeByPath(path = []) {
        let node = { children: this._currentState };
        path.forEach(p => node = node.children[p]);
        return node.props || null;
    }

    getEventsByPath(path = []) {
        let node = { children: this._currentState };
        path.forEach(p => node = node.children[p]);
        return node.events || null;
    }

    getAllInfoByPath(path = []) {
        let node = { children: this._currentState };
        path.forEach(p => node = node.children[p]);
        return { events: node.events, props: node.props };
    }

    getCurrentEventMap() {
        if (this._currentState) {
            return Differ.childrenEvents(this._currentState);
        } else {
            return [];
        }
    }

    getCurrentState(data) {
        let paras = data ? Reflect.ownKeys(data) : [];
        let _paras = paras.map(function (key) {
            return data[key];
        });
        paras.unshift(IDNAME);
        paras.push(this._code);
        _paras.unshift(this._id);
        return new Function(...paras).call(this, ..._paras);
    }

    render(data = {}, isdiff = true) {
        if (this._currentState) {
            this._beforeState = this._currentState;
        }
        this._currentState = this.getCurrentState(data);
        if (isdiff) {
            if (this._beforeState) {
                return Differ.diff(this._currentState, this._beforeState);
            } else {
                return Parser.getHTMLString(this._currentState);
            }
        } else {
            return Parser.getHTMLString(this._currentState);
        }
    }

    isRendered() {
        return this._beforeState != null;
    }
};
let DDM = class DDM {
    constructor({ id, container = null, templateStr = "", binders = {}, macro = {} }) {
        this._id = id;
        this._container = container;
        this._cross = new Template(templateStr, macro, id);
        this._binders = binders;
    }

    static setDefaultMacro(key, fn) {
        DefaultMacros[key] = fn;
        return null;
    }

    _agentEvent(types) {
        let dom = this._container;
        _event3.default.unbind(dom);
        types.forEach(eventType => {
            if (_event3.default.canBubbleUp(eventType)) {
                _event3.default.bind(dom, eventType, e => {
                    let target = e.target,
                        eventType = e.type;
                    let current = target,
                        targets = [];
                    while (current && current !== this._container && current !== window) {
                        let bindTypesStr = current.dataset["bind"];
                        if (bindTypesStr) {
                            let _a = bindTypesStr.split(":");
                            let hash = _a[0],
                                types = _a[1] ? _a[1].split(",") : [];
                            if (hash === this.getId() && types.indexOf(eventType) !== -1) {
                                let { events, props } = this._cross.getAllInfoByPath(MapDom.getElementPath(this._container, current));
                                let _info = events[e.type];
                                if (_info) {
                                    targets.push({ info: _info, props });
                                }
                            }
                        }
                        current = current.parentNode;
                    }
                    targets.forEach(({ info, props }) => {
                        let { method, parameters, paranames } = info;
                        if (this._binders) {
                            let pars = { e, props };
                            paranames.split(",").forEach((key, i) => pars[key] = parameters[i]);
                            this._binders({ method, parameters: pars });
                        }
                    });
                });
            } else {
                _event3.default.bind(dom, type, e => {
                    let target = e.target,
                        eventType = e.type;
                    let bindTypesStr = target.dataset["bind"];
                    if (bindTypesStr) {
                        let _a = bindTypesStr.split(":");
                        let hash = _a[0],
                            types = _a[1] ? _a[1].split(",") : [];
                        if (hash === this._cross.getId(), types.indexOf(eventType) !== -1) {
                            let { events, props } = this._cross.getAllInfoByPath(MapDom.getElementPath(this._container, target));
                            let _info = events[e.type];
                            if (_info) {
                                let { method, parameters, paranames } = _info;
                                if (this._binders) {
                                    let pars = { e, props };
                                    paranames.split(",").forEach((key, i) => pars[key] = parameters[i]);
                                    this._binders({ method: _info.method, parameters: pars });
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    getId() {
        return this._id;
    }

    finder(name) {
        return this.finders(name)[0];
    }

    finders(name) {
        let _id = `${this._id}:${name}`;
        let querystr = `[data-find="${_id}"]`;
        return [...this._container.querySelectorAll(querystr)].map(element => new MapDom(this, element));
    }

    group(name) {
        return this.groups(name);
    }

    groups(name) {
        let _id = `${this._id}:${name}`;
        let querystr = `[data-group="${_id}"]`;
        return [...this._container.querySelectorAll(querystr)].map(element => new MapDom(this, element));
    }

    modules() {
        let querystr = `[data-module="${this._id}"]`;
        return [...this._container.querySelectorAll(querystr)].map(element => new MapDom(this, element));
    }

    render(data, isdiff = true) {
        let result = this._cross.render(data, isdiff);
        if (isdiff) {
            if (!this._cross.isRendered()) {
                this._container.innerHTML = result;
            } else {
                Effecter.effect(this._container, result);
            }
        } else {
            this._container.innerHTML = result;
        }
        this._agentEvent(this._cross.getCurrentEventMap());
        return this;
    }
};
exports.default = DDM;},function(module,exports,require){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const TEMPLATETAG=exports.TEMPLATETAG="[TEMPLATE]",DDMTAG=exports.DDMTAG="[DDM]",VIEWTAG=exports.VIEWTAG="[VIEW]",PARENTVIEWTAG=exports.PARENTVIEWTAG="[PARENTVIEW]",ELEMENTTAG=exports.ELEMENTTAG="[ELEMENT]",CHILDRENTAG=exports.CHILDRENTAG="[CHILDREN]",OPTIONTAG=exports.OPTIONTAG="[OPTION]",IDNAME=exports.IDNAME="[VIEWID]",CURRENTSTATE=exports.CURRENTSTATE="[CURRENTSTATE]",DDMCONTAINER=exports.DDMCONTAINER="[DDMCONTAINER]";},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const macros = {
    module({ bodyStr, props, events, attrs }) {
        let r = [`data-module=""`];
        Reflect.ownKeys(attrs).forEach(attr => r.push(`${attr}="${attr}"`));
        let template = `<div ${r.join(" ")}>${bodyStr}</div>`;
        return { template, data: props };
    }
};

exports.default = macros;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const EVENTTYPES = {
    HTMLEvents: "load,unload,abort,error,select,change,submit,reset,focus,blur,resize,scroll",
    MouseEvent: "click,mousedown,mouseup,mouseover,mousemove,mouseout",
    UIEvent: "DOMFocusIn,DOMFocusOut,DOMActivate",
    MutationEvent: "DOMSubtreeModified,DOMNodeInserted,DOMNodeRemoved,DOMNodeRemovedFromDocument,DOMNodeInsertedIntoDocument,DOMAttrModified,DOMCharacterDataModified"
};
const UNBUBBLINGEVENT = ["unload", "abort", "error", "scroll", "focus", "blur", "DOMNodeRemovedFromDocument", "DOMNodeInsertedIntoDocument", "progress", "load", "loadend", "pointerenter", "pointerleave", "rowexit", "stop", "finish", "bounce", "afterprint", "propertychange", "filterchange", "readystatechange", "losecapture", "dragdrop", "dragenter", "dragexit", "draggesture", "dragover", "RadioStateChange", "close", "command", "contextmenu", "overflow", "overflowchanged", "underflow", "popuphidden", "popuphiding", "popupshowing", "popupshown", "commandupdate"];

function eventHandler(e) {
    var events = e.currentTarget.events[e.type];
    for (var i in events) {
        events[i].call(e.currentTarget, e);
    }
}

let helper = {
    isEvent(type) {
        let result = {
            type: type,
            interfaceName: null
        };
        for (let i in EVENTTYPES) {
            if (EVENTTYPES[i].indexOf(type) !== -1) {
                result.interfaceName = i;
                break;
            }
        }
        return result;
    },
    trigger(dom, type, data) {
        let a = helper.isEvent(type);
        if (a.interfaceName) {
            let eventx = document.createEvent(a.interfaceName);
            switch (a.interfaceName) {
                case "MouseEvent":
                    eventx.initMouseEvent(type, true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    break;
                case "HTMLEvents":
                    eventx.initEvent(type, true, false, window);
                    break;
                case "UIEvents":
                    eventx.initUIEvents(type, true, false, window, null);
                    break;
                case "MutationEvent ":
                    eventx.initMutationEvent(type, true, false, window, null, null, null, null);
                    break;
            }
            dom.dispatchEvent(eventx);
        } else {
            let evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(type, true, true, data);
            dom.dispatchEvent(evt);
        }
        return dom;
    },
    canBubbleUp(type) {
        return UNBUBBLINGEVENT.indexOf(type) === -1;
    },
    bind(dom, type, fn, capt = false) {
        if (!dom.events) {
            dom.events = {};
        }
        if (dom.events[type]) {
            dom.events[type].push(fn);
        } else {
            dom.events[type] = [];
            dom.events[type].push(fn);
        }
        dom.addEventListener(type, eventHandler, capt);
        return dom;
    },
    unbind(dom, type, fn) {
        if (dom.events) {
            if (type && type !== "") {
                let events = dom.events[type];
                if (events) {
                    dom.removeEventListener(type, eventHandler, false);
                    if (fn) {
                        events.splice(events.indexOf(fn), 1);
                    } else {
                        events.length = 0;
                    }
                }
            } else {
                let c = dom.events;
                Reflect.ownKeys(dom.events).forEach(type => {
                    dom.removeEventListener(type, eventHandler, false);
                    dom.events[type].length = 0;
                });
            }
        }
        return dom;
    }
};

exports.default = helper;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _metadata = require(1);

var _metadata2 = _interopRequireDefault(_metadata);

var _ddm2 = require(9);

var _ddm3 = _interopRequireDefault(_ddm2);

var _util = require(8);

var _util2 = _interopRequireDefault(_util);

var _view = require(3);

var _loader = require(4);

var _loader2 = _interopRequireDefault(_loader);

var _const = require(10);

var _macros = require(11);

var _macros2 = _interopRequireDefault(_macros);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scanView(view, type) {
    let r = [];
    if (view.getChildren) {
        view.getChildren().forEach(child => {
            if (child instanceof type) {
                r.push(child);
            }
            if (child.getChildren && child.getChildren().length > 0) {
                r.push(...scanView(child, type));
            }
        });
    }
    return r;
}

let updater = {
    refreshViewTemplate(view) {
        let info = Reflect.getMetadata("view", view.constructor.prototype);
        let ps = Promise.resolve(view.getTemplateText());
        if (info.template) {
            ps = ps.then(() => _loader2.default.loadSource(info.template).then(code => {
                return _util2.default.parseTemplate(code, info.className);
            }));
        }
        return ps.then(text => {
            if (!view.isRemoved() && view.getDDM()) {
                _util2.default.setProp(view, _const.TEMPLATETAG, text);
                let _info = {
                    id: view.getId(),
                    container: view.getDDMContainer(),
                    templateStr: view.getTemplateText(),
                    binders: ({ method, parameters }) => {
                        let info = Reflect.getMetadata("binder", view.constructor.prototype);
                        if (info) {
                            let _method = info[method];
                            if (_method && view[_method]) {
                                view[_method](parameters);
                            }
                        }
                    },
                    macro: {}
                };
                if (view instanceof _view.ViewGroup || view instanceof _view.BondViewGroup) {
                    _info.macro = _macros2.default;
                }
                let _ddm = new _ddm3.default(_info);
                _util2.default.setProp(view, _const.DDMTAG, _ddm);
            }
            if (view.refresh) {
                view.refresh();
            }
        });
    },
    refreshViewStyle(view) {
        let info = Reflect.getMetadata("view", view.constructor.prototype);
        let text = "",
            ps = Promise.resolve();
        if (info.style) {
            let id = `${info.style.replace(/\//g, "-")}:${info.className}`;
            let current = document.getElementById(id);
            if (current) {
                current.parentNode.removeChild(current);
            }
            ps = ps.then(() => _loader2.default.loadSource(info.style).then(code => {
                _util2.default.excuteStyle(_util2.default.parseStyle(code, info.className), id);
            }));
        }
        return ps;
    },
    getViewsByTemplateName(name) {
        let views = [];
        _loader.Modules.scanClass((path, module) => {
            let info = Reflect.getMetadata("view", module.prototype);
            if (info && info.template === name) {
                views.push(module);
            }
        });
        let r = [];
        let root = document.body[_const.VIEWTAG];
        views.forEach(view => {
            r.push(...scanView(root, view));
        });
        return r;
    },
    getViewsByStyleName(name) {
        let views = [];
        _loader.Modules.scanClass((path, module) => {
            let info = Reflect.getMetadata("view", module.prototype);
            if (info && info.style === name) {
                views.push(module);
            }
        });
        let r = [];
        let root = document.body[_const.VIEWTAG];
        views.forEach(view => {
            r.push(...scanView(root, view));
        });
        return r;
    },
    refreshView(temps, styles) {
        let ct = new Set(),
            cs = new Set();
        temps.forEach(temp => {
            updater.getViewsByTemplateName(temp).forEach(view => {
                ct.add(view);
            });
        });
        styles.forEach(style => {
            updater.getViewsByStyleName(style).forEach(view => {
                cs.add(view);
            });
        });
        return _util2.default.queue([...ct].map(view => () => updater.refreshViewTemplate(view)).concat([...cs].map(view => () => updater.refreshViewStyle(view))));
    },
    refresh(files, map) {
        let temps = [],
            styles = [],
            hasjs = false;
        files.forEach(file => {
            let suffix = file.split(".").pop();
            if (suffix === "js") {
                hasjs = true;
            }
            if (suffix === "html") {
                temps.push(file);
            }
            if (["css", "scss", "less"].indexOf(suffix) !== -1) {
                styles.push(file);
            }
        });
        if (!hasjs) {
            temps.forEach(temp => {
                if (_loader.ActiveSource.cache[temp]) {
                    delete _loader.ActiveSource.cache[temp];
                }
            });
            styles.forEach(style => {
                if (_loader.ActiveSource.cache[style]) {
                    delete _loader.ActiveSource.cache[style];
                }
            });
            _loader.Option.sourceMap = map;
            return updater.refreshView(temps, styles);
        } else {
            window.location.reload();
        }
    }
};

exports.default = updater;},function(module,exports,require){"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const img = `data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjFzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgIDwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==`;
const play = `data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPgo8dGl0bGU+Y29udHJvbGxlci1wbGF5PC90aXRsZT4KPHBhdGggZD0iTTE1IDEwLjAwMWMwIDAuMjk5LTAuMzA1IDAuNTE0LTAuMzA1IDAuNTE0bC04LjU2MSA1LjMwM2MtMC42MjQgMC40MDktMS4xMzQgMC4xMDYtMS4xMzQtMC42Njl2LTEwLjI5N2MwLTAuNzc3IDAuNTEtMS4wNzggMS4xMzUtMC42N2w4LjU2MSA1LjMwNWMtMC4wMDEgMCAwLjMwNCAwLjIxNSAwLjMwNCAwLjUxNHoiPjwvcGF0aD4KPC9zdmc+Cg==`;
const pause = `data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPgo8dGl0bGU+Y29udHJvbGxlci1wYXVzPC90aXRsZT4KPHBhdGggZD0iTTE1IDNoLTJjLTAuNTUzIDAtMSAwLjA0OC0xIDAuNnYxMi44YzAgMC41NTIgMC40NDcgMC42IDEgMC42aDJjMC41NTMgMCAxLTAuMDQ4IDEtMC42di0xMi44YzAtMC41NTItMC40NDctMC42LTEtMC42ek03IDNoLTJjLTAuNTUzIDAtMSAwLjA0OC0xIDAuNnYxMi44YzAgMC41NTIgMC40NDcgMC42IDEgMC42aDJjMC41NTMgMCAxLTAuMDQ4IDEtMC42di0xMi44YzAtMC41NTItMC40NDctMC42LTEtMC42eiI+PC9wYXRoPgo8L3N2Zz4K`;

let s = window.localStorage.getItem("ada-hmr-state");
let bar = {
    bar: null,
    isrunning: s === undefined ? true : s === "0" ? true : false,
    start() {
        let str = `<div id="ada-hmr-controllbar"><div class="ada-hmr-controllbar-text">ada</div><div class="ada-hmr-controllbar-btn"></div></div>`;
        let stylestr = `#ada-hmr-controllbar{background-image:url(${img});background-position:center;background-repeat:no-repeat;background-size:contain;width:35px;height:35px;position:fixed;left:5px;bottom:5px;background-color:#3397DB;white;z-index:99999999;border-radius:50%;line-height:35px;text-align:center;color:white;font-weight:bold;text-shadow:1px 1px #155573;font-size:12px;}#ada-hmr-controllbar .ada-hmr-controllbar-text{position:absolute;left:0;top:0;right:0;bottom:0;}#ada-hmr-controllbar .ada-hmr-controllbar-btn{background-image:url(${pause});background-repeat:no-repeat;background-position:center;position:absolute;left:0;top:0;right:0;bottom:0;display:none;}#ada-hmr-controllbar.ada-hmr-pause{background-image:none;}#ada-hmr-controllbar.ada-hmr-pause .ada-hmr-controllbar-btn{background-image:url(${play});}#ada-hmr-controllbar:hover .ada-hmr-controllbar-text{display:none;}#ada-hmr-controllbar:hover .ada-hmr-controllbar-btn{display:block;}`;
        window.addEventListener("load", () => {
            let _a = document.createElement("style");
            _a.setAttribute("media", "screen");
            _a.setAttribute("type", "text/css");
            _a.appendChild(document.createTextNode(stylestr));
            document.getElementsByTagName("head")[0].appendChild(_a);
            let a = document.createElement("div");
            a.innerHTML = str;
            this.bar = document.body.appendChild(a.childNodes[0]);
            this.bar.addEventListener("click", () => {
                if (this.isrunning) {
                    this.isrunning = false;
                    this.bar.classList.add("ada-hmr-pause");
                    window.localStorage.setItem("ada-hmr-state", "1");
                } else {
                    this.isrunning = true;
                    this.bar.classList.remove("ada-hmr-pause");
                    window.localStorage.setItem("ada-hmr-state", "0");
                }
            });
            if (this.isrunning) {
                this.bar.classList.remove("ada-hmr-pause");
            } else {
                this.bar.classList.add("ada-hmr-pause");
            }
        });
        return this;
    },
    getState() {
        return this.isrunning;
    }
};

exports.default = bar;}],"adajs");