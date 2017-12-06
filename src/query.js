import is from "./is";

const dom = {
    regs: {
        root: /^(?:body|html)$/i,
        _class: /^\.([\w-]+)$/,
        _id: /^#([\w-]*)$/,
        _tag: /^[\w-]+$/,
        _html: /^\s*<(\w+|!)[^>]*>/,
        _tagName: /<([\w:]+)/,
        _property: /-+(.)?/g
    },
    util: {
        getDom(nodes) {
            let a = new query();
            if (arguments.length === 1) {
                a.nodes = nodes;
                a.length = nodes.length;
            } else {
                a.nodes = [];
                a.length = 0;
            }
            return a;
        },
        isClass(selector) {
            return dom.regs._class.test(selector);
        },
        isId(selector) {
            return dom.regs._id.test(selector);
        },
        isTag(selector) {
            return dom.regs._tag.test(selector);
        },
        isHTML(selector) {
            return dom.regs._html.test(selector);
        },
        query(node, selector) {
            let ar = null;
            switch (true) {
                case this.isId(selector):
                    let _a = document.getElementById(selector.substring(1, selector.length));
                    ar = _a ? [_a] : [];
                    break;
                case this.isClass(selector):
                    ar = [...node.getElementsByClassName(selector.substring(1, selector.length))];
                    break;
                case this.isTag(selector):
                    ar = [...node.getElementsByTagName(selector)];
                    break;
                default :
                    ar = [...node.querySelectorAll(selector)];
                    break;
            }
            return ar;
        },
        queryChild(node, selector) {
            let id = node.getAttribute("id") || "__bright__";
            node.setAttribute("id", id);
            let ar = dom.util.query(node, "#" + id + ">" + selector);
            if (id === "__bright__") {
                node.removeAttribute("id");
            }
            return ar;
        },
        queryChildAll(node, selector) {
            let id = node.getAttribute("id") || "__bright__";
            node.setAttribute("id", id);
            let ar = dom.util.query(node, "#" + id + " " + selector);
            if (id === "__bright__") {
                node.removeAttribute("id");
            }
            return ar;
        },
        repairTags: {
            area: {l: 1, s: "<map>", e: ""},
            param: {l: 1, s: "<object>", e: ""},
            col: {l: 2, s: "<table><tbody></tbody><colgroup>", e: "</table>"},
            legend: {l: 1, s: "<fieldset>"},
            option: {l: 1, s: "<select multiple='multiple'>", e: ""},
            thead: {l: 1, s: "<table>", e: "</table>"},
            tr: {l: 2, s: "<table><tbody>", e: ""},
            td: {l: 3, s: "<table><tbody><tr>", e: ""},
            _general: {s: "", e: "", l: 0}
        },
        parseHTML(html) {
            let a = html.match(dom.regs._tagName),
                ops = dom.util.repairTags[(a ? a[1] : "_general")] || dom.util.repairTags["_general"];
            let div = document.createElement("DIV");
            div.innerHTML = ops.s + html + ops.e;
            let t = div;
            for (let i = 0; i < ops.l; i++) {
                t = t.firstChild;
            }
            return [...t.childNodes];
        },
        parseFlagment(html) {
            let _c = dom.util.parseHTML(html);
            let a = window.document.createDocumentFragment();
            for (let i in _c) {
                a.appendChild(_c[i]);
            }
            return a;
        },
        propertyName(str) {
            return str.replace(dom.regs._property, function (match, chr, index) {
                if (index === 0) {
                    return match.substring(1, 2);
                } else {
                    return chr ? chr.toUpperCase() : "";
                }
            });
        },
        cleanNode(node) {
            if (node) {
                if (node.datasets) {
                    for (let t in node.datasets) {
                        let p = node.datasets[t];
                        if (p && p.clean) {
                            p.clean();
                        }
                        node.datasets[t] = null;
                    }
                    node.datasets = null;
                }
                event.util.unbindnode(node);
                let c = node.getElementsByClassName("incache");
                for (let n in c) {
                    if (c[n].nodeType) {
                        for (let m in c[n].datasets) {
                            let q = c[n].datasets[m];
                            if (q && q.clean) {
                                q.clean();
                            }
                            c[n].datasets[m] = null;
                        }
                        c[n].datasets = null;
                        event.util.unbindnode(c[n]);
                    }
                }
            }
        },
        supported(paras) {
            if (arguments.length === 1) {
                return is.isString(paras) || paras instanceof dom || is.isWindow(paras) || is.isDocument(paras) || paras.nodeType === 1;
            } else {
                return false;
            }
        }
    }
};

class windoc {
    constructor(obj) {
        this.obj = obj;
    }

    width() {
        return window.innerWidth;
    }

    height() {
        return window.innerHeight;
    }

    scrollTop(top) {
        let a = this;
        if (arguments.length === 0) {
            a = document.body.scrollTop || document.documentElement.scrollTop;
        } else {
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;
        }
        return a;
    }

    scrollLeft(left) {
        let a = this;
        if (arguments.length === 0) {
            a = document.body.scrollLeft || document.documentElement.scrollLeft;
        } else {
            document.body.scrollLeft = left;
        }
        return a;
    }
}

class query {
    constructor() {
        this.nodes = [];
        this.length = 0;
    }

    get(a) {
        a = a / 1;
        if (a >= 0 && a < this.nodes.length) {
            return this.nodes[a];
        } else {
            return null;
        }
    }

    find(selector) {
        let r = [];
        if (!this.isEmpty()) {
            if (is.isString(selector)) {
                r = dom.util.query(this.nodes[0], selector);
            }
        }
        return dom.util.getDom(r);
    }

    children(num) {
        let r = [];
        if (!this.isEmpty()) {
            if (is.isString(num)) {
                r = dom.util.queryChild(this.nodes[0], num);
            } else {
                if (arguments.length === 1 && num >= 0) {
                    r = this.nodes[0].children[num] ? [this.nodes[0].children[num]] : [];
                } else {
                    r = [...this.nodes[0].children];
                }
            }
        }
        return dom.util.getDom(r);
    }

    siblings(selector) {
        let r = [];
        if (!this.isEmpty()) {
            let a = [];
            if (is.isString(selector) && this.nodes[0].parentNode) {
                a = dom.util.queryChild(this.nodes[0].parentNode, selector);
            } else {
                a = this.nodes[0].parentNode ? [...this.nodes[0].parentNode.children] : [];
            }
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== this.nodes[0]) {
                    r.push(a[i]);
                }
            }
        }
        return dom.util.getDom(r);
    }

    has(selector) {
        let r = [];
        for (let i = 0; i < this.nodes.length; i++) {
            let a = dom.util.queryChild(this.nodes[i], selector);
            if (a.length > 0) {
                r.push(this.nodes[i]);
            }
        }
        return dom.util.getDom(r);
    }

    index() {
        let a = -1;
        if (!this.isEmpty()) {
            let parent = this.nodes[0].parentNode;
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i] === this.nodes[0]) {
                    a = i;
                    break;
                }
            }
        }
        return a;
    }

    filter(selector) {
        let r = [];
        if (!this.isEmpty()) {
            let a = dom.util.query(window.document, selector);
            if (a.length > 0) {
                for (let i = 0; i < this.nodes.length; i++) {
                    (a.indexOf(this.nodes[i]) !== -1) && r.push(this.nodes[i]);
                }
            }
        }
        return dom.util.getDom(r);
    }

    first() {
        let r = [];
        if (!this.isEmpty()) {
            r.push(this.get(0));
        }
        return dom.util.getDom(r);
    }

    last() {
        let r = [];
        if (this.nodes.length > 0) {
            r.push(this.get(this.length - 1));
        }
        return dom.util.getDom(r);
    }

    scrollTop(top) {
        let a = this;
        if (arguments.length === 0) {
            if (!this.isEmpty()) {
                a = (this.nodes[0]["scrollTop"] !== undefined) ? this.nodes[0].scrollTop : this.nodes[0].scrollY;
            } else {
                a = null;
            }
        } else {
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i]["scrollTop"] !== undefined) {
                    this.nodes[i].scrollTop = top;
                } else {
                    this.nodes[i].scrollY = top;
                }
            }
        }
        return a;
    }

    scrollLeft(left) {
        let a = this;
        if (arguments.length === 0) {
            if (!this.isEmpty()) {
                a = (this.nodes[0]["scrollLeft"] !== undefined) ? this.nodes[0].scrollLeft : this.nodes[0].scrollX;
            } else {
                a = null;
            }
        } else {
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i]["scrollLeft"] !== undefined) {
                    this.nodes[i].scrollLeft = left;
                } else {
                    this.nodes[i].scrollX = left;
                }
            }
        }
        return a;
    }

    parent() {
        let selector = arguments[0], r = [];
        if (!this.isEmpty()) {
            if (is.isString(selector)) {
                let n = dom.util.query(window.document, selector);
                let b = this.nodes[0].parentNode;
                while (b && !is.isDocument(b)) {
                    if (n.indexOf(b) !== -1) {
                        r.push(b);
                    }
                    b = b.parentNode;
                }
            } else if (is.isNumber(selector) && selector > 0) {
                let b = this.nodes[0].parentNode, c = selector - 1;
                while (b && !is.isDocument(b) && c > 0) {
                    c--;
                    b = b.parentNode;
                }
                r.push(b);
            } else {
                this.nodes[0].parentNode && r.push(this.nodes[0].parentNode);
            }
        }
        return dom.util.getDom(r);
    }

    parents() {
        let selector = arguments[0], r = [];
        if (!this.isEmpty()) {
            let b = this.nodes[0].parentNode;
            while (b && !is.isDocument(b)) {
                r.push(b);
                b = b.parentNode;
            }
            if (is.isString(selector)) {
                let n = dom.util.query(window.document, selector);
                r = r.filter(function (c) {
                    if (n.indexOf(c) !== -1) {
                        return true;
                    }
                });
            }
        }
        return dom.util.getDom(r);
    }

    next() {
        let r = [];
        if (!this.isEmpty()) {
            let a = this.nodes[0].nextSibling;
            a && r.push(a);
        }
        return dom.util.getDom(r);
    }

    nexts(selector) {
        let r = [], ths = this;
        if (!this.isEmpty()) {
            let a = this.nodes[0].nextSibling;
            while (a) {
                if (a.nodeType === 1) {
                    r.push(a);
                }
                a = a.nextSibling;
            }
            if (is.isString(selector) && this.nodes[0].parentNode) {
                let c = dom.util.queryChild(this.nodes[0].parentNode, selector);
                r = r.filter(function (n) {
                    if (c.indexOf(n) !== -1 && n !== ths.nodes[0]) {
                        return true;
                    }
                });
            }
        }
        return dom.util.getDom(r);
    }

    prev() {
        let r = [];
        if (!this.isEmpty()) {
            let a = this.nodes[0].previousSibling;
            a && r.push(a);
        }
        return dom.util.getDom(r);
    }

    prevs(selector) {
        let r = [], ths = this;
        if (!this.isEmpty()) {
            let a = this.nodes[0].previousSibling;
            while (a) {
                if (a.nodeType === 1) {
                    r.push(a);
                }
                a = a.previousSibling;
            }
            if (is.isString(selector) && this.nodes[0].parentNode) {
                let c = dom.util.queryChild(this.nodes[0].parentNode, selector);
                r = r.filter(function (n) {
                    if (c.indexOf(n) !== -1 && n !== ths.nodes[0]) {
                        return true;
                    }
                });
            }
        }
        return dom.util.getDom(r);
    }

    eq(index) {
        let r = [];
        if (index >= 0 && index < this.nodes.length) {
            r.push(this.nodes[index]);
        }
        return dom.util.getDom(r);
    }

    each(fn) {
        if (fn) {
            for (let i = 0, len = this.nodes.length; i < len; i++) {
                if (fn.call(this.nodes[i], this.nodes[i], i, this.nodes) === false) {
                    break;
                }
            }
        }
        return this;
    }

    remove() {
        let num = arguments[0];
        if (num && is.isNumber(num) && num < this.nodes.length) {
            let a = this.nodes[num];
            if (a) {
                dom.util.cleanNode(a);
                a.parentNode.removeChild(a);
            }
        } else if (is.isString(num)) {
            let c = dom.util.query(window.document, num);
            for (let i = 0; i < this.nodes.length; i++) {
                if (c.indexOf(this.nodes[i] !== -1)) {
                    this.nodes[i].parentNode && this.nodes[i].parentNode.removeChild(this.nodes[i]);
                }
            }
        } else {
            for (let i = 0; i < this.nodes.length; i++) {
                let a = this.nodes[i];
                if (a) {
                    dom.util.cleanNode(a);
                    a.parentNode && a.parentNode.removeChild(a);
                }
            }
        }
        return this;
    }

    empty() {
        for (let t = 0; t < this.nodes.length; t++) {
            let c = this.nodes[t].children;
            for (let i = 0; i < c.length; i++) {
                c[i].nodeType && dom.util.cleanNode(c[i]);
            }
            this.nodes[t].innerHTML = "";
        }
        return this;
    }

    clean() {
        for (let i = 0; i <= this.nodes.length; i++) {
            dom.util.cleanNode(this.nodes[i]);
        }
        this.nodes = null;
        this.length = 0;
    }

    clone() {
        let r = [];
        if (!this.isEmpty()) {
            r.push(this.nodes[0].cloneNode(true));
        }
        return dom.util.getDom(r);
    }

    wrap(htm) {
        for (let i = 0; i < this.nodes.length; i++) {
            let vv = null;
            if (is.isString(htm)) {
                vv = dom.util.parseHTML(htm)[0] || null;
            } else if (htm instanceof query) {
                vv = dom.nodes[0];
            } else if (htm.nodeType) {
                vv = htm;
            } else if (is.isFunction(htm)) {
                let b = htm();
                is.isString(b) && (vv = dom.util.parseHTML(htm)[0] || null);
            }
            if (vv) {
                let c = this.nodes[i];
                if (c.parentNode) {
                    c.parentNode.replaceChild(vv, c);
                    vv.appendChild(c);
                }
            }
        }
        return this;
    }

    append() {
        let a = arguments[0];
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                let _c = dom.util.parseFlagment(a);
                for (let i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].appendChild(_c.cloneNode(true));
                }
            } else if (a instanceof query) {
                for (let i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].appendChild(a.nodes[0]);
                }
            } else if (a && a.nodeType) {
                for (let i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].appendChild(a);
                }
            } else if (is.isFunction(a)) {
                for (let i = 0; i < this.nodes.length; i++) {
                    let d = a.call(this.nodes[i], i, this.nodes[i].innerHTML);
                    dom.util.isHTML(d) && this.nodes[i].appendChild(dom.util.parseFlagment(d));
                }
            }
        }
        return this;
    }

    appendTo(a) {
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                let b = dom.util.query(window.document, a);
                b.length > 0 && b[0].appendChild(this.nodes[0]);
            } else if (a instanceof query) {
                a.length > 0 && a.nodes[0].appendChild(this.nodes[0]);
            } else {
                a.appendChild(this.nodes[0]);
            }
        }
        return this;
    }

    insertBefore(a) {
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                let cd = dom.util.query(window.document, a)[0];
                cd && cd.parentNode && cd.parentNode.insertBefore(this.nodes[0], cd);
            } else if (a instanceof query) {
                !a.isEmpty() && a.parent().get(0).insertBefore(this.nodes[0], a.get(0));
            } else {
                a.parentNode && a.parentNode.insertBefore(this.nodes[0], a);
            }
        }
        return this;
    }

    insertAfter(a) {
        if (!this.isEmpty()) {
            let newnode = null;
            if (is.isString(a)) {
                let newnode = dom.util.query(window.document, a)[0] || null;
            } else if (a instanceof query) {
                newnode = a.nodes[0] || null;
            } else if (a.nodeType) {
                newnode = a;
            }
            if (newnode) {
                if (newnode.nextSibling) {
                    newnode.parentNode.insertBefore(this.nodes[0], newnode.nextSibling);
                } else {
                    newnode.parentNode.appendChild(this.nodes[0]);
                }
            }
        }
        return this;
    }

    prepend() {
        let a = arguments[0];
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                let _c = dom.util.parseFlagment(a);
                for (let i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[i].childNodes.length !== 0) {
                        this.nodes[i].insertBefore(_c.cloneNode(true), this.nodes[i].firstChild);
                    } else {
                        this.nodes[i].appendChild(_c.cloneNode(true));
                    }
                }
            } else if (is.isFunction(a)) {
                for (let i = 0; i < this.nodes.length; i++) {
                    let d = a.call(this.nodes[i], i, this.nodes[i].innerHTML);
                    if (dom.util.isHTML(d)) {
                        if (this.nodes[i].childNodes.length > 0) {
                            this.nodes[i].insertBefore(dom.util.parseFlagment(d), this.nodes[i].firstChild);
                        } else {
                            this.nodes[i].appendChild(dom.util.parseFlagment(d));
                        }
                    }
                }
            }
        }
        return this;
    }

    prependTo(a) {
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                let b = dom.util.query(window.document, a);
                if (b.length > 0) {
                    if (b[0].childNodes.length > 0) {
                        b[0].insertBefore(this.nodes[0], b[0].firstChild);
                    } else {
                        b[0].appendChild(this.nodes[0]);
                    }
                }
            } else if (a instanceof query) {
                if (!a.isEmpty()) {
                    if (a.nodes[0].childNodes.length > 0) {
                        a.nodes[0].insertBefore(this.nodes[0], a.nodes[0].firstChild);
                    } else {
                        a.nodes[0].appendChild(this.nodes[0]);
                    }
                }
            } else if (a.nodeType === 1) {
                if (a.children.length > 0) {
                    a.insertBefore(this.nodes[0], a.firstChild);
                } else {
                    a.appendChild(this.nodes[0]);
                }
            }
        }
        return this;
    }

    before(a) {
        if (!this.isEmpty() && this.nodes[0].parentNode) {
            if (is.isString(a)) {
                let _c = dom.util.parseFlagment(a);
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(_c, this.nodes[0]);
            } else if (a instanceof dom) {
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(a.nodes[0], this.nodes[0]);
            } else if (a.nodeType) {
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(a, this.nodes[0]);
            }
        }
        return this;
    }

    after(a) {
        if (!this.isEmpty()) {
            let newnode = null;
            if (is.isString(a)) {
                newnode = dom.util.parseFlagment(a);
            } else if (a instanceof query) {
                newnode = a.get(0);
            } else if (a.nodeType) {
                newnode = a;
            }
            if (this.nodes[0].nextSibling) {
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(newnode, this.nodes[0].nextSibling);
            } else {
                this.nodes[0].parentNode && this.nodes[0].parentNode.appendChild(newnode);
            }
        }
        return this;
    }

    replaceWith(a) {
        if (!this.isEmpty()) {
            let newnode = null;
            if (is.isString(a)) {
                newnode = dom.util.query(window.document, a)[0];
            } else if (a instanceof query) {
                newnode = a.nodes[0];
            } else if (a.nodeType) {
                newnode = a;
            }
            if (newnode) {
                newnode.parentNode.replaceChild(this.nodes[0], newnode);
            }
        }
        return this;
    }

    equal(a) {
        return this === a;
    }

    css(a, b) {
        let t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1 && is.isObject(a)) {
                a = prefix.fix(a);
                for (let i = 0; i < this.nodes.length; i++) {
                    let str = this.nodes[i].style.cssText;
                    if (!str[str.length - 1] === ";") {
                        str += ";";
                    }
                    for (let j in a) {
                        str += j + ":" + a[j] + ";";
                    }
                    this.nodes[i].style.cssText = str;
                }
            } else if (arguments.length === 1 && is.isString(a)) {
                a = prefix.fix(a);
                t = window.getComputedStyle(this.nodes[0], '').getPropertyValue(a);
            } else if (arguments.length === 2) {
                for (let i = 0; i < this.nodes.length; i++) {
                    let c = prefix.fix(a);
                    this.nodes[i].style[dom.util.propertyName(c)] = b;
                }
            }
        }
        return t;
    }

    attr(a, b) {
        let tp = this;
        if (!this.isEmpty()) {
            if (arguments.length === 2) {
                if (a !== "") {
                    for (let i = 0; i < this.nodes.length; i++) {
                        this.nodes[i].setAttribute(a, b);
                    }
                }
            } else if (arguments.length === 1) {
                if (is.isObject(a)) {
                    for (let t = 0; t < this.nodes.length; t++) {
                        for (let i in a) {
                            if (i !== "") {
                                this.nodes[t].setAttribute(i, a[i]);
                            }
                        }
                    }
                } else if (a) {
                    tp = this.nodes[0].getAttribute(a);
                }
            }
        }
        return tp;
    }

    removeAttr(name) {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].removeAttribute(name);
        }
        return this;
    }

    dataset(name, value) {
        let _a = this;
        if (this.nodes.length > 0) {
            if (arguments.length === 1) {
                if (is.isString(name)) {
                    if (this.nodes[0].dataset) {
                        _a = this.nodes[0].dataset[name];
                    } else {
                        _a = this.nodes[0].getAttribute(util.getDatasetName(name));
                    }
                } else if (is.isObject(name)) {
                    for (let i in name) {
                        if (this.nodes[0].dataset) {
                            this.nodes[0].dataset[i] = name[i];
                        } else {
                            this.nodes[0].setAttribute(util.getDatasetName(i), name[i]);
                        }
                    }
                }
            } else if (arguments.length === 2) {
                for (let i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[0].dataset) {
                        this.nodes[i].dataset[name] = value;
                    } else {
                        this.nodes[0].setAttribute(util.getDatasetName(name), value);
                    }
                }
            } else if (arguments.length === 0) {
                if (this.nodes[0].dataset) {
                    _a = this.nodes[0].dataset;
                } else {
                    let t = this.nodes[0].attrbutes;
                    _a = {};
                    for (let i = 0; i < t.length; t++) {
                        if (t[i].nodeName.indexOf("data-") === 0) {
                            _a[util.getDatasetReserve(t[i].nodeName)] = t[i].nodeValue;
                        }
                    }
                }
            }
        }
        return _a;
    }

    create(tagName, ns) {
        if (tagName) {
            if (ns) {
                this.nodes = [window.document.createElementNS(ns, tagName)];
            } else {
                this.nodes = [window.document.createElement(tagName)];
            }
        } else {
            this.nodes = [window.document.createDocumentFragment()];
        }
        this.length = this.nodes.length;
        return this;
    }

    width(a) {
        if (arguments.length === 1) {
            if (is.isNumber(a)) {
                a = a + "px";
            }
            this.css("width", a);
            return this;
        } else {
            return this.nodes[0].offsetWidth;
        }
    }

    height(a) {
        if (arguments.length === 1) {
            if (is.isNumber(a)) {
                a = a + "px";
            }
            this.css("height", a);
            return this;
        } else {
            return this.nodes[0].offsetHeight;
        }
    }

    offset() {
        if (!this.isEmpty()) {
            let obj = this.nodes[0].getBoundingClientRect();
            return {
                left: obj.left + window.pageXOffset,
                top: obj.top + window.pageYOffset,
                width: obj.width,
                height: obj.height
            };
        } else {
            return null;
        }
    }

    hide() {
        for (let i = 0; i < this.nodes.length; i++) {
            let ds = window.getComputedStyle(this.nodes[i], '').getPropertyValue("display");
            if (ds !== "none") {
                this.nodes[i].setAttribute("ds", ds);
                this.nodes[i].style.display = "none";
            }
        }
        return this;
    }

    show() {
        for (let i = 0; i < this.nodes.length; i++) {
            let ds = window.getComputedStyle(this.nodes[i], '').getPropertyValue("display");
            if (ds === "none") {
                let a = this.nodes[i].getAttribute("ds");
                if (a) {
                    this.nodes[i].removeAttribute("ds");
                    this.nodes[i].style.display = a;
                } else {
                    this.nodes[i].style.display = "block";
                }
            }
        }
        return this;
    }

    visible(bole) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (bole) {
                this.nodes[i].style["visibility"] = "visible";
            } else {
                this.nodes[i].style["visibility"] = "hidden";
            }
        }
        return this;
    }

    html(tags) {
        let t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                for (let i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].innerHTML = tags;
                }
            } else {
                t = this.nodes[0].innerHTML;
            }
        }
        return t;
    }

    outer() {
        if (!this.isEmpty()) {
            return this.nodes[0].outerHTML;
        }
        return "";
    }

    text(text) {
        let t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                for (let i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].innerText = text;
                }
            } else {
                t = this.nodes[0].innerText;
            }
        }
        return t;
    }

    val(a) {
        let t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                for (let i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].value = a;
                }
            } else {
                t = this.nodes[0].value;
            }
        }
        return t;
    }

    addClass(a) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].classList) {
                this.nodes[i].classList.add(a);
            } else {
                if (this.nodes[i].className.indexOf(a) === -1) {
                    this.nodes[i].className = this.nodes[i].className + " " + a;
                }
            }
        }
        return this;
    }

    removeClass(a) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].classList) {
                this.nodes[i].classList.remove(a);
            } else {
                if (this.nodes[i].className.indexOf(a) !== -1) {
                    let reg = new RegExp('(\\s|^)' + a + '(\\s|$)');
                    this.nodes[i].className = this.nodes[i].className.replace(reg, ' ');
                }
            }
        }
        return this;
    }

    contains(a) {
        if (!this.isEmpty()) {
            let b = topolr(a);
            if (!b.isEmpty()) {
                return this.nodes[0].contains(b.nodes[0]);
            }
        }
        return false;
    }

    contain(a) {
        return this.same(a) || this.contains(a);
    }

    hasClass(a) {
        let _a = false;
        if (!this.isEmpty()) {
            if (this.nodes[0].classList) {
                _a = this.nodes[0].classList.contains(a);
            } else {
                _a = this.nodes[0].className.indexOf(a) === -1;
            }
        }
        return _a;
    }

    toggleClass(a) {
        if (!this.isEmpty()) {
            if (this.nodes[0].classList) {
                this.nodes[0].classList.toggle(a);
            } else {
                if (this.nodes[0].className.indexOf(a) !== -1) {
                    let reg = new RegExp('(\\s|^)' + a + '(\\s|$)');
                    for (let i = 0; i < this.nodes.length; i++) {
                        this.nodes[i].className = this.nodes[i].className.replace(reg, ' ');
                    }
                } else {
                    for (let i = 0; i < this.nodes.length; i++) {
                        this.nodes[i].className = this.nodes[i].className + " " + a;
                    }
                }
            }
        }
        return this;
    }

    add(a) {
        let k = topolr(a);
        this.nodes = this.nodes.concat(k.nodes);
        this.length = this.nodes.length;
        return this;
    }

    prop(name, value) {
        for (let i = 0; i < this.nodes.length; i++) {
            let val = this.nodes[i][name];
            if (val !== undefined) {
                if (is.isFunction(value)) {
                    this.nodes[i][name] = value.call(this.nodes[i], i, val);
                } else {
                    this.nodes[i][name] = value;
                }
            }
        }
        return this;
    }

    position(a, b) {
        if (arguments.length === 0) {
            let a = this.offsetParent();
            if (a.length > 0 && !is.isDocument(a.get(0))) {
                return {
                    left: this.css("left"),
                    top: this.css("top")
                };
            } else {
                return this.offset();
            }
        } else {
            a && this.css("left", a);
            b && this.css("top", b);
            return this;
        }
    }

    offsetParent() {
        let r = [];
        if (!this.isEmpty()) {
            if (this.nodes[0].offsetParent === undefined) {
                let a = this.nodes[0].parentNode;
                while (a && !dom.regs.root.test(a.nodeName) && window.getComputedStyle(a, '').getPropertyValue("position") === "static") {
                    a = a.parentNode;
                }
                r.push(a);
            } else {
                r.push(this.nodes[0].offsetParent);
            }
        }
        return dom.util.getDom(r);
    }

    isEmpty(fn) {
        if (arguments.length === 0) {
            return this.nodes.length === 0;
        } else {
            if (is.isFunction(fn)) {
                fn.call(this, this.nodes.length === 0);
                return this;
            }
            return this;
        }
    }
}

export default function (start) {
    let result = new query();
    if (arguments.length === 1 && is.isAvalid(start)) {
        if (is.isString(start)) {
            if (dom.util.isHTML(start)) {
                result.nodes = dom.util.parseHTML(start);
            } else {
                result.nodes = dom.util.query(window.document, start);
            }
            result.length = result.nodes.length;
        } else if (start instanceof query) {
            result.nodes = start.nodes;
            result.length = start.length;
        } else if (is.isWindow(start) || is.isDocument(start)) {
            result = new windoc(start);
        } else if (start.nodeType === 1) {
            result.nodes = [start];
            result.length = 1;
        } else {
            result.nodes = [];
            result.length = 0;
        }
    } else if (arguments.length === 0) {
        result.nodes = [];
        result.length = 0;
    }
    return result;
}
