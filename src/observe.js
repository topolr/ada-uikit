class Observe {
    constructor(obj, fn) {
        this.fn = fn;
        return Observe.setObserve.call(this, obj);
    }

    static isObject(obj) {
        return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    }

    static isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    static setunwrite(obj, key, value) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        });
    };

    static setwrite(obj, key, value) {
        let ths = this;
        let val = Observe.setObserve(value);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return val;
            },
            set(value) {
                if (value !== val) {
                    val = Observe.setObserve.call(ths, value);
                    ths.fn && ths.fn();
                }
            }
        });
    };

    static setObserve(obj) {
        let ths = this;
        if (Observe.isArray(obj)) {
            Observe.setunwrite(obj, "splice", function (...args) {
                ths.fn && ths.fn();
                return Array.prototype.splice.apply(this, args);
            });
            Observe.setunwrite(obj, "pop", function (...args) {
                ths.fn && ths.fn();
                return Array.prototype.pop.apply(this, args);
            });
            Observe.setunwrite(obj, "push", function (...args) {
                ths.fn && ths.fn();
                return Array.prototype.push.apply(this, args);
            });
            Observe.setunwrite(obj, "shift", function (...args) {
                ths.fn && ths.fn();
                return Array.prototype.shift.apply(this, args);
            });
            Observe.setunwrite(obj, "unshift", function (...args) {
                ths.fn && ths.fn();
                return Array.prototype.unshift.apply(this, args);
            });
        } else if (Observe.isObject(obj)) {
            Object.keys(obj).forEach(key => {
                Observe.setwrite.call(ths, obj, key, obj[key])
            });
        }
        return obj;
    };
}

export default function (obj, fn) {
    return new Observe(obj, fn);
};