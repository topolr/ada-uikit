import {root, StaticViewGroup, dataset} from "adajs";
import TreeService from "./tree/datasets/simple";
import SimpleTree from "./tree/simple";
import SelectTree from "./tree/select";
import SelectService from "./tree/datasets/select";

@root()
class Root extends StaticViewGroup {
    @dataset(SelectService)
    treeDataSet;

    oncreated() {
        this.render().then(() => {
            this.addChild(SelectTree).then(() => {
                this.treeDataSet.commit("set", [
                    {
                        name: "aa", list: [
                        {name: "aaa", list: []},
                        {
                            name: "bbb", list: [
                            {name: "aaa", list: []},
                            {
                                name: "bbb", list: [
                                {name: "aaa", list: []},
                                {name: "bbb", list: []},
                                {name: "ccc", list: []}
                            ]
                            },
                            {
                                name: "ccc", list: [
                                {name: "aaa", list: []},
                                {name: "bbb", list: []},
                                {
                                    name: "ccc", list: [
                                    {name: "aaa", list: []},
                                    {name: "bbb", list: []},
                                    {name: "ccc", list: []}
                                ]
                                }
                            ]
                            }
                        ]
                        },
                        {name: "ccc", list: []}
                    ]
                    },
                    {
                        name: "bb", list: [
                        {name: "aaa", list: []},
                        {name: "bbb", list: []},
                        {
                            name: "ccc", list: [
                            {name: "aaa", list: []},
                            {name: "bbb", list: []},
                            {name: "ccc", list: []}
                        ]
                        }
                    ]
                    },
                    {
                        name: "cc", list: [
                        {name: "ccc", list: []}
                    ]
                    }
                ]);
            });
        });
    }

    onchildremoved(view) {
        console.log(view);
    }
}

export default Root;