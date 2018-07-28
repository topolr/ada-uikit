import {config, StaticViewGroup, view} from "adajs";
import SimpleTable from "ada-uikit/src/table/fliptable";
import Tab from "./../site/tab";
import Code from "./../site/code";
import {addIcon, checkBoxIcon, checkBoxOutlineBlankIcon, closeIcon} from "./icons";

const code = `{
	url: "/mock/table.json",
    btns: [
        {"name": "add", icon: addIcon},
        {"name": "remove", icon: closeIcon}
    ],
    tableOption: {
        rows: [
            {name: "Name", key: "name", width: 120, align: "center", append: "middle"},
            {name: "Sex", key: "sex", width: 120, align: "center", append: "middle"},
            {name: "Age", key: "age", width: 120, align: "center", append: "middle"}
        ],
        actions: [
            {
                display: true,
                width: 40,
                align: "center",
                name: "remove",
                icon: closeIcon
            }
        ],
        checkbox: {
            display: true,
            width: 40,
            align: "center",
            checkedIcon: checkBoxIcon,
            uncheckedIcon: checkBoxOutlineBlankIcon
        },
        unique: "aa"
    }
}`;

@view({
    className: "ada-demo-container"
})
class Table extends StaticViewGroup {
    oncreated() {
        this.addChild(Tab, {
            parameter: {
                tabs: [
                    {
                        title: "Demo", content: SimpleTable, option: {
                            url: `${config.base().basePath}mock/table.json`,
                            btns: [
                                {"name": "add", icon: addIcon},
                                {"name": "remove", icon: closeIcon}
                            ],
                            tableOption: {
                                rows: [
                                    {name: "Name", key: "name", width: 120, align: "center", append: "middle"},
                                    {name: "Sex", key: "sex", width: 120, align: "center", append: "middle"},
                                    {name: "Age", key: "age", width: 120, align: "center", append: "middle"}
                                ],
                                actions: [
                                    {
                                        display: true,
                                        width: 40,
                                        align: "center",
                                        name: "remove",
                                        icon: closeIcon
                                    }
                                ],
                                checkbox: {
                                    display: true,
                                    width: 40,
                                    align: "center",
                                    checkedIcon: checkBoxIcon,
                                    uncheckedIcon: checkBoxOutlineBlankIcon
                                },
                                unique: "name"
                            }
                        }, active: true, type: "module"
                    },
                    {title: "Code", content: Code, option: {type: "javascript", code}, active: false, type: "module"}
                ]
            },
            container: this.getElement()
        });
    }
}

export default Table;