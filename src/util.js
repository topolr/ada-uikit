const util = {
    uuid: function () {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
            uuid = new Array(36), rnd = 0, r;
        for (var i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '';
            } else if (i === 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02)
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    },
    randomid: function (len) {
        if (arguments.length === 0 || len <= 2) {
            len = 7;
        }
        return Math.random().toString(36).slice(2, len + 2);
    },
    getDatasetName: function (a) {
        var n = "";
        for (var i = 0; i < a.length; i++) {
            if (/^[A-Z]+$/.test(a.charAt(i))) {
                n += "-" + a.charAt(i).toLowerCase();
            } else {
                n += a.charAt(i);
            }
        }
        return "data-" + n;
    },
    getDatasetReserve: function (a) {
        return a.substring(4).replace(/-[a-zA-Z]{1}/g, function (a) {
            return a[1].toUpperCase();
        });
    },
    escape: function (str) {
        return ('' + str).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '\'').replace(/\//g, '/');
    },
    hashCode: function (str) {
        var hash = 0;
        if (str.length === 0) return hash;
        for (var i = 0, len = str.length; i < len; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return hash;
    },
    setReadOnlyProps: function (objn, obj) {
        for (var i in obj) {
            Object.defineProperty(objn, i, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: obj[i]
            });
        }
        return objn;
    }
};

export default util;