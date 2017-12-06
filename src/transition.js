import Browser from "./browser";

class Transition {
    constructor(element) {
        this.mapping = {};
        this.element = element;
        let info = window.getComputedStyle(this.element, "");
        let type = info[Browser.getFixedStylePropName("transition-timing-function")].split(",")
        let delay = info[Browser.getFixedStylePropName("transition-delay")].split(",");
        let duration = info[Browser.getFixedStylePropName("transition-duration")].split(",");
        let prop = info[Browser.getFixedStylePropName("transition-property")].split(",");
        prop.forEach((value, i) => {
            this.mapping[value] = {
                property: value,
                time: parseFloat(duration[i]) * 1000,
                type: type[i],
                delay: parseFloat(delay[i]) * 1000,
                fn: null
            };
        });
    }

    static setCss() {
        let value = [];
        for (let i in this.mapping) {
            if (this.mapping[i]) {
                value.push(`${i} ${this.mapping[i].time}ms ${this.mapping[i].type} ${this.mapping[i].delay}ms`);
            }
        }
        if (value.length > 0) {
            value = value.join(",");
        } else {
            value = "none";
        }
        this.element.style[`${Browser.prefix.replace(/-/g, "")}Transition`] = value;
    }

    set(properties, option) {
        let ops = {time: 200, type: "ease-out", delay: 0};
        Object.assign(ops, option);
        properties.split(",").forEach(property => {
            property = Browser.getFixedStylePropName(property);
            this.mapping[property] = {
                property: property,
                time: ops.time,
                type: ops.type,
                delay: ops.delay
            };
        });
        Transition.setCss.call(this);
        return this;
    };

    get(property) {
        let a = this.mapping[Browser.getFixedStylePropName(property)];
        if (a) {
            return {
                type: a.type,
                time: a.time,
                delay: a.delay,
                property: property
            };
        }
        return a;
    };

    clean(properties) {
        if (properties) {
            properties.split(",").forEach(name => {
                let _name = Browser.getFixedStylePropName(name);
                this.mapping[_name] && (this.mapping[_name] = null);
            });
        } else {
            this.mapping = {};
        }
        Transition.setCss.call(this);
        return this;
    };

    when(action) {
        return new Promise((resolve, reject) => {
            action && action(this.element);
            let fn = () => {
                this.clean();
                this.element.removeEventListener(Browser.transitionEnd, fn);
                resolve(this);
            };
            this.element.addEventListener(Browser.transitionEnd, fn);
        });
    }
}

export default function (element) {
    return new Transition(element);
};