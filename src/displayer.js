let math = {
    pi: Math.PI,
    angle(num) {
        return Math.PI * (num / 180);
    },
    rotatePoint(rotatepoint, rotate, x, y) {
        let _pp = math.angle(rotate);
        if (rotatepoint.y !== 0) {
            let R = Math.sqrt((rotatepoint.x - x) * (rotatepoint.x - x) + (rotatepoint.y - y) * (rotatepoint.y - y));
            let offset = math.pi - Math.atan((rotatepoint.y - y) / (rotatepoint.x - x)) - _pp;
            return {
                x: rotatepoint.x + R * Math.cos(offset),
                y: rotatepoint.y - R * Math.sin(offset)
            };
        } else {
            return {
                x: x,
                y: 0
            };
        }
    },
    reletivePoint(sprite, x, y) {
        let _pp = math.angle(sprite._rotate);
        let cos = Math.cos(_pp), sin = Math.sin(_pp);
        let ox = (x - sprite._x), oy = (y - sprite._y);
        return {
            x: ox * cos + oy * sin,
            y: oy * cos - ox * sin
        };
    }
};
let sceneDefault = {
    rootsprite: null,
    offsetx: 0,
    offsety: 0,
    point: {
        x: 0,
        y: 0
    }
};
let dataURItoBlob = function (dataURL) {
    let BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = parts[1];
        return new Blob([raw], {type: contentType});
    }
    let parts = dataURL.split(BASE64_MARKER);
    let contentType = parts[0].split(':')[1];
    let byteString = atob(parts[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: contentType});
};

class event {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.sceneX = 0;
        this.sceneY = 0;
        this.target = null;
        this.currentTarget = null;
        this.eventType = null;
        this._isstop = false;
    }

    stopPropagation() {
        this._isstop = true;
    }

    getSpriteLocal(sprite) {
        let a = [], b = sprite.parent();
        while (b) {
            a.push(b);
            b = b.parent();
        }
        let ths = this;
        let mx = {
            x: ths.sceneX,
            y: ths.sceneY
        };
        for (let i = a.length - 1; i >= 0; --i) {
            mx = math.reletivePoint(a[i], mx.x, mx.y);
        }
        return mx;
    }
}
class Sprite {
    constructor(option) {
        this._name = option.name ? option.name : "";
        this._x = option.x ? option.x : 0;
        this._y = option.y ? option.y : 0;
        this._width = option.width ? option.width : 500;
        this._height = option.height ? option.height : 500;
        this._alpha = option.alpha ? option.alpha : 1;
        this._depth = 0;

        this._background = {
            color: "none",
            image: null,
            imageType: "fit"//repeat center fit fill
        };
        this._border = {
            width: 0,
            color: "none"
        };
        this._shadow = {
            color: "none",
            offsetX: 0,
            offsetY: 0,
            blur: 20
        };
        if (option.background) {
            this._background.color = option.background.color ? option.background.color : "none";
            this._background.image = option.background.image ? option.background.image : null;
            this._background.imageType = option.background.imageType ? option.background.imageType : "fit";
        }
        if (option.border) {
            this._border.width = option.border.width ? option.border.width : 0;
            this._border.color = option.border.color ? option.border.color : "none";
        }
        if (option.shadow) {
            this._shadow.color = option.shadow.color ? option.shadow.color : "none";
            this._shadow.offsetX = option.shadow.offsetX ? option.shadow.offsetX : 0;
            this._shadow.offsetY = option.shadow.offsetY ? option.shadow.offsetY : 0;
            this._shadow.blur = option.shadow.blur ? option.shadow.blur : 20;
        }
        this._rotate = 0;
        this._rotatepoint = {
            x: 0,
            y: 0,
            offsetx: 0,
            offsety: 0
        };
        this._root = null;
        this._children = [];
        this._parent = null;

        this.mousedown = option.mousedown ? option.mousedown : null;
        this.mousemove = option.mousemove ? option.mousemove : null;
        this.mouseup = option.mouseup ? option.mouseup : null;
        this.click = option.click ? option.click : null;

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this._local = null;
        this.ops = {};
        this._framework = {
            rotatex: this._x,
            rotatey: this._y
        };
        if (typeof this._background.image === "string") {
            let url = this._background.image;
            this._background.image = null;
            let _b = document.createElement("img");
            _b.src = url;
            _b.addEventListener("load", (e) => {
                this._background.image = e.target;
                this._root.draw();
            }, false);
        }
    }

    static drawImage(sprite) {
        let image = sprite._background.image;
        let type = sprite._background.imageType ? sprite._background.imageType : "fit";
        if (image) {
            if (type === "fit") {
                let _w = 0, _h, _x = 0, _y = 0;
                if (image.width > sprite._width) {
                    _w = sprite._width;
                    _h = (image.height / image.width) * _w;
                    if (_h > sprite._height) {
                        _h = sprite._height;
                        _w = (image.width / image.height) * _h;
                    }
                } else {
                    _h = sprite._height;
                    _w = (image.width / image.height) * _h;
                    if (_w > sprite._width) {
                        _w = sprite._width;
                        _h = (image.height / image.width) * _w;
                    }
                }
                _x = (sprite._width - _w) / 2;
                _y = (sprite._height - _h) / 2;
                sprite.ctx.drawImage(image, _x, _y, _w, _h);
            } else if (type === "repeat") {
                let _w = sprite._width, _h = sprite._height, _x = 0, _y = 0;
                while (true) {
                    sprite.ctx.drawImage(image, _x, _y, image.width, image.height);
                    _x += image.width;
                    if (_x > _w) {
                        _y += image.height;
                        if (_y < _h) {
                            _x = 0;
                        } else {
                            break;
                        }
                    }
                }
            } else if (type === "fill") {
                sprite.ctx.drawImage(image, 0, 0, sprite._width, sprite._height);
            } else if (type === "center") {
                let _w = image.width, _h = image.height, _x = 0, _y = 0;
                _x = (sprite._width - _w) / 2;
                _y = (sprite._height - _h) / 2;
                sprite.ctx.drawImage(image, _x, _y, _w, _h);
            }
        }
        return this;
    }

    clean() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        return this;
    }

    draw() {
        this.clean();
        this.canvas.width = this._width;
        this.canvas.height = this._height;

        this.ctx.globalAlpha = this._alpha;
        if (this._background.color !== "none") {
            this.ctx.save();
            this.ctx.fillStyle = this._background.color;
            this.ctx.fillRect(0, 0, this._width, this._height);

            this.ctx.restore();
        }
        Sprite.drawImage(this);

        for (let i = 0; i < this._children.length; i++) {
            let _c = this._children[i];
            _c.draw();
            this.ctx.save();

            this.ctx.translate(_c._x, _c._y);
            this.ctx.rotate(_c._rotate / 180 * Math.PI);

            if (_c._shadow.color !== "none") {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0,0,0,0)';
                this.ctx.fillRect(0, 0, _c._width, _c._height);
                this.ctx.shadowColor = _c._shadow.color;
                this.ctx.shadowBlur = _c._shadow.blur;
                this.ctx.shadowOffsetX = _c._shadow.offsetX;
                this.ctx.shadowOffsetY = _c._shadow.offsetY;
                this.ctx.drawImage(_c.ctx.canvas, 0, 0, _c._width, _c._height);
                this.ctx.restore();
            } else {
                this.ctx.drawImage(_c.ctx.canvas, 0, 0, _c._width, _c._height);
            }

            if (_c._border.color !== "none") {
                this.ctx.lineWidth = _c._border.width;
                this.ctx.strokeStyle = _c._border.color;
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(0, _c._height);
                this.ctx.lineTo(_c._width, _c._height);
                this.ctx.lineTo(_c._width, 0);
                this.ctx.closePath();
                this.ctx.stroke();
            }

            this.ctx.restore();
        }
        return this;
    }

    background(a) {
        if (arguments.length === 1) {
            this._background = a;
            return this;
        } else {
            return this._background;
        }
    }

    backgroundColor(a) {
        if (arguments.length === 1) {
            this._background.color = a;
            return this;
        } else {
            return this._background.color;
        }
    }

    backgroundImage(a) {
        if (arguments.length === 1) {
            this._background.image = a;
            return this;
        } else {
            return this._background.image;
        }
    }

    backgroundImageType(a) {
        if (arguments.length === 1) {
            this._background.imageType = a;
            return this;
        } else {
            return this._background.imageType;
        }
    }

    border(a) {
        if (arguments.length === 1) {
            this._border = a;
            return this;
        } else {
            return this._border;
        }
    }

    borderWidth(a) {
        if (arguments.length === 1) {
            this._border.width = a;
            return this;
        } else {
            return this._border.width;
        }
    }

    borderColor(a) {
        if (arguments.length === 1) {
            this._border.color = a;
            return this;
        } else {
            return this._border.color;
        }
    }

    shadow(a) {
        if (arguments.length === 1) {
            this._shadow = a;
            return this;
        } else {
            return this._shadow;
        }
    }

    shadowColor(a) {
        if (arguments.length === 1) {
            this._shadow.color = a;
            return this;
        } else {
            return this._shadow.color;
        }
    }

    shadowOffsetX(a) {
        if (arguments.length === 1) {
            this._shadow.offsetX = a;
            return this;
        } else {
            return this._shadow.offsetX;
        }
    }

    shadowOffsetY(a) {
        if (arguments.length === 1) {
            this._shadow.offsetY = a;
            return this;
        } else {
            return this._shadow.offsetY;
        }
    }

    shadowBlur(a) {
        if (arguments.length === 1) {
            this._shadow.blur = a;
            return this;
        } else {
            return this._shadow.blur;
        }
    }

    name(a) {
        if (arguments.length === 1) {
            this._name = a;
            return this;
        } else {
            return this._name;
        }
    }

    x(a) {
        if (arguments.length === 1) {
            this._framework.rotatex = this._x;
            this._x = a;
            return this;
        } else {
            return this._x;
        }
    }

    y(a) {
        if (arguments.length === 1) {
            this._framework.rotatey = this._y;
            this._y = a;
            return this;
        } else {
            return this._y;
        }
    }

    width(a) {
        if (arguments.length === 1) {
            let nw = (this._rotatepoint.offsetx / this._width) * a;
            this._x -= nw - this._rotatepoint.offsetx;
            this._framework.rotatex = this._x;
            this._rotatepoint.offsetx = this._rotatepoint.x - this._x;
            this._width = a;
            this.canvas.width = this._width;
            return this;
        } else {
            return this._width;
        }
    }

    height(a) {
        if (arguments.length === 1) {
            let nh = (this._rotatepoint.offsety / this._height) * a;
            this._y -= nh - this._rotatepoint.offsety;
            this._framework.rotatey = this._y;
            this._rotatepoint.offsety = this._rotatepoint.y - this._y;
            this._height = a;
            this.canvas.height = this._height;
            return this;
        } else {
            return this._height;
        }
    }

    alpha(a) {
        if (arguments.length === 1) {
            this._alpha = a;
            return this;
        } else {
            return this._alpha;
        }
    }

    root() {
        return this._root;
    }

    parent() {
        return this._parent;
    }

    children(a) {
        if (arguments.length === 1) {
            let _a = null;
            if (typeof a === "string") {
                for (let i = 0; i < this._children.length; i++) {
                    if (this._children[i]._name === a) {
                        _a = this._children[i];
                        break;
                    }
                }
            } else {
                if (a >= 0 && a < this._children.length) {
                    _a = this._children[a];
                }
            }
            return _a;
        } else {
            return this._children;
        }
    }

    topDepth() {
        let _a = this._parent._children;
        if (_a.length > 0 && this._depth <= _a.length) {
            let _ac = _a[_a.length - 1];
            this._parent._children[_a.length - 1] = this;
            this._parent._children[this._depth - 1] = _ac;
            this._depth = this._parent._children.length;
        }
        return this;
    }

    appendChild(sprite) {
        sprite._root = sceneDefault.rootsprite;
        sprite._parent = this;
        this._children.push(sprite);
        sprite._depth = this._children.length;
        return this;
    }

    rotate(rotate) {
        if (arguments.length === 1) {
            this._rotate = rotate;
            let _a = math.rotatePoint(this._rotatepoint, this._rotate, this._framework.rotatex, this._framework.rotatey);
            this._x = _a.x;
            this._y = _a.y;
            return this;
        } else {
            return this._rotate;
        }
    }

    rotatePoint(x, y) {
        if (arguments.length === 2) {
            this._rotatepoint.x = x;
            this._rotatepoint.y = y;
            this._rotatepoint.offsetx = x - this._x;
            this._rotatepoint.offsety = y - this._y;
            return this;
        } else {
            return this._rotatepoint;
        }
    }

    _cast(type, e) {
        this._local = e;
        let _a = this._children;
        let ishas = false;
        for (let i = _a.length - 1; i >= 0; --i) {
            if (Scene.checkPointIn(_a[i], e.x, e.y)) {
                let _cc = math.reletivePoint(_a[i], e.x, e.y);
                _a[i]._cast.call(_a[i], type, _cc);
                ishas = true;
                break;
            }
        }
        if (!ishas) {
            let ev = new event();
            ev.target = this;
            ev.sceneX = sceneDefault.point.x;
            ev.sceneY = sceneDefault.point.y;
            let _mc = this;
            while (_mc) {
                if (_mc[type]) {
                    ev.x = _mc._parent ? _mc._parent._local.x : _mc._local.x;
                    ev.y = _mc._parent ? _mc._parent._local.y : _mc._local.y;
                    ev.currentTarget = _mc;
                    _mc[type].call(_mc, ev);
                }
                if (ev._isstop) {
                    _mc = null;
                } else {
                    _mc = _mc._parent;
                }
            }
        }
    }

    getImageDate(x, y, width, height) {
        let xis = x || 0, yis = y || 0, widthis = width || this._width, heightis = height || this._height;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = widthis;
        canvas.height = heightis;
        ctx.drawImage(this.ctx.canvas, xis, yis, widthis, heightis, 0, 0, widthis, heightis);
        return canvas.toDataURL("image/png", 1);
    }

    getImageBlob(x, y, width, height) {
        return dataURItoBlob(this.getImageDate(x, y, width, height));
    }

    checkPointIn(x, y) {
        return (x >= this._x && x <= this._x + this._width && y >= this._y && y <= this._y + this._height);
    }
}
class Scene {
    constructor(option) {
        let ops = {
            dom: document.body,
            background: {
                color: "#3C3830"
            }
        };
        Object.assign(ops, option);
        let domInfo = ops.dom.getBoundingClientRect();
        sceneDefault.offsetx = parseInt(domInfo.left);
        sceneDefault.offsety = parseInt(domInfo.top);
        let a = new Sprite({
            name: "root",
            width: domInfo.width,
            height: domInfo.height,
            background: ops.background
        });
        a._root = a;
        a._parent = null;
        a._local = sceneDefault.point;
        a.canvas.style.cssText = `-webkit-user-select:none;-webkit-touch-callout:none;-webkit-user-drag:none;-webkit-tap-highlight-color:rgba(0,0,0,0)`;
        ops.dom.appendChild(a.canvas);
        a.mousedown = ops.mousedown ? ops.mousedown : null;
        a.mousemove = ops.mousemove ? ops.mousemove : null;
        a.mouseup = ops.mouseup ? ops.mouseup : null;
        a.click = ops.click ? ops.click : null;
        a.canvas.addEventListener("click", (e) => {
            this._cast("click", e);
        });
        a.canvas.addEventListener("mousedown", (e) => {
            let info = ops.dom.getBoundingClientRect();
            sceneDefault.offsetx = parseInt(info.left);
            sceneDefault.offsety = parseInt(info.top);
            this._cast("mousedown", e);
        });
        a.canvas.addEventListener("mousemove", (e) => {
            this._cast("mousemove", e);
        });
        a.canvas.addEventListener("mouseup", (e) => {
            this._cast("mouseup", e);
        });
        a.draw();
        this.sprite = a;
        sceneDefault.rootsprite = a;
        return a;
    }

    static checkPointIn(sprite, x, y) {
        let _xc = math.reletivePoint(sprite, x, y);
        x = _xc.x;
        y = _xc.y;
        return (x > 0 && x < sprite._width && y > 0 && y < sprite._height);
    }

    _cast(type, e) {
        e.preventDefault();
        e.stopPropagation();
        let _a = this.sprite._children;
        sceneDefault.point.x = e.pageX - sceneDefault.offsetx;
        sceneDefault.point.y = e.pageY - sceneDefault.offsety;
        for (let i = _a.length - 1; i >= 0; --i) {
            if (Scene.checkPointIn(_a[i], sceneDefault.point.x, sceneDefault.point.y)) {
                let _cc = math.reletivePoint(_a[i], sceneDefault.point.x, sceneDefault.point.y);
                _a[i]._cast.call(_a[i], type, _cc);
                break;
            }
        }
    }
}
export  {Sprite, Scene};