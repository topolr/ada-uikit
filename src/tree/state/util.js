const util = {
    initAll(data){
        data.forEach(item => {
            item._opened = false;
            item._actived = false;
            this.initAll(item.list);
        });
    },
    initSelectAll(data, parent = null){
        data.forEach(item => {
            item._opened = false;
            item._actived = false;
            item._selected = false;
            item._parent = parent;
            this.initSelectAll(item.list, item);
        });
    },
    unactiveAll(data){
        data.forEach(item => {
            item._actived = false;
            util.unactiveAll(item.list);
        });
    },
    selectCascade(data, item){
        if (item._selected) {
            item._selected = false;
            this.unselectAllSubs(item.list);
            this.unselectAllParents(item);
        } else {
            item._selected = true;
            this.selectAllSubs(item.list);
            this.selectAllParents(item);
        }
    },
    selectAllParents(item){
        let a = item._parent;
        while (a) {
            a._selected = true;
            a = a._parent;
        }
    },
    unselectAllParents(item){
        let a = item._parent;
        while (a) {
            if (a.list.some(item => item._selected === true)) {
                a._selected = true;
            } else {
                a._selected = false;
            }
            a = a._parent;
        }
    },
    selectAllSubs(data){
        data.forEach(item => {
            item._selected = true;
            this.selectAllSubs(item.list);
        });
    },
    unselectAllSubs(data){
        data.forEach(item => {
            item._selected = false;
            this.unselectAllSubs(item.list);
        });
    }
};

export default util;