"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adajs = require("adajs");

var _refreshCw = babelHelpers.interopRequireDefault(require("loading/icons/refresh-cw.icon"));

var _checkCircle = babelHelpers.interopRequireDefault(require("loading/icons/check-circle.icon"));

var _minusCircle = babelHelpers.interopRequireDefault(require("loading/icons/minus-circle.icon"));

var _dataset = babelHelpers.interopRequireDefault(require("loading/dataset.js"));

require("style/base.scss");

var _dec, _class;

var Loading = (_dec = (0, _adajs.view)({  className: "loading",  template: "loading/template.html",  style: "loading/style.scss",  dataset: {    service: _dataset.default  },module:"loading/index.js"}), _dec(_class =
/*#__PURE__*/
function (_View) {
  babelHelpers.inherits(Loading, _View);

  function Loading() {
    babelHelpers.classCallCheck(this, Loading);
    return babelHelpers.possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  babelHelpers.createClass(Loading, [{
    key: "oncreated",
    value: function oncreated() {
      var _this = this;

      setTimeout(function () {
        if (!_this.isRemoved()) {
          _this.getElement().classList.add(_this.getThisClassName("in"));
        }
      }, 100);
    }
  }, {
    key: "showLoading",
    value: function showLoading(content) {
      this.getDataSet().commit("set", {
        icon: _refreshCw.default,
        circle: true,
        color: "black",
        content: content || "loading..."
      });
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(content) {
      this.getDataSet().commit("set", {
        icon: _checkCircle.default,
        circle: false,
        color: "green",
        content: content || "Success done"
      });
    }
  }, {
    key: "showError",
    value: function showError(content) {
      this.getDataSet().commit("set", {
        icon: _minusCircle.default,
        circle: false,
        color: "red",
        content: content || "Error occur"
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
      setTimeout(function () {
        if (!_this2.isRemoved()) {
          _this2.getElement().classList.remove(_this2.getThisClassName("in"));

          setTimeout(function () {
            _this2.getParent() && _this2.getParent().removeChild(_this2);
          }, 400);
        }
      }, delay);
    }
  }]);
  return Loading;
}(_adajs.View)) || _class);
var _default = Loading;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmcvaW5kZXguanMiXSwibmFtZXMiOlsiTG9hZGluZyIsImNsYXNzTmFtZSIsInRlbXBsYXRlIiwic3R5bGUiLCJkYXRhc2V0Iiwic2VydmljZSIsIkxvYWRpbmdTZXJ2aWNlIiwic2V0VGltZW91dCIsImlzUmVtb3ZlZCIsImdldEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRUaGlzQ2xhc3NOYW1lIiwiY29udGVudCIsImdldERhdGFTZXQiLCJjb21taXQiLCJpY29uIiwicmVmcmVzaEN3IiwiY2lyY2xlIiwiY29sb3IiLCJjaGVja0NpcmNsZSIsIm1pbnVzQ2lyY2xlIiwiZGVsYXkiLCJyZW1vdmUiLCJnZXRQYXJlbnQiLCJyZW1vdmVDaGlsZCIsIlZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztJQVdNQSxPLFdBVEwsaUJBQUs7QUFDTEMsYUFBVyxTQUROO0FBRUxDLFlBQVUsaUJBRkw7QUFHTEMsU0FBTyxjQUhGO0FBSUxDLFdBQVM7QUFDUkMsYUFBU0M7QUFERDtBQUpKLENBQUwsQzs7Ozs7Ozs7Ozs7O2dDQVVZO0FBQUE7O0FBQ1hDLGlCQUFXLFlBQU07QUFDaEIsWUFBSSxDQUFDLE1BQUtDLFNBQUwsRUFBTCxFQUF1QjtBQUN0QixnQkFBS0MsVUFBTCxHQUFrQkMsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLE1BQUtDLGdCQUFMLENBQXNCLElBQXRCLENBQWhDO0FBQ0E7QUFDRCxPQUpELEVBSUcsR0FKSDtBQUtBOzs7Z0NBRVdDLE8sRUFBUztBQUNwQixXQUFLQyxVQUFMLEdBQWtCQyxNQUFsQixDQUF5QixLQUF6QixFQUFnQztBQUMvQkMsY0FBTUMsa0JBRHlCO0FBRS9CQyxnQkFBUSxJQUZ1QjtBQUcvQkMsZUFBTyxPQUh3QjtBQUkvQk4saUJBQVNBLFdBQVc7QUFKVyxPQUFoQztBQU1BOzs7Z0NBRVdBLE8sRUFBUztBQUNwQixXQUFLQyxVQUFMLEdBQWtCQyxNQUFsQixDQUF5QixLQUF6QixFQUFnQztBQUMvQkMsY0FBTUksb0JBRHlCO0FBRS9CRixnQkFBUSxLQUZ1QjtBQUcvQkMsZUFBTyxPQUh3QjtBQUkvQk4saUJBQVNBLFdBQVc7QUFKVyxPQUFoQztBQU1BOzs7OEJBRVNBLE8sRUFBUztBQUNsQixXQUFLQyxVQUFMLEdBQWtCQyxNQUFsQixDQUF5QixLQUF6QixFQUFnQztBQUMvQkMsY0FBTUssb0JBRHlCO0FBRS9CSCxnQkFBUSxLQUZ1QjtBQUcvQkMsZUFBTyxLQUh3QjtBQUkvQk4saUJBQVNBLFdBQVc7QUFKVyxPQUFoQztBQU1BOzs7NEJBRW1CO0FBQUE7O0FBQUEsVUFBZFMsS0FBYyx1RUFBTixJQUFNO0FBQ25CZixpQkFBVyxZQUFNO0FBQ2hCLFlBQUksQ0FBQyxPQUFLQyxTQUFMLEVBQUwsRUFBdUI7QUFDdEIsaUJBQUtDLFVBQUwsR0FBa0JDLFNBQWxCLENBQTRCYSxNQUE1QixDQUFtQyxPQUFLWCxnQkFBTCxDQUFzQixJQUF0QixDQUFuQzs7QUFDQUwscUJBQVcsWUFBTTtBQUNoQixtQkFBS2lCLFNBQUwsTUFBb0IsT0FBS0EsU0FBTCxHQUFpQkMsV0FBakIsQ0FBNkIsTUFBN0IsQ0FBcEI7QUFDQSxXQUZELEVBRUcsR0FGSDtBQUdBO0FBQ0QsT0FQRCxFQU9HSCxLQVBIO0FBUUE7OztFQTdDb0JJLFc7ZUFnRFAxQixPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2aWV3LCBWaWV3fSBmcm9tIFwiYWRhanNcIjtcbmltcG9ydCByZWZyZXNoQ3cgZnJvbSBcIi4vaWNvbnMvcmVmcmVzaC1jdy5pY29uXCI7XG5pbXBvcnQgY2hlY2tDaXJjbGUgZnJvbSBcIi4vaWNvbnMvY2hlY2stY2lyY2xlLmljb25cIjtcbmltcG9ydCBtaW51c0NpcmNsZSBmcm9tIFwiLi9pY29ucy9taW51cy1jaXJjbGUuaWNvblwiO1xuaW1wb3J0IExvYWRpbmdTZXJ2aWNlIGZyb20gXCIuL2RhdGFzZXRcIjtcbmltcG9ydCBcIi4uL3N0eWxlL2Jhc2Uuc2Nzc1wiO1xuXG5Admlldyh7XG5cdGNsYXNzTmFtZTogXCJsb2FkaW5nXCIsXG5cdHRlbXBsYXRlOiBcIi4vdGVtcGxhdGUuaHRtbFwiLFxuXHRzdHlsZTogXCIuL3N0eWxlLnNjc3NcIixcblx0ZGF0YXNldDoge1xuXHRcdHNlcnZpY2U6IExvYWRpbmdTZXJ2aWNlXG5cdH1cbn0pXG5cbmNsYXNzIExvYWRpbmcgZXh0ZW5kcyBWaWV3IHtcblx0b25jcmVhdGVkKCkge1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLmlzUmVtb3ZlZCgpKSB7XG5cdFx0XHRcdHRoaXMuZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRUaGlzQ2xhc3NOYW1lKFwiaW5cIikpO1xuXHRcdFx0fVxuXHRcdH0sIDEwMCk7XG5cdH1cblxuXHRzaG93TG9hZGluZyhjb250ZW50KSB7XG5cdFx0dGhpcy5nZXREYXRhU2V0KCkuY29tbWl0KFwic2V0XCIsIHtcblx0XHRcdGljb246IHJlZnJlc2hDdyxcblx0XHRcdGNpcmNsZTogdHJ1ZSxcblx0XHRcdGNvbG9yOiBcImJsYWNrXCIsXG5cdFx0XHRjb250ZW50OiBjb250ZW50IHx8IFwibG9hZGluZy4uLlwiXG5cdFx0fSk7XG5cdH1cblxuXHRzaG93U3VjY2Vzcyhjb250ZW50KSB7XG5cdFx0dGhpcy5nZXREYXRhU2V0KCkuY29tbWl0KFwic2V0XCIsIHtcblx0XHRcdGljb246IGNoZWNrQ2lyY2xlLFxuXHRcdFx0Y2lyY2xlOiBmYWxzZSxcblx0XHRcdGNvbG9yOiBcImdyZWVuXCIsXG5cdFx0XHRjb250ZW50OiBjb250ZW50IHx8IFwiU3VjY2VzcyBkb25lXCJcblx0XHR9KTtcblx0fVxuXG5cdHNob3dFcnJvcihjb250ZW50KSB7XG5cdFx0dGhpcy5nZXREYXRhU2V0KCkuY29tbWl0KFwic2V0XCIsIHtcblx0XHRcdGljb246IG1pbnVzQ2lyY2xlLFxuXHRcdFx0Y2lyY2xlOiBmYWxzZSxcblx0XHRcdGNvbG9yOiBcInJlZFwiLFxuXHRcdFx0Y29udGVudDogY29udGVudCB8fCBcIkVycm9yIG9jY3VyXCJcblx0XHR9KTtcblx0fVxuXG5cdGNsb3NlKGRlbGF5ID0gMjAwMCkge1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLmlzUmVtb3ZlZCgpKSB7XG5cdFx0XHRcdHRoaXMuZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRUaGlzQ2xhc3NOYW1lKFwiaW5cIikpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmdldFBhcmVudCgpICYmIHRoaXMuZ2V0UGFyZW50KCkucmVtb3ZlQ2hpbGQodGhpcyk7XG5cdFx0XHRcdH0sIDQwMCk7XG5cdFx0XHR9XG5cdFx0fSwgZGVsYXkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRpbmc7Il19