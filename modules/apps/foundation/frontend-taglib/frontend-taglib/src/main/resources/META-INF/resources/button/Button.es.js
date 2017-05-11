import Component from 'metal-component';
import Soy from 'metal-soy';
import { validators } from 'metal-state';

import '../icon/Icon.es';

import templates from './Button.soy';

/**
 * Icon
 * This component implements a way to render icons from Clay library.
 * It supports both SVG based icons and typography based icons.
 * https://liferay.github.io/clay/content/icons-lexicon/.
 */
class Button extends Component {

}

/**
 * State definition.
 * @ignore
 * @type {!Object}
 * @static
 */
Button.STATE = {
	/**
	 * @inheritdoc
	 */
	elementClasses: {
		validator: validators.string
	},

	/**
	 * The component container ID. A random value will be generated in the
	 * Java Class if it's not defined.
	 * @type {?string}
	 */
	id: {
		validator: validators.string
	},

  /**
	 * The component container ID. A random value will be generated in the
	 * Java Class if it's not defined.
	 * @type {?string}
	 */
	label: {
		validator: validators.string
	}
};

// Register component
Soy.register(Button, templates);

export default Button;