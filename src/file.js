class File {
    constructor(filex, type) {
        let _file = filex;
        this._uri = "";
        if (typeof filex === "string") {
            if (type) {
                _file = new Blob([filex], { type: type });
            } else {
                this._url = filex;
                _file = File.getBlobFromURI(filex);
            }
        } else if (Array.isArray(filex)) {
            _file = new Blob(filex, { type: (type || "text/plain") });
        }
        this.file = _file;
    }

    static getBlobFromURI(dataURL) {
        let BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) === -1) {
            let parts = dataURL.split(',');
            let contentType = parts[0].split(':')[1];
            let raw = parts[1];
            return new Blob([raw], { type: contentType });
        }
        let parts = dataURL.split(BASE64_MARKER);
        let contentType = parts[0].split(':')[1];
        let byteString = atob(parts[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: contentType });
    }

    static saveAs(blob, filename) {
        let type = blob.type;
        let force_saveable_type = 'application/octet-stream';
        if (type && type !== force_saveable_type) {
            let slice = blob.slice || blob.webkitSlice || blob.mozSlice;
            blob = slice.call(blob, 0, blob.size, force_saveable_type);
        }
        let url = URL.createObjectURL(blob);
        let event = document.createEvent("MouseEvent");
        event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        let t = document.createElement("a");
        t.href = url;
        t.download = filename;
        t.dispatchEvent(event);
    }

    get file() {
        return this.file;
    }

    get name() {
        return this.file ? this.file.name : "";
    }

    get size(type, size) {
        let a = this.file.size;
        if (type === "MB") {
            a = this.file.size / (1024 * 1024);
        } else if (type === "KB") {
            a = this.file.size / 1024;
        } else if (type === "GB") {
            a = this.file.size / (1024 * 1024 * 1024);
        }
        if (arguments.length === 2) {
            a = a.toFixed(size) / 1;
        }
        return a;
    }

    get type() {
        return this.file ? this.file.type : "";
    }

    get uri() {
        let ps = $.promise();
        if (this._uri) {
            ps.resolve(this._uri);
        } else {
            let reader = new FileReader();
            reader.onload = function (e) {
                ps.resolve(e.target.result);
            };
            reader.readAsDataURL(this.file);
        }
        return ps;
    }

    get url() {
        return window.URL.createObjectURL(this.file);
    }

    get suffix() {
        if (this.getFileName()) {
            let name = this.getFileName().split(".");
            if (name.length > 1) {
                return name[name.length - 1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    isSame(file) {
        let t = file;
        if (file.file) {
            t = file.getFile();
        }
        return this.file.lastModified === t.lastModified && this.file.size === t.size && this.file.type === t.type && this.file.name === t.name;
    }

    isSuffixWith(suffix) {
        return suffix === this.getSuffix();
    }

    isTypeOf(type) {
        let typet = this.getFileType();
        return typet === type;
    }

    getFileSizeAuto(radmon) {
        let v = 0, unit = "BYTE", byteSize = this.file.size;
        radmon = radmon || 0;
        if (byteSize >= 1073741824) {
            v = (byteSize / 1073741824).toFixed(radmon);
            unit = "GB";
        } else if (byteSize >= 1048576) {
            v = (byteSize / 1048576).toFixed(radmon);
            unit = "MB";
        } else if (byteSize >= 1024) {
            v = (byteSize / 1024).toFixed(radmon);
            unit = "KB";
        } else {
            v = byteSize;
            unit = "B";
        }
        return v + unit;
    }

    getImageElement() {
        return new Promise((resolve, reject) => {
            if (this.file.type.indexOf("image") !== -1) {
                let image = document.createElement("img");
                image.addEventListener("load", function () {
                    resolve(image);
                });
                image.addEventListener("error", function (e) {
                    reject(e);
                });
                image.src = this.getFileURL();
            } else {
                reject();
            }
        });
    }

    compressImage(quality) {
        let ps = $.promise(), ths = this;
        this.createImageElement().then(function (a) {
            let cvs = document.createElement('canvas');
            cvs.width = a.width;
            cvs.height = a.height;
            cvs.getContext("2d").drawImage(a, 0, 0);
            ps.resolve(new File(cvs.toDataURL(ths.file.type, quality / 100)));
        }, function () {
            ps.reject();
        });
        return ps;
    }

    getImageCanvas(width, height) {
        return new Promise((resolve, reject) => {
            if (this.file.type.indexOf("image") !== -1) {
                let image = document.createElement("img");
                let a = this.getFileURL();
                image.addEventListener("load", function () {
                    try {
                        let _width = image.width, _height = image.height;
                        let _w = 0, _h = 0;
                        if (_width > width) {
                            _w = width;
                            _h = _height / _width * width;
                            if (_h > height) {
                                _h = height;
                                _w = _width / _height * height;
                            }
                        } else if (_height > height) {
                            _h = height;
                            _w = _width / _height * height;
                            if (_w > width) {
                                _w = width;
                                _h = _height / _width * width;
                            }
                        } else {
                            _w = image.width;
                            _h = image.height;
                        }
                        let _x = (width - _w) / 2, _y = (height - _h) / 2;
                        let source = image;
                        if (image.width > 8000 || image.height > 8000) {
                            let cvs = document.createElement('canvas');
                            cvs.width = image.width;
                            cvs.height = image.height;
                            let ctx = cvs.getContext("2d");
                            ctx.mozImageSmoothingEnabled = false;
                            ctx.webkitImageSmoothingEnabled = false;
                            ctx.msImageSmoothingEnabled = false;
                            ctx.imageSmoothingEnabled = false;
                            ctx.mozImageSmoothingQuality = "low";
                            ctx.webkitImageSmoothingQuality = "low";
                            ctx.msImageSmoothingQuality = "low";
                            ctx.imageSmoothingQuality = "low";
                            ctx.drawImage(image, 0, 0);
                            source = cvs;
                        }
                        let cvs2 = document.createElement('canvas');
                        cvs2.width = width;
                        cvs2.height = height;
                        let ctx = cvs2.getContext("2d");
                        ctx.mozImageSmoothingEnabled = false;
                        ctx.webkitImageSmoothingEnabled = false;
                        ctx.msImageSmoothingEnabled = false;
                        ctx.imageSmoothingEnabled = false;
                        ctx.mozImageSmoothingQuality = "low";
                        ctx.webkitImageSmoothingQuality = "low";
                        ctx.msImageSmoothingQuality = "low";
                        ctx.imageSmoothingQuality = "low";
                        ctx.drawImage(source, 0, 0, image.width, image.height, _x, _y, _w, _h);
                        resolve({
                            uri: a,
                            element: cvs2
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
                image.addEventListener("error", function (e) {
                    reject(e);
                });
                image.src = a;
            } else {
                reject();
            }
        });
    }

    saveAs(filename) {
        File.saveAs(this.file, filename);
    }
}

export default File;