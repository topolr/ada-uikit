import {dataset, root, StaticViewGroup} from "adajs";
import MixTableService from "./../table/datasets/mix";
import MixTable from "./../table/mix";

@root()
class Root extends StaticViewGroup {
    @dataset(MixTableService)
    tableDataSet;

    oncreated() {
        this.render().then(() => {
            this.addChild(MixTable).then(() => {
                this.tableDataSet.setOption(() => {
                    return {
                        rows: [
                            {name: "AA", key: "aa", width: 120, align: "center", append: "middle"},
                            {name: "BB", key: "bb", width: 120, align: "center", append: "middle"},
                            {name: "CC", key: "cc", width: 120, align: "center", append: "middle"}
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