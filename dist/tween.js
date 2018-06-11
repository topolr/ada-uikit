const tweenmapping = {
    "linner": function (t, b, c, d) {
        return c * t / d + b;
    },
    "ease-in-quad": function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    "ease-out-quad": function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    "ease-in-out-quad": function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    "ease-in-cubic": function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    "ease-out-cubic": function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    "ease-in-out-cubic": function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    "ease-in-quart": function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    "ease-out-quart": function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    "ease-in-out-quart": function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    "ease-in-quint": function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    "ease-out-quint": function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    "ease-in-out-quint": function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    "ease-in-sine": function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    "ease-out-sine": function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    "ease-in-out-sine": function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    "ease-in-expo": function (t, b, c, d) {
        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    "ease-out-expo": function (t, b, c, d) {
        return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    "ease-in-out-expo": function (t, b, c, d) {
        if (t === 0)
            return b;
        if (t === d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    "ease-in-circ": function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    "ease-out-circ": function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    "ease-in-out-circ": function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    "ease-in-elastic": function (t, b, c, d, a, p) {
        let s;
        if (t === 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (typeof p === "undefined")
            p = d * .3;
        if (!a || a < Math.abs(c)) {
            s = p / 4;
            a = c;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    "ease-out-elastic": function (t, b, c, d, a, p) {
        let s;
        if (t === 0)
            return b;
        if ((t /= d) === 1)
            return b + c;
        if (typeof p === "undefined")
            p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    "ease-in-out-elastic": function (t, b, c, d, a, p) {
        let s;
        if (t === 0)
            return b;
        if ((t /= d / 2) === 2)
            return b + c;
        if (typeof p === "undefined")
            p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    "ease-in-back": function (t, b, c, d, s) {
        if (typeof s === "undefined")
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    "ease-out-back": function (t, b, c, d, s) {
        if (typeof s === "undefined")
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    "ease-in-out-back": function (t, b, c, d, s) {
        if (typeof s === "undefined")
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    "ease-in-bounce": function (t, b, c, d) {
        return c - tweenmapping["ease-out-bounce"](d - t, 0, c, d) + b;
    },
    "ease-out-bounce": function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    "ease-in-out-bounce": function (t, b, c, d) {
        if (t < d / 2) {
            return tweenmapping["ease-in-bounce"](t * 2, 0, c, d) * .5 + b;
        } else {
            return tweenmapping["ease-out-bounce"](t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
};

class Tween {
    constructor({from = 0, to = 100, fn = "ease-out-quart", during = 1000, delay = 0, onrunning = null, onend = null}) {
        this.from = from;
        this.to = to;
        this.fn = tweenmapping[fn] || tweenmapping["ease-out-quart"];
        this.during = Math.round((during || 1000) / 16.7);
        this.onrunning = onrunning;
        this.onend = onend;
        this.delay = delay;
        this.isstop = true;
    }

    static _run() {
        let start = 0, during = this.during, offset = this.to - this.from;
        let run = () => {
            start++;
            this.onrunning && this.onrunning(this.fn(start, this.from, offset, during));
            if (start < during && !this.isstop) {
                requestAnimationFrame(run);
            } else {
                this.onend && this.onend();
                this.isstop = true;
            }
        };
        run();
    }

    static _runs() {
        let start = 0, during = this.during, offset = [];
        for (let i = 0; i < this.from.length; i++) {
            offset.push(this.to[i] || 0 - this.from[i]);
        }
        let run = () => {
            start++;
            let news = [];
            for (let i = 0; i < this.from.length; i++) {
                news.push(this.fn(start, this.from[i], offset[i], during));
            }
            this.onrunning && this.onrunning(news);
            if (start < during && !this.isstop) {
                requestAnimationFrame(run);
            } else {
                this.onend && this.onend();
                this.isstop = true;
            }
        };
        run();
    }

    static _runo() {
        let start = 0, during = this.during, offset = {};
        for (let i in this.from) {
            offset[i] = this.to[i] || 0 - this.from[i];
        }
        let run = function () {
            start++;
            let news = {};
            for (let i in this.from) {
                news[i] = this.fn(start, this.from[i], offset[i], during);
            }
            this.onrunning && this.onrunning(news);
            if (start < during && !this.isstop) {
                requestAnimationFrame(run);
            } else {
                this.onend && this.onend();
                this.isstop = true;
            }
        };
        run();
    }

    static isObject(obj) {
        return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length
    }

    start() {
        this.isstop = false;
        setTimeout(() => {
            if (Array.isArray(this.from)) {
                Tween._runs.call(this);
            } else if (Tween.isObject(this.from)) {
                Tween._runo.call(this);
            } else if (typeof this.from === "number") {
                Tween._run.call(this);
            }
        }, this.delay);
        return this;
    }

    stop() {
        this.isstop = true;
        return this;
    }

    isRunning() {
        return this.isstop === true;
    }

    clean() {
        for (let i in this) {
            this[i] = null;
        }
    }
}

export default Tween;