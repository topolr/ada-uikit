"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _dec,_dec2,_dec3,_class,_class2,_adajs=require("adajs"),_state=babelHelpers.interopRequireDefault(require("demo/todo/state.js")),Todo=(_dec=(0,_adajs.view)({className:"todo",template:"demo/todo/template.html",style:"demo/todo/style.scss",dataset:{service:_state.default,type:_adajs.TransactDataSet},module:"demo/todo/index.js"}),_dec2=(0,_adajs.binder)("add"),_dec3=(0,_adajs.binder)("change"),_dec((_class2=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"add",value:function(e){var t=e.e;if(13===t.keyCode){var a=t.target.value;a&&(t.target.value="",t.target.focus(),this.commit("add",{name:a}),this.dispatchEvent("commit",this.getDataSet().getTransactionList().length))}}},{key:"change",value:function(e){var t=e.e.target.value;this.getDataSet().travel(t)}}]),t}(_adajs.View),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"add",[_dec2],Object.getOwnPropertyDescriptor(_class2.prototype,"add"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"change",[_dec3],Object.getOwnPropertyDescriptor(_class2.prototype,"change"),_class2.prototype),_class=_class2))||_class),_default=Todo;exports.default=_default;