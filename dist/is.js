const is = {
    isFunction(obj) {
        return (typeof obj === 'function') && obj.constructor === window.Function;
    },
    isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    },
    isUndefined(obj) {
        return obj === undefined;
    },
    isWindow(obj) {
        return obj !== undefined && obj !== null && obj === obj.window;
    },
    isDocument(obj) {
        return obj !== null && obj.nodeType === obj.DOCUMENT_NODE;
    },
    isObject(obj) {
        return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    },
    isString(obj) {
        return (typeof obj === 'string') && obj.constructor === String;
    },
    isNumber(obj) {
        return typeof obj === "number";
    },
    isNumeric(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    isAvalid(obj) {
        return obj !== null && obj !== undefined;
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isElement(e) {
        return e && e.nodeType === 1 && e.nodeName;
    },
};

export default is;