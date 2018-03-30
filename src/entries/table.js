import {dataset, root, StaticViewGroup} from "adajs";
import SimpleTableService from "./../table/datasets/simple";
import SimpleTable from "./../table/simple";

@root()
class Root extends StaticViewGroup {
    @dataset(SimpleTableService)
    tableDataSet;

    oncreated() {
        this.render().then(() => {
            this.addChild(SimpleTable).then(() => {
                this.tableDataSet.setOption(() => {
                    return {
                        rows: [
                            {name: "AA", key: "aa", width: 120, align: "center"},
                            {name: "BB", key: "bb", width: 120, align: "center"},
                            {name: "CC", key: "cc", width: 120, align: "center"}
                        ],
                        tools: [
                            {name: "remove", action: "remove"},
                            {name: "edit", action: "edit"}
                        ]
                    }
                });
                this.tableDataSet.commit("set", [
                    {aa: "aa1", bb: "bb1", cc: "cc1"},
                    {aa: "aa2", bb: "bb2", cc: "cc2"},
                    {aa: "aa3", bb: "bb3", cc: "cc3"},
                    {aa: "aa4", bb: "bb4", cc: "cc4"},
                    {aa: "aa5", bb: "bb5", cc: "cc5"},
                    {aa: "aa6", bb: "bb6", cc: "cc6"}
                ])
            });
        });
    }

    onchildremoved(view) {
        console.log(view);
    }
}

export default Root;