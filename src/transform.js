import Browser from "./browser";

const watcher = {
    translate: function () {
        return "translate3d(" + (is.isNumber(this.values.translate3d[0]) ? this.values.translate3d[0] + "px" : this.values.translate3d[0]) + "," +
            (is.isNumber(this.values.translate3d[1]) ? this.values.translate3d[1] + "px" : this.values.translate3d[1]) + "," +
            (is.isNumber(this.values.translate3d[2]) ? this.values.translate3d[2] + "px" : this.values.translate3d[2]) + ")";
    },
    rotate3d: function () {
        let rotate3d = this.values.rotate3d.join("") !== "0000" ? "rotate3d(" + this.values.rotate3d[0] + "," + this.values.rotate3d[1] + "," + this.values.rotate3d[2] + "," + this.values.rotate3d[3] + "deg)" : "";
        rotate3d += (this.values.rotateX !== 0 ? " rotateX(" + this.values.rotateX + "deg)" : "");
        rotate3d += (this.values.rotateY !== 0 ? " rotateY(" + this.values.rotateY + "deg)" : "");
        rotate3d += (this.values.rotateZ !== 0 ? " rotateZ(" + this.values.rotateZ + "deg)" : "");
        return rotate3d;
    },
    scale3d: function () {
        let scale3d = this.values.scale3d.join("") !== "111" ? "scale3d(" + this.values.scale3d[0] + "," + this.values.scale3d[1] + "," + this.values.scale3d[2] + ")" : "";
        scale3d += this.values.scaleX !== 1 ? " scaleX(" + this.values.scaleX + ")" : "";
        scale3d += this.values.scaleY !== 1 ? " scaleY(" + this.values.scaleY + ")" : "";
        scale3d += this.values.scaleZ !== 1 ? " scaleZ(" + this.values.scaleZ + ")" : "";
        return scale3d;
    },
    scale: function () {
        return this.values.scale.join("") !== "11" ? "scale(" + this.values.scale[0] + "," + this.values.scale[1] + ")" : "";
    },
    skew: function () {
        return this.values.skew.join("") !== "00" ? "skew(" + this.values.skew[0] + "deg," + this.values.skew[1] + "deg)" : "";
    },
    rotate: function () {
        return this.values.rotate !== 0 ? "rotate(" + this.values.rotate + "deg)" : "";
    }
};
class Transform {
    constructor(element) {
        this.element = element;
        this.attrs = [];
        this.setter = [];
        Transform.defaultValue.call(this);
    }

    static parse() {
        let info = window.getComputedStyle(this.element, "");
        let matrix = info(Browser.getFixedStylePropName("transform"));
        let a = matrix.match(/(-?[0-9\.]+)/g);
        if (a) {
            if (a.length > 6) {
                a.shift();
            }
            for (let i = 0; i < a.length; i++) {
                a[i] = a[i] / 1;
            }
        } else {
            a = [1, 0, 0, 1, 0, 0];
        }
        return a;
    }

    static defaultValue() {
        let trans = {
            translate: [0, 0],
            translate3d: [0, 0, 0],
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotate: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            rotate3d: [0, 0, 0, 1],
            scale: [1, 1],
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            scale3d: [1, 1, 1],
            skew: [0, 0],
            skewX: 0,
            skewY: 0
        };
        let ap = Transform.parse.call(this);
        if (ap) {
            if (ap[0] !== 1) {
                let a = this.element,
                    transformstr = a.style.webkitTransform || a.style.mozTransform || a.style.msTransform || a.style.transform;
                if (transformstr || transformstr === "") {
                    let sheets = document.styleSheets;
                    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;
                    for (let i = 0; i < sheets.length; i++) {
                        let rules = sheets[i].cssRules || sheets[i].rules;
                        for (let r = 0; r < rules.length; r++) {
                            if (a.matches(rules[r].selectorText)) {
                                transformstr = rules[r].style.webkitTransform || rules[r].style.mozTransform || rules[r].style.msTransform || rules[r].style.transform;
                            }
                        }
                    }
                }
                if (transformstr && transformstr !== "") {
                    let names = [], values = [], name = "", value = "", isname = true;
                    for (let i = 0; i < transformstr.length; i++) {
                        let c = transformstr[i];
                        if (c !== "(" && c !== ")") {
                            if (isname) {
                                name += c;
                            } else {
                                value += c;
                            }
                        } else if (c === "(") {
                            names.push(name.trim());
                            name = "";
                            isname = false;
                        } else if (c === ")") {
                            values.push(value.trim());
                            value = "";
                            isname = true;
                        }
                    }
                    for (let i = 0; i < names.length; i++) {
                        let val = "";
                        if (values[i].indexOf(",") !== -1) {
                            let p = values[i].split(",");
                            for (let k = 0; k < p.length; k++) {
                                p[k] = parseFloat(p[k]);
                            }
                            val = p;
                        } else {
                            val = parseFloat(values[i]);
                        }
                        trans[names[i]] = val;
                    }
                }
            }
            if (ap.length === 6) {
                trans.translate3d = [ap[4], ap[5], 0];
                trans.translateX = ap[4];
                trans.translateY = ap[5];
            } else {
                trans.translate3d = [ap[12], ap[13], ap[14]];
                trans.translateX = ap[12];
                trans.translateY = ap[13];
                trans.translateZ = ap[14];
            }
        }
        this.values = trans;
    }

    static watch(key) {
        if (this.attrs.indexOf(key) === -1) {
            if (watcher[key]) {
                this.attrs.push(key);
                this.setter.push(watcher[key]);
            }
        }
    }

    static watchName(key) {
        if (key.indexOf("translate") !== -1) {
            return "translate";
        } else if (key.indexOf("skew") !== -1) {
            return "skew";
        } else if (key.indexOf("rotate") !== -1) {
            if (key === "rotate3d") {
                return "rotate3d";
            } else {
                return "rotate";
            }
        } else if (key.indexOf("scale") !== -1) {
            if (key === "scale3d") {
                return "scale3d";
            } else {
                return "rotate";
            }
        } else {
            return "";
        }
    }

    static set() {
        let str = "";
        for (let i in this.setter) {
            str += this.setter[i].call(this) + " ";
        }
        this.element.style[Browser.getFixedStylePropName("transform")] = str;
    }

    static translate(index, name, x) {
        if (arguments.length === 2) {
            let n = this.values.translate3d[index];
            if (/^[-0-9\.]*$/.test(n) === false) {
                Transform.defaultValue.call(this);
            }
            return this.values.translate3d[index];
        } else {
            this.values.translate3d[index] = x;
            this.values.translate[index] = x;
            this.values[name] = x;
            Transform.set.call(this);
            return this;
        }
    }

    static sett(type, defaultValue, value) {
        if (arguments.length === 2) {
            return this.values[type];
        } else {
            (value === undefined || value === null) && (value = defaultValue);
            this.values[type] = value;
            Transform.set.call(this);
            return this;
        }
    }

    static getPropValue(element, propName) {
        let info = window.getComputedStyle(element, "");
        return info[Browser.getFixedStylePropName(propName)];
    }

    static setPropValue(element, propName, propValue) {
        element.style[Browser.getFixedStylePropName(propName)] = propValue;
    }

    matrix() {
        return Transform.parse.call(this);
    }

    sets(a) {
        for (let i in a) {
            if (this.values[i] !== undefined) {
                this.values[i] = a[i];
                Transform.watch.call(this, Transform.watchName(i));
            }
        }
        Transform.set.call(this);
        return this;
    }

    scale(x, y) {
        Transform.watch.call(this, "scale");
        if (arguments.length === 0) {
            return this.values.scale;
        } else {
            (x === undefined || x === null) && (x = 1), (y === undefined || y === null) && (y = 1);
            this.values.scale[0] = x;
            this.values.scale[1] = y;
            Transform.set.call(this);
            return this;
        }
    }

    rotate(reg) {
        Transform.watch.call(this, "rotate");
        if (arguments.length === 0) {
            return this.values.rotate;
        } else {
            (reg === undefined || reg === null) && (reg = 0);
            this.values.rotate = reg;
            Transform.set.call(this);
            return this;
        }
    }

    scale3d(x, y, z) {
        Transform.watch.call(this, "scale3d");
        if (arguments.length === 0) {
            return this.values.scale3d;
        } else {
            (x === undefined || x === null) && (x = 1), (y === undefined || y === null) && (y = 1), (z === undefined || z === null) && (z = 1);
            this.values.scale3d[0] = x;
            this.values.scale3d[1] = y;
            this.values.scale3d[2] = z;
            Transform.set.call(this);
            return this;
        }
    }

    rotate3d(x, y, z, reg) {
        Transform.watch.call(this, "rotate3d");
        if (arguments.length === 0) {
            return this.values.rotate3d;
        } else {
            (x === undefined || x === null) && (x = 0), (y === undefined || y === null) && (y = 0), (z === undefined || z === null) && (z = 0), (reg === undefined || reg === null) && (reg = 0);
            this.values.rotate3d[0] = x;
            this.values.rotate3d[1] = y;
            this.values.rotate3d[2] = z;
            this.values.rotate3d[3] = reg;
            Transform.set.call(this);
            return this;
        }
    }

    skew(x, y) {
        Transform.watch.call(this, "skew");
        if (arguments.length === 0) {
            return this.values.skew;
        } else {
            (x === undefined || x === null) && (x = 1), (y === undefined || y === null) && (y = 1);
            this.values.skew[0] = x;
            this.values.skew[1] = y;
            Transform.set.call(this);
            return this;
        }
    }

    x(x) {
        Transform.watch.call(this, "translate");
        return Transform.translate.apply(this, arguments.length === 0 ? [0, "translateX"] : [0, "translateX", x]);
    }

    y(x) {
        Transform.watch.call(this, "translate");
        return Transform.translate.apply(this, arguments.length === 0 ? [1, "translateY"] : [1, "translateY", x]);
    }

    z(x) {
        Transform.watch.call(this, "translate");
        return Transform.translate.apply(this, arguments.length === 0 ? [2, "translateZ"] : [2, "translateZ", x]);
    }

    scaleX(x) {
        Transform.watch.call(this, "scale");
        return Transform.sett.apply(this, arguments.length === 0 ? ["scaleX", 1, x] : ["scaleX", 1, x]);
    }

    scaleY(x) {
        Transform.watch.call(this, "scale");
        return Transform.sett.apply(this, arguments.length === 0 ? ["scaleY", 1, x] : ["scaleY", 1, x]);
    }

    scaleZ(x) {
        Transform.watch.call(this, "scale");
        return Transform.sett.apply(this, arguments.length === 0 ? ["scaleZ", 1, x] : ["scaleZ", 1, x]);
    }

    rotateX(x) {
        Transform.watch.call(this, "rotate");
        return Transform.sett.apply(this, arguments.length === 0 ? ["rotateX", 0, x] : ["rotateX", 0, x]);
    }

    rotateY(x) {
        Transform.watch.call(this, "rotate");
        return Transform.sett.apply(this, arguments.length === 0 ? ["rotateY", 0, x] : ["rotateY", 0, x]);
    }

    rotateZ(x) {
        Transform.watch.call(this, "rotate");
        return Transform.sett.apply(this, arguments.length === 0 ? ["rotateZ", 0, x] : ["rotateZ", 0, x]);
    }

    skewX(x) {
        Transform.watch.call(this, "skew");
        return Transform.sett.apply(this, arguments.length === 0 ? ["skewX", 0, x] : ["skewX", 0, x]);
    }

    skewY(x) {
        Transform.watch.call(this, "skew");
        return Transform.sett.apply(this, arguments.length === 0 ? ["skewY", 0, x] : ["skewY", 0, x]);
    }

    origin(a, b) {
        if (arguments.length === 0) {
            let a = Transform.getPropValue(this.element, "transform-origin").split(" ");
            return {x: a[0], y: a[1]};
        } else if (arguments.length === 2) {
            Transform.setPropValue(this.element, "transform-origin", `${a} ${b}`);
            return this;
        }
    }

    style(a) {
        if (arguments.length === 0) {
            return Transform.getPropValue(this.element, "transform-style");
        } else {
            Transform.setPropValue(this.element, "transform-style", a);
            return this;
        }
    }

    perspective(a) {
        if (arguments.length === 0) {
            return Transform.getPropValue(this.element, "perspective");
        } else {
            Transform.setPropValue(this.element, "perspective", a);
            return this;
        }
    }

    perspectiveOrigin() {
        if (arguments.length === 0) {
            let a = Transform.getPropValue(this.element, "perspective-origin").split(" ");
            return {x: a[0], y: a[1]};
        } else if (arguments.length === 2) {
            Transform.setPropValue(this.element, "perspective-origin", `${a} ${b}`);
            return this;
        }
    }

    backface() {
        if (arguments.length === 0) {
            return Transform.getPropValue(this.element, "backface-visibility");
        } else {
            Transform.setPropValue(this.element, "backface-visibility", a);
            return this;
        }
    }
}

export default function (element) {
    return new Transform(element);
}