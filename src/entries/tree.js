import {root, StaticViewGroup, dataset} from "adajs";
import TreeService from "./../tree/state/simple";
import SimpleTree from "./../tree/simple";
import SelectTree from "./../tree/select";
import SelectService from "./../tree/state/select";

@root()
class Root extends StaticViewGroup {
	oncreated() {
		let data = [
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
		];
		this.addChild(SimpleTree, {
			parameter: data
		}).then(()=> console.log(data));
	}
}

export default Root;