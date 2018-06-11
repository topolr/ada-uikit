"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adajs = require("adajs");

var _refreshCw = babelHelpers.interopRequireDefault(require("loading/icons/refresh-cw.icon"));

var _dec, _class;

var LoadingService = (_dec = (0, _adajs.action)("set"), (_class =
/*#__PURE__*/
function (_Service) {
  babelHelpers.inherits(LoadingService, _Service);

  function LoadingService() {
    babelHelpers.classCallCheck(this, LoadingService);
    return babelHelpers.possibleConstructorReturn(this, (LoadingService.__proto__ || Object.getPrototypeOf(LoadingService)).apply(this, arguments));
  }

  babelHelpers.createClass(LoadingService, [{
    key: "defaultData",
    value: function defaultData() {
      return {
        icon: _refreshCw.default,
        circle: true,
        color: "black",
        content: "loading..."
      };
    }
  }, {
    key: "set",
    value: function set(current, info) {
      return _adajs.util.extend(current, info);
    }
  }]);
  return LoadingService;
}(_adajs.Service), (babelHelpers.applyDecoratedDescriptor(_class.prototype, "set", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype)), _class));
var _default = LoadingService;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmcvZGF0YXNldC5qcyJdLCJuYW1lcyI6WyJMb2FkaW5nU2VydmljZSIsImljb24iLCJyZWZyZXNoQ3ciLCJjaXJjbGUiLCJjb2xvciIsImNvbnRlbnQiLCJjdXJyZW50IiwiaW5mbyIsInV0aWwiLCJleHRlbmQiLCJTZXJ2aWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFTUEsYyxXQVVKLG1CQUFPLEtBQVAsQzs7Ozs7Ozs7Ozs7O2tDQVRhO0FBQ2IsYUFBTztBQUNOQyxjQUFNQyxrQkFEQTtBQUVOQyxnQkFBUSxJQUZGO0FBR05DLGVBQU8sT0FIRDtBQUlOQyxpQkFBUztBQUpILE9BQVA7QUFNQTs7O3dCQUdHQyxPLEVBQVNDLEksRUFBTTtBQUNsQixhQUFPQyxZQUFLQyxNQUFMLENBQVlILE9BQVosRUFBcUJDLElBQXJCLENBQVA7QUFDQTs7O0VBYjJCRyxjO2VBZ0JkVixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXJ2aWNlLCBhY3Rpb24sIHV0aWx9IGZyb20gXCJhZGFqc1wiO1xuaW1wb3J0IHJlZnJlc2hDdyBmcm9tIFwiLi9pY29ucy9yZWZyZXNoLWN3Lmljb25cIjtcblxuY2xhc3MgTG9hZGluZ1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblx0ZGVmYXVsdERhdGEoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGljb246IHJlZnJlc2hDdyxcblx0XHRcdGNpcmNsZTogdHJ1ZSxcblx0XHRcdGNvbG9yOiBcImJsYWNrXCIsXG5cdFx0XHRjb250ZW50OiBcImxvYWRpbmcuLi5cIlxuXHRcdH1cblx0fVxuXG5cdEBhY3Rpb24oXCJzZXRcIilcblx0c2V0KGN1cnJlbnQsIGluZm8pIHtcblx0XHRyZXR1cm4gdXRpbC5leHRlbmQoY3VycmVudCwgaW5mbyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGluZ1NlcnZpY2U7Il19