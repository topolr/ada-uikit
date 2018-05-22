import {binder, view, View} from "adajs";
import PannelService from "./datasets/pannel";

@view({
	className: "datepannel",
	template: "./template/pannel.html",
	style: "./style/pannel.scss",
	dataset: {
		service: PannelService
	}
})
class Pannel extends View {
	@binder("select")
	select({item}) {
		this.getDataSet().commit("select", new Date(`${item.year}/${item.month + 1}/${item.day} 0:0:0`));
	}

	@binder("prev")
	prev() {
		this.getDataSet().commit("prevmonth");
	}

	@binder("next")
	next() {
		this.getDataSet().commit("nextmonth");
	}

	@binder("gotoyear")
	gotoYear({item}) {
		this.getDataSet().commit("gotoyear", item.year);
	}

	@binder("gotomonth")
	gotoMonth({item}) {
		this.getDataSet().commit("gotomonth", item.month);
	}

	@binder("showpannel")
	showPannel() {
		this.getElement().classList.toggle(this.getThisClassName("showpannel"));
		this.focusScroll();
	}

	@binder("closepannel")
	closePannel() {
		this.getElement().classList.remove(this.getThisClassName("showpannel"));
	}

	@binder("today")
	today() {
		this.getDataSet().commit("today");
	}

	focusScroll() {
		let target = this.finder("scroll").getElement().querySelector(`.${this.getThisClassName("selected")}`);
		if (target) {
			this.finder("scroll").getElement().scrollTop = target.offsetTop - 30;
		}
	}

	render() {
		return super.render().then(() => this.focusScroll());
	}
}

export default Pannel;