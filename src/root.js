import {root, StaticViewGroup} from "adajs";
import Phototcutter from "./photocutter";
import Loading from "./loading";
import Toast from "./toast";
import Tween from "./tween";
import Browser from "./browser";
import transition from "./transition";
import transform from "./transform";
import query from "./query";
import observe from "./observe";
import Alert from "./alert";
import Messagebox from "./messagebox";
import Logo from "./logo";
import tree from "./tree";
import {Text} from "./form";

@root()
class Root extends StaticViewGroup {
    constructor(option) {
        super(option);
        // this.addChild(Loading).then((loading) => {
        //     loading.showLoading("loading");
        //     window.loading = loading;
        // });
        //
        // console.log(Browser)

        // transition(this.getElement()).set("opacity").when((element) => {
        //     // element.style.opacity = 0;
        //     transform(element).x("200px");
        // }).then(() => {
        //     console.log("done")
        // });
        // let a = observe({
        //     aa: "aa",
        //     bb: "cc",
        //     cc: [
        //         {aa: "aa"}
        //     ]
        // }, (a) => {
        //     console.log(a);
        // });
        // console.log(a);
        // a.aa = "ccccc";
        // a.cc.push({aa: "fff"});
        // this.addChild(Alert);
        // this.addChild(Messagebox);
        // this.addChild(Toast)
        // this.addChild(Loading).then((loading) => {
        //     window.loading = loading;
        // });
        this.addChild(tree,{
            option:{
                list:[
                    {name:"aa",list:[
                        {name:"aaa",list:[]},
                        {name:"bbb",list:[
                            {name:"aaa",list:[]},
                            {name:"bbb",list:[
                                {name:"aaa",list:[]},
                                {name:"bbb",list:[]},
                                {name:"ccc",list:[]}
                            ]},
                            {name:"ccc",list:[
                                {name:"aaa",list:[]},
                                {name:"bbb",list:[]},
                                {name:"ccc",list:[
                                    {name:"aaa",list:[]},
                                    {name:"bbb",list:[]},
                                    {name:"ccc",list:[]}
                                ]}
                            ]}
                        ]},
                        {name:"ccc",list:[]}
                    ]},
                    {name:"bb",list:[
                        {name:"aaa",list:[]},
                        {name:"bbb",list:[]},
                        {name:"ccc",list:[
                            {name:"aaa",list:[]},
                            {name:"bbb",list:[]},
                            {name:"ccc",list:[]}
                        ]}
                    ]},
                    {name:"cc",list:[
                        {name:"ccc",list:[]}
                    ]}
                ]
            }
        });
    }

    onchildremoved(view){
        console.log(view);
    }
}

export default Root;