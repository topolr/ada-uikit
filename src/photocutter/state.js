import { Service, action } from "adajs";

class PhotocutterService extends Service {
	defaultData() {
		return {
			picWidth: 100,
			picHeight: 100,
			rotateoffset: 5,
			zoomoffset: 50,
			size: 5,
			mask: true,
			btns: [
				{ action: 'open', icon: '' },
				{ action: 'rotateLeft', icon: '' },
				{ action: 'rotateRight', icon: '' },
				{ action: 'zoomIn', icon: '' },
				{ action: 'zoomOut', icon: '' },
				{ action: 'reset', icon: '' }
			]
		}
	}

	@action('hide-mask')
	hideMask(current) {
		current.mask = false;
	}
}

export default PhotocutterService;