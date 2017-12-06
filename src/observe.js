class Observe {
    constructor(obj, fn) {
        this.fn = fn;
        return Observe.setObserve.call(this, obj);
    }

    static setunwritelet(obj, key, value) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        });
    };

    static setwritelet(obj, key, value) {
        let ths = this;
        let val = Observe.setObserve(value);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return val;
            },
            set: function (value) {
                if (value !== val) {
                    val = Observe.setObserve.call(ths, value);
                    ths.fn && ths.fn();
                }
            }
        });
    };

    static setObservelet(obj) {
        let ths = this;
        if (is.isArray(obj)) {
            Observe.setunwrite(obj, "splice", function () {
                ths.fn && ths.fn();
                return Array.prototype.splice.apply(this, Array.prototype.slice.call(arguments));
            });
            Observe.setunwrite(obj, "pop", function () {
                ths.fn && ths.fn();
                return Array.prototype.pop.apply(this, Array.prototype.slice.call(arguments));
            });
            Observe.setunwrite(obj, "push", function (obj) {
                ths.fn && ths.fn();
                return Array.prototype.push.apply(this, Array.prototype.slice.call(arguments));
            });
            Observe.setunwrite(obj, "shift", function () {
                ths.fn && ths.fn();
                return Array.prototype.shift.apply(this, Array.prototype.slice.call(arguments));
            });
            Observe.setunwrite(obj, "unshift", function (obj) {
                ths.fn && ths.fn();
                return Array.prototype.unshift.apply(this, Array.prototype.slice.call(arguments));
            });
        } else if (is.isObject(obj)) {
            let keys = Object.keys(obj);
            for (let q = 0; q < keys.length; q++) {
                Observe.setwrite.call(ths, obj, keys[q], obj[keys[q]])
            }
        }
        return obj;
    };
}

export default Observe;