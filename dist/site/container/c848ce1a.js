"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _dec,_dec2,_dec3,_dec4,_dec5,_dec6,_dec7,_dec8,_class,_class2,_adajs=require("adajs"),_state=babelHelpers.interopRequireDefault(require("site/container/state.js")),_content=babelHelpers.interopRequireDefault(require("site/content/index.js")),_submenu=babelHelpers.interopRequireDefault(require("site/submenu/index.js")),_menu=babelHelpers.interopRequireDefault(require("site/menu/index.js")),_router2=babelHelpers.interopRequireDefault(require("node_modules/ada-uikit/src/router.js")),_dispatcher=babelHelpers.interopRequireDefault(require("node_modules/ada-uikit/src/dispatcher.js")),Container=(_dec=(0,_adajs.view)({className:"container",template:"site/container/template.html",style:"site/container/style.scss",dataset:{service:_state.default},module:"site/container/index.js"}),_dec2=(0,_adajs.subscribe)("click"),_dec3=(0,_adajs.binder)("open"),_dec4=(0,_adajs.binder)("openmenu"),_dec5=(0,_adajs.handler)("flip"),_dec6=(0,_adajs.handler)("setsubmenu"),_dec7=(0,_adajs.binder)("openmenuc"),_dec8=(0,_adajs.binder)("closemenuc"),_dec((_class2=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"onready",value:function(){var e=this;_dispatcher.default.observe(this);var t=(0,_adajs.config)().basePath,s=this.router=(0,_router2.default)("".concat(window.location.protocol,"//").concat(window.location.host).concat(t.substring(0,t.length-1)));this.getDataSet().getComputeData("links").forEach(function(t){s.bind("/"===t.link?"/":t.link,function(s){e.commit("flip",t)})}),this.router.run()}},{key:"tags",value:function(){return{content:_content.default,submenu:_submenu.default,menu:_menu.default}}},{key:"click",value:function(e){var t=e.target;this.finder("list").getElement().contains(t)||this.finder("list").getElement().classList.remove(this.getThisClassName("open"))}},{key:"open",value:function(e){var t=e.item;this.finder("list").getElement().classList.remove(this.getThisClassName("open")),this.commit("open",t)}},{key:"openmenu",value:function(){this.finder("list").getElement().classList.add(this.getThisClassName("open"))}},{key:"flip",value:function(e){var t=e.data;this.closemenuc(),this.router.open(t.link)}},{key:"setSubMenu",value:function(e){this.commit("setsubmenu",e.data)}},{key:"openMenu",value:function(){this.getElement().classList.add(this.getThisClassName("open"))}},{key:"closemenuc",value:function(){this.getElement().classList.remove(this.getThisClassName("open"))}}]),t}(_adajs.ViewGroup),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"click",[_dec2],Object.getOwnPropertyDescriptor(_class2.prototype,"click"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"open",[_dec3],Object.getOwnPropertyDescriptor(_class2.prototype,"open"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"openmenu",[_dec4],Object.getOwnPropertyDescriptor(_class2.prototype,"openmenu"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"flip",[_dec5],Object.getOwnPropertyDescriptor(_class2.prototype,"flip"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"setSubMenu",[_dec6],Object.getOwnPropertyDescriptor(_class2.prototype,"setSubMenu"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"openMenu",[_dec7],Object.getOwnPropertyDescriptor(_class2.prototype,"openMenu"),_class2.prototype),babelHelpers.applyDecoratedDescriptor(_class2.prototype,"closemenuc",[_dec8],Object.getOwnPropertyDescriptor(_class2.prototype,"closemenuc"),_class2.prototype),_class=_class2))||_class),_default=Container;exports.default=_default;