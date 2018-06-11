const map = {
    kenel: [{n: "webkit", g: /applewebkit\/([\d.]+)/}, {n: "gecko", g: /gecko\/([\d.]+)/}, {
        n: "trident",
        g: /trident\/([\d.]+)/
    }, {n: "edge", g: /edge\/([\d.]+)/}],
    info: [{n: "chrome", g: /chrome\/([\d.]+)/}, {n: "mozilla", g: /mozilla\/([\d.]+)/}, {
        n: "firefox",
        g: /firefox\/([\d.]+)/
    }, {n: "msie", g: /msie ([\d.]+)/}, {n: "opera", g: /opera\/([\d.]+)/}, {
        n: "safari",
        g: /safari\/([\d.]+)/
    }, {n: "blackberry", g: /blackberry ([\d.]+)/}, {n: "blackberry", g: /edge ([\d.]+)/}],
    os: [{n: "windows", g: /windows ([a-z\d. ]+)/}, {n: "osx", g: /mac os x ([a-z\d. ]+)/}, {
        n: "ios",
        g: /os ([a-z\d. _]+)/
    }, {n: "linux", g: /linux ([a-z\d. _]+)/}, {n: "linux", g: /linux/}, {
        n: "blackberry",
        g: /blackberry ([a-z\d. ]+)/
    }, {n: "blackberry", g: /bb[0-9]+/}, {n: "windowsphone", g: /windows phone/}],
    mobile: [{n: "android", g: /android ([\d.]+)/}, {n: "iphone", g: /iphone/}, {
        n: "ipad",
        g: /ipad/
    }, {n: "blackberry", g: /bb[0-9]+/}, {n: "blackberry", g: /blackberry/}, {n: "windowsphone", g: /iemobile/}]
};
let Browser = {
    init(){
        let ua = window.navigator.userAgent.toLowerCase();
        Reflect.ownKeys(map).forEach(type => {
            let has = false, typeValue = map[type];
            Reflect.ownKeys(typeValue).some(name => {
                let a = typeValue[name], b = ua.match(a.g);
                if (b) {
                    let v = b[0].match(/[0-9._]+/);
                    this[type] = {name: a.n, version: v ? v[0] : "unknow"};
                    has = true;
                    return has;
                }
            });
            if (!has) {
                this[type] = {name: "unknow", version: "unknow"};
            }
        });
        if (this.kenel && this.kenel.name === "trident" && this.kenel.version === "7.0") {
            this.info = {name: "msie", version: "11"};
        }
        if (this.isWebkit() && this.version() <= 29) {
            this.prefix = "-webkit-";
            this.transitionEnd = "webkitTransitionEnd";
        } else if (Browser.isGecko() === "gecko" && this.version() <= 16) {
            this.prefix = "-moz-";
            this.transitionEnd = "transitionend";
        } else {
            this.prefix = "";
            this.transitionEnd = "transitionend";
        }
    },
    name() {
        return this.info.name;
    },
    version() {
        return this.info.verison;
    },
    isMobile() {
        return this.mobile.name !== "unknow";
    },
    isAndroid(version) {
        if (!version) {
            return this.mobile.name === "android";
        } else {
            return this.mobile.name === "android" && parseInt(this.mobile.version) === parseInt(version);
        }
    },
    isIos(version) {
        if (!version) {
            return this.mobile.name === "iphone" || this.mobile.name === "ipad";
        } else {
            return (this.mobile.name === "iphone" || this.mobile.name === "ipad") && parseInt(this.mobile.version) === parseInt(version);
        }
    },
    isWebkit(version) {
        if (!version) {
            return this.kenel.name === "webkit";
        } else {
            return this.kenel.name === "webkit" && parseInt(this.kenel.version) === parseInt(version);
        }
    },
    isGecko(version) {
        if (!version) {
            return this.kenel.name === "gecko";
        } else {
            return this.kenel.name === "gecko" && parseInt(this.kenel.version) === parseInt(version);
        }
    },
    isTrident() {
        return this.kenel.name === "trident";
    },
    isEdge() {
        return this.kenel.name === "edge";
    },
    isMsie(version) {
        if (!version) {
            return this.info.name === "msie";
        } else {
            return this.info.name === "msie" && parseInt(this.info.version) === parseInt(version);
        }
    },
    getFixedStylePropName(name){
        if (this.prefix) {
            return this.prefix + name.split("-").map(key => {
                    return key[0].toUpperCase() + key.substring(1);
                }).join("");
        } else {
            let a = name.split("-");
            let b = a.shift();
            return b + a.map(key => {
                    return key[0].toUpperCase() + key.substring(1);
                }).join("");
        }
    }
};
Browser.init();

export default Browser;