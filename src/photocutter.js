import {view, View, binder} from "adajs";
import {Sprite, Scene} from "./displayer";
import File from "./file";
import refreshCw from "./icons/refresh-cw.icon";
import rotateCcw from "./icons/rotate-ccw.icon";
import rotateCw from "./icons/rotate-cw.icon";
import zoomIn from "./icons/zoom-in.icon";
import zoomOut from "./icons/zoom-out.icon";
import folder from "./icons/folder.icon";

class Cutter {
    constructor(ops) {
        let scene = new Scene({
            dom: ops.dom,
            background: {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAPElEQVR42mL8zwABZ6G0MQE+EwOJYFQDMYCF2PA3Hg1WWmpgHM0Po/lhVMNofhjND6MasAAAAAAA//8DAHstFMgoxduqAAAAAElFTkSuQmCC",
                imageType: "repeat"
            },
            mousedown: function (e) {
                e = e.getSpriteLocal(chone);
                if (chone.checkPointIn(e.x, e.y)) {
                    ops.dom.style.cursor = "move";
                    this.ops.ismove = true;
                    this.ops.ox = e.x - chone.x();
                    this.ops.oy = e.y - chone.y();
                }
            },
            mouseup: function () {
                ops.dom.style.cursor = "default";
                this.ops.ismove = false;
            },
            mousemove: function (e) {
                e = e.getSpriteLocal(chone);
                if (this.ops.ismove === true) {
                    let _x = e.x - this.ops.ox;
                    let _y = e.y - this.ops.oy;
                    if (_x > chtwo.x()) {
                        _x = chtwo.x();
                    } else if (_x < chtwo.x() - chone.width() + chtwo.width()) {
                        _x = chtwo.x() - chone.width() + chtwo.width();
                    }
                    if (_y > chtwo.y()) {
                        _y = chtwo.y();
                    } else if (_y < chtwo.y() - chone.height() + chtwo.height()) {
                        _y = chtwo.y() - chone.height() + chtwo.height();
                    }
                    chone.x(_x);
                    chone.y(_y);
                    scene.draw();
                }
            }
        });
        let ksprite = new Sprite({
            name: "ksprite",
            x: 0,
            y: 0,
            width: ops.sceneWidth,
            height: ops.sceneHeight
        });
        let _ch = Math.sqrt(ops.sceneWidth * ops.sceneWidth + ops.sceneHeight * ops.sceneHeight);
        let rsprite = new Sprite({
            name: "rsprite",
            x: (ops.sceneWidth - _ch) / 2,
            y: (ops.sceneHeight - _ch) / 2,
            width: _ch,
            height: _ch
        }).rotatePoint(ops.sceneWidth / 2, ops.sceneHeight / 2);
        let chone = new Sprite({
            name: "chone",
            width: ops.sceneWidth,
            height: ops.sceneHeight,
            x: (rsprite.width() - ops.sceneWidth) / 2,
            y: (rsprite.height() - ops.sceneHeight) / 2,
            background: {
                color: "rgba(102,102,102,0)"
            }
        }).rotatePoint(rsprite.width() / 2, rsprite.height() / 2);
        let chtwo = new Sprite({
            name: "chtwo",
            width: ops.picWidth,
            height: ops.picHeight,
            x: (rsprite.width() - ops.picWidth) / 2,
            y: (rsprite.height() - ops.picHeight) / 2,
            background: {
                color: "rgba(66,54,48,0)"
            }
        });
        let mask = new Sprite({
            name: "chtwo",
            width: ops.picWidth,
            height: ops.picHeight,
            x: (ops.sceneWidth - ops.picWidth) / 2,
            y: (ops.sceneHeight - ops.picHeight) / 2,
            border: {
                width: 2,
                color: "white"
            },
            background: {
                color: "rgba(255,255,255,0)"
            },
            shadow: {
                color: "#030303",
                offsetX: 3,
                offsetY: 3,
                blur: 10
            }
        });
        let left = new Sprite({
            x: 0,
            y: 0,
            width: (ops.sceneWidth - ops.picWidth) / 2,
            height: ops.sceneHeight,
            background: {
                color: "rgba(0,0,0,0.5)"
            }
        });
        let right = new Sprite({
            x: left.width() + ops.picWidth,
            y: 0,
            width: left.width(),
            height: left.height(),
            background: {
                color: "rgba(0,0,0,0.5)"
            }
        });
        let top = new Sprite({
            x: left.width(),
            y: 0,
            width: ops.picWidth,
            height: (ops.sceneHeight - ops.picHeight) / 2,
            background: {
                color: "rgba(0,0,0,0.5)"
            }
        });
        let bottom = new Sprite({
            x: left.width(),
            y: top.height() + ops.picHeight,
            width: top.width(),
            height: top.height(),
            background: {
                color: "rgba(0,0,0,0.5)"
            }
        });
        let bg = new Sprite({
            x: 0,
            y: 0,
            width: ops.sceneWidth,
            height: ops.sceneHeight
        });
        bg.appendChild(left).appendChild(top).appendChild(right).appendChild(bottom).appendChild(mask);
        rsprite.appendChild(chtwo).appendChild(chone);
        ksprite.appendChild(rsprite);
        scene.appendChild(ksprite).appendChild(bg).draw();

        this.scene = scene;
        this.mask = mask;
        this.ksprite = ksprite;
        this.rsprite = rsprite;
        this.chone = chone;
        this.chtwo = chtwo;
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.bg = bg;
        this.ops = ops;
    }

    setPicArea(width, height) {
        let ops = this.ops, left = this.left, right = this.right, top = this.top, bottom = this.bottom;
        let mask = this.mask, chtwo = this.chtwo, scene = this.scene, rsprite = this.rsprite
        if (width < ops.sceneWidth && height < ops.sceneHeight) {
            this.reset();
            ops.picWidth = width;
            ops.picHeight = height;
            left.x();
            left.y();
            left.width((ops.sceneWidth - ops.picWidth) / 2);
            left.height();
            right.x(left.width() + ops.picWidth);
            right.y();
            right.width(left.width());
            right.height();
            top.x(left.width());
            top.y();
            top.width(ops.picWidth);
            top.height((ops.sceneHeight - ops.picHeight) / 2);
            bottom.x(left.width());
            bottom.y(top.height() + ops.picHeight);
            bottom.width(top.width());
            bottom.height(top.height());
            mask.width(ops.picWidth);
            mask.height(ops.picHeight);
            mask.x((ops.sceneWidth - ops.picWidth) / 2);
            mask.y((ops.sceneHeight - ops.picHeight) / 2);
            chtwo.width(ops.picWidth);
            chtwo.height(ops.picHeight);
            chtwo.x((rsprite.width() - ops.picWidth) / 2);
            chtwo.y((rsprite.height() - ops.picHeight) / 2);
            scene.draw();
        }
    }

    rotate(num) {
        let rsprite = this.rsprite, scene = this.scene;
        rsprite.rotate(rsprite.rotate() + num);
        scene.draw();
    }

    rotateLeft() {
        this.rotate(-this.ops.rotateoffset);
    }

    rotateRight() {
        this.rotate(this.ops.rotateoffset);
    }

    zoom(num) {
        let chone = this.chone, chtwo = this.chtwo, scene = this.scene;
        let a = chone.width() + num; //chone.width()/chone.height()
        if (a >= chtwo.width()) {
            let b = (chone.height() / chone.width()) * a;
            chone.width(a);
            chone.height(b);
            let _x = chone.x();
            let _y = chone.y();
            if (_x > chtwo.x()) {
                _x = chtwo.x();
            } else if (_x < chtwo.x() - chone.width() + chtwo.width()) {
                _x = chtwo.x() - chone.width() + chtwo.width();
            }
            if (_y > chtwo.y()) {
                _y = chtwo.y();
            } else if (_y < chtwo.y() - chone.height() + chtwo.height()) {
                _y = chtwo.y() - chone.height() + chtwo.height();
            }
            chone.x(_x);
            chone.y(_y);
        }
        scene.draw();
    }

    zoomIn() {
        this.zoom(this.ops.zoomoffset);
    }

    zoomOut() {
        this.zoom(-this.ops.zoomoffset);
    }

    getImageData() {
        let ksprite = this.ksprite, mask = this.mask;
        return {
            uri: ksprite.getImageDate(mask.x(), mask.y(), mask.width(), mask.height()),
            blob: ksprite.getImageBlob(mask.x(), mask.y(), mask.width(), mask.height())
        };
    }

    getImageURI() {
        let ksprite = this.ksprite, mask = this.mask;
        return ksprite.getImageDate(mask.x(), mask.y(), mask.width(), mask.height());
    }

    getImageBlob() {
        let ksprite = this.ksprite, mask = this.mask;
        return ksprite.getImageBlob(mask.x(), mask.y(), mask.width(), mask.height());
    }

    setImage(image) {
        let _w = image.width, _h = image.height, _x = 0, _y = 0;
        let chtwo = this.chtwo, chone = this.chone, rsprite = this.rsprite, scene = this.scene;
        if (_w < chtwo.width()) {
            _w = chtwo.width();
            _h = (image.height / image.width) * _w;
        }
        if (_h < chtwo.height()) {
            _h = chtwo.height();
            _w = (image.width / image.height) * _h;
        }
        chone.ops.iw = _w;
        chone.ops.ih = _h;
        chone.width(_w);
        chone.height(_h);
        chone.x((rsprite.width() - chone.width()) / 2);
        chone.y((rsprite.height() - chone.height()) / 2);
        rsprite.rotate(0);
        chone.backgroundImage(image);
        scene.draw();
    }

    reset() {
        let chone = this.chone, rsprite = this.rsprite, scene = this.scene;
        chone.width(chone.ops.iw);
        chone.height(chone.ops.ih);
        chone.x((rsprite.width() - chone.width()) / 2);
        chone.y((rsprite.height() - chone.height()) / 2);
        rsprite.rotate(0);
        scene.draw();
    }
}

@view({
    className: "photocutter",
    template: "./template/photocutter.html",
    style: "./style/photocutter.scss"
})
class Photocutter extends View {
    oncreated() {
        this.state = Object.assign({
            none: true,
            refreshCw, rotateCw, rotateCcw, zoomIn, zoomOut, folder
        }, this.option);
        let ops = this.option;
        this.render().then(() => {
            let box = this.getDDM().finder("cutter").getElement();
            let boxInfo = box.getBoundingClientRect();
            ops.dom = box;
            ops.sceneHeight = boxInfo.height;
            ops.sceneWidth = boxInfo.width;
            ops.size = ops.size * 1024 * 1024;
            this.cutter = new Cutter(ops);
        });
    }

    defaultOption() {
        return {
            picWidth: 100,
            picHeight: 100,
            rotateoffset: 5,
            zoomoffset: 50,
            size: 5
        };
    }

    @binder("change")
    change({e}) {
        let files = e.target.files || e.dataTransfer.files;
        new File(files[0]).getImageElement().then(image => {
            this.cutter.setImage(image);
            this.state.none = false;
            this.render();
        });
    }

    @binder("rotateleft")
    rotateLeft() {
        this.cutter.rotateLeft();
    }

    @binder("rotateright")
    rotateRight() {
        this.cutter.rotateRight();
    }

    @binder("zoomin")
    zoomIn() {
        this.cutter.zoomIn();
    }

    @binder("zoomout")
    zoomOut() {
        this.cutter.zoomOut();
    }

    @binder("reset")
    reset() {
        this.cutter.reset();
    }

    @binder("upload")
    upload() {
        new File(this.cutter.getImageBlob()).uploadAsForm({
            url: "/movie/upload"
        });
    }

}

export default Photocutter;
