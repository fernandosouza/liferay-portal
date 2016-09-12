AUI.add(
	'liferay-ddm-form-renderer-field-context-support',
	function(A) {
		var AObject = A.Object;

		var Lang = A.Lang;

		var Renderer = Liferay.DDM.Renderer;

		var FieldTypes = Renderer.FieldTypes;
		var Util = Renderer.Util;

		var FieldContextSupport = function(config) {};

		FieldContextSupport.prototype = {
			initializer: function() {
				var instance = this;

				var type = instance.get('type');

				var fieldType = FieldTypes.get(type);

				var fieldClassName = fieldType.get('className');

				var fieldClass = A.Object.getValue(window, fieldClassName.split('.'));

				instance._eventHandlers = [];

				instance.bindFieldClassAttributesStatus(fieldClass);
			},

			bindFieldClassAttributesStatus: function(fieldClass) {
				var instance = this;

				var EXTENDS = fieldClass;

				while (!!EXTENDS) {
					var extendAttributes = {};

					AObject.keys(EXTENDS.ATTRS).forEach(
						function(attributeName) {
							if (EXTENDS.ATTRS[attributeName].state) {
								instance.after(attributeName + 'Change', A.bind(instance._setAttributeSetter, instance, attributeName));
							}
						}
					);

					EXTENDS = EXTENDS.EXTENDS;
				}

				instance._eventHandlers.push(instance.after('contextChange', instance._afterContextChange));
			},

			_afterContextChange: function(event) {
				var instance = this;

				var repaint = false;

				var newContext = event.newVal;

				var oldContext = event.prevVal;

				for (var name in newContext) {
					if (!Util.compare(newContext[name], oldContext[name])) {
						if (instance.isRepaintable(name)) {
							repaint = true;
						}
					}

					if (!Util.compare(newContext[name], instance.get(name))) {
						instance.set(name, newContext[name]);
					}
				}

				if (repaint && instance.get('rendered')) {
					instance.render();
				}
			},

			isRepaintable: function(attributeName) {
				var instance = this;

				var context = instance.get('context');

				return context && context.hasOwnProperty(attributeName);
			},

			_setAttributeSetter: function(name) {
				var instance = this;

				var value = instance.get(name);

				var context = instance.get('context');

				if (!Util.compare(value, context[name])) {
					instance.set('context.' + name, value);
				}
			}
		};

		Liferay.namespace('DDM.Renderer').FieldContextSupport = FieldContextSupport;
	},
	'',
	{
		requires: ['liferay-ddm-form-renderer-types', 'liferay-ddm-form-renderer-util']
	}
);