import {Service} from "adajs";
import refreshCw from "./icons/refresh-cw.icon";
import rotateCcw from "./icons/rotate-ccw.icon";
import rotateCw from "./icons/rotate-cw.icon";
import zoomIn from "./icons/zoom-in.icon";
import zoomOut from "./icons/zoom-out.icon";
import folder from "./icons/folder.icon";

class PhotocutterService extends Service {
	defaultData() {
		return {
			picWidth: 100,
			picHeight: 100,
			rotateoffset: 5,
			zoomoffset: 50,
			size: 5,
			none: true,
			refreshCw, rotateCw, rotateCcw, zoomIn, zoomOut, folder
		}
	}
}

export default PhotocutterService;