Ada.unpack({"P1377034640":{"hash":"3fe67266","code":"\"use strict\";Object.defineProperty(exports,\"__esModule\",{value:!0}),exports.default=void 0;var _dec,_class,_adajs=require(\"adajs\");let Toast=(_dec=(0,_adajs.view)({className:\"toast\",template:\"toast/template.html\",style:\"toast/style.scss\",module:\"toast.js\"}))(_class=class extends _adajs.View{oncreated(){this.state=this.option,this.render().then(()=>{this.getElement().style.marginLeft=`-${this.getElement().getBoundingClientRect().width/2}px`,setTimeout(()=>{this.getElement().classList.add(this.getThisClassName(\"out\")),setTimeout(()=>{this.getParent()&&this.getParent().removeChild(this)},1500)},2e3)})}defaultOption(){return{content:\"this is toast\"}}})||_class;var _default=Toast;exports.default=_default;"},"P1930066615":{"hash":"8cc2f999","code":"<div class=\"content\">{{content}}</div>"},"P1102874699":{"hash":"a9968d8d","code":".toast{line-height:30px;padding:0 20px 0 20px;background:#24242c;color:white;border-radius:15px;position:fixed;left:50%;bottom:-100px;transform:translateY(-180px);transition:transform ease-out .3s;opacity:.9;z-index:99999999}.toast .content{font-size:12px;white-space:nowrap}.toast.out{transition:opacity ease-out 1.5s;opacity:0}"}})