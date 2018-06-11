Ada.unpack({"P1325097516":{"hash":"3d15d96c","code":"\"use strict\";Object.defineProperty(exports,\"__esModule\",{value:!0}),exports.default=void 0;var _dec,_dec2,_dec3,_dec4,_class,_class2,_descriptor,_adajs=require(\"adajs\"),_simple=_interopRequireDefault(require(\"tree/datasets/simple.js\")),_triangleRight=_interopRequireDefault(require(\"tree/icons/triangle-right.icon\"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _initializerDefineProperty(e,t,r,i){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:!0,value:r.initializer?r.initializer.call(i):void 0})}function _applyDecoratedDescriptor(e,t,r,i,a){var l={};return Object.keys(i).forEach(function(e){l[e]=i[e]}),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,(\"value\"in l||l.initializer)&&(l.writable=!0),l=r.slice().reverse().reduce(function(r,i){return i(e,t,r)||r},l),a&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(a):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}function _initializerWarningHelper(e,t){throw new Error(\"Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.\")}let SimpleTree=(_dec=(0,_adajs.view)({className:\"simpletree\",template:\"tree/template/simple.html\",style:\"tree/style/simple.scss\",module:\"tree/simple.js\"}),_dec2=(0,_adajs.refer)(_simple.default),_dec3=(0,_adajs.binder)(\"toggle\"),_dec4=(0,_adajs.binder)(\"active\"),_dec((_descriptor=_applyDecoratedDescriptor((_class2=class extends _adajs.View{constructor(...e){var t;return t=super(...e),_initializerDefineProperty(this,\"treeDataSet\",_descriptor,this),t}defaultState(){return{icons:{triangleRight:_triangleRight.default}}}toggle({item:e}){this.treeDataSet.commit(\"toggle\",e)}active({item:e}){this.treeDataSet.commit(\"active\",e)}}).prototype,\"treeDataSet\",[_dec2],{enumerable:!0,initializer:null}),_applyDecoratedDescriptor(_class2.prototype,\"toggle\",[_dec3],Object.getOwnPropertyDescriptor(_class2.prototype,\"toggle\"),_class2.prototype),_applyDecoratedDescriptor(_class2.prototype,\"active\",[_dec4],Object.getOwnPropertyDescriptor(_class2.prototype,\"active\"),_class2.prototype),_class=_class2))||_class);var _default=SimpleTree;exports.default=_default;"},"P1758773725":{"hash":"fed947f0","code":"<div class=\"block\">    {{list list as item}}    <div class=\"{{item._opened?'item opened':'item'}}\"><div class=\"{{ item._actived?'head active':'head' }}\">            {{if item.list.length>0}}            <div class=\"arrow\" onclick=\"{{toggle(item)}}\"><@icon class='icon' id=\"{{icons.triangleRight}}\"/></div>            {{else}}            <div class=\"noarrow\"></div>            {{/if}}            <div class=\"name\" onclick=\"{{active(item)}}\">{{item.name}}</div></div><div class=\"body\"><@self @data=\"{{ {list:item.list,icons:icons} }}\"/></div></div>    {{/list}}</div>"},"P1891101731":{"hash":"7285d774","code":".simpletree{font-size:13px;cursor:default;background:#eee;position:absolute;left:0;top:0;right:0;bottom:0;padding:10px;overflow:auto}.simpletree .icon{display:inline-block;vertical-align:middle;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;font-size:14px}.simpletree .block .item>.head{line-height:25px}.simpletree .block .item>.head>.arrow{width:15px;height:25px;text-align:center;display:inline-block;vertical-align:top;line-height:22px}.simpletree .block .item>.head>.noarrow{width:15px;height:25px;display:inline-block;vertical-align:top}.simpletree .block .item>.head>.name{display:inline-block;vertical-align:top;padding:0 5px 0 5px}.simpletree .block .item>.head.active>.name{background:#3d78a7;color:white;border-radius:5px}.simpletree .block .item>.body{margin-left:17px;display:none}.simpletree .block .item.opened>.head>.arrow{transform:rotate(90deg)}.simpletree .block .item.opened>.body{display:block}"}})