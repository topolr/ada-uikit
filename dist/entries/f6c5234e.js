"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _dec,_class,_adajs=require("adajs"),_mix=babelHelpers.interopRequireDefault(require("node_modules/ada-uikit/src/table/mix.js")),_tab=babelHelpers.interopRequireDefault(require("site/tab/index.js")),_code=babelHelpers.interopRequireDefault(require("site/code/index.js")),_icons=require("entries/icons/index.js"),code='{\n\toption: {\n\t\trows: [\n\t\t\t{name: "AA", key: "aa", width: 120, align: "center", append: "middle"},\n\t\t\t{name: "BB", key: "bb", width: 120, align: "center", append: "middle"},\n\t\t\t{name: "CC", key: "cc", width: 120, align: "center", append: "middle"}\n\t\t],\n\t\tactions: [\n\t\t\t{\n\t\t\t\tdisplay: true,\n\t\t\t\twidth: 40,\n\t\t\t\talign: "center",\n\t\t\t\tname: "remove",\n\t\t\t\ticon: closeIcon\n\t\t\t},\n\t\t\t{\n\t\t\t\tdisplay: true,\n\t\t\t\twidth: 40,\n\t\t\t\talign: "center",\n\t\t\t\tname: "edit",\n\t\t\t\ticon: modeEditIcon\n\t\t\t}\n\t\t],\n\t\tcheckbox: {\n\t\t\tdisplay: true,\n\t\t\twidth: 40,\n\t\t\talign: "center",\n\t\t\tcheckedIcon: checkBoxIcon,\n\t\t\tuncheckedIcon: checkBoxOutlineBlankIcon\n\t\t},\n\t\tunique: "aa"\n\t},\n\tdata: [\n\t\t{aa: "aa1", bb: "bb1", cc: "cc1"},\n\t\t{aa: "aa2", bb: "bb2", cc: "cc2"},\n\t\t{aa: "aa3", bb: "bb3", cc: "cc3"},\n\t\t{aa: "aa4", bb: "bb4", cc: "cc4"},\n\t\t{aa: "aa5", bb: "bb5", cc: "cc5"},\n\t\t{aa: "aa6", bb: "bb6", cc: "cc6"}\n\t]\n}',Table=(_dec=(0,_adajs.view)({className:"ada-demo-container",module:"entries/mixtable.js"}))(_class=function(t){function e(){return babelHelpers.classCallCheck(this,e),babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(e).apply(this,arguments))}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"oncreated",value:function(){this.addChild(_tab.default,{parameter:{tabs:[{title:"Demo",content:_mix.default,option:{option:{rows:[{name:"AA",key:"aa",width:120,align:"center",append:"middle"},{name:"BB",key:"bb",width:120,align:"center",append:"middle"},{name:"CC",key:"cc",width:120,align:"center",append:"middle"}],actions:[{display:!0,width:40,align:"center",name:"remove",icon:_icons.closeIcon},{display:!0,width:40,align:"center",name:"edit",icon:_icons.modeEditIcon}],checkbox:{display:!0,width:40,align:"center",checkedIcon:_icons.checkBoxIcon,uncheckedIcon:_icons.checkBoxOutlineBlankIcon},unique:"aa"},data:[{aa:"aa1",bb:"bb1",cc:"cc1"},{aa:"aa2",bb:"bb2",cc:"cc2"},{aa:"aa3",bb:"bb3",cc:"cc3"},{aa:"aa4",bb:"bb4",cc:"cc4"},{aa:"aa5",bb:"bb5",cc:"cc5"},{aa:"aa6",bb:"bb6",cc:"cc6"}]},active:!0,type:"module"},{title:"Code",content:_code.default,option:{type:"javascript",code:code},active:!1,type:"module"}]},container:this.getElement()})}}]),e}(_adajs.StaticViewGroup))||_class,_default=Table;exports.default=_default;