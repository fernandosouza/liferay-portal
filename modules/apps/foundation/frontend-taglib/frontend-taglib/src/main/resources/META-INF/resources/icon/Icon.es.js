import Component from 'metal-component';
import Soy from 'metal-soy';
import { validators } from 'metal-state';

import templates from './Icon.soy';

/**
 * Icon
 *
 */
class Icon extends Component {

}

/**
 * State definition.
 * @ignore
 * @type {!Object}
 * @static
 */
Icon.STATE = {
	/**
	 * The path to the SVG spritemap file containing the icons.
	 * @instance
	 * @memberof MetalClayIcon
	 * @type {?string}
	 * @default undefined
	 */
	spritemap: {
		validator: validators.string
	},

	/**
	 * The name of the Clay SVG Icon e.g. `plus`.
	 * @instance
	 * @memberof MetalClayIcon
	 * @type {?string}
	 * @default undefined
	 */
	symbol: {
		validator: validators.string
	},

	/**
	 * The name of the Clay SVG Icon e.g. `plus`.
	 * @instance
	 * @memberof MetalClayIcon
	 * @type {?string}
	 * @default undefined
	 */
	pathThemeImages: {
		validator: validators.string
	}
};

// Register component
Soy.register(Icon, templates);

export default Icon;