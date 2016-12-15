AUI.add(
	'liferay-ddl-form-builder-action-factory',
	function(A) {
		var SoyTemplateUtil = Liferay.DDL.SoyTemplateUtil;

		var FormBuilderActionFactory = A.Component.create(
			{
				ATTRS: {
					fields: {
						value: []
					},
					pages: {
						value: []
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-action-factory',

				prototype: {
					createAction: function(type, index, act, container) {
						var instance = this;

						var action;

						if (instance._isPropertyAction(type)) {
							action = new Liferay.DDL.FormBuilderActionProperty(
								{
									boundingBox: container,
									action: act,
									index: index,
									options: instance.get('fields')
								}
							);
						} else if (type === 'jump-to-page') {
							action = new Liferay.DDL.FormBuilderActionJumpToPage(
								{
									boundingBox: container,
									action: act,
									index: index,
									options: instance.get('pages')
								}
							);
						}

						return action;
					},

					_isPropertyAction: function(actionType) {
						var instance = this;

						var prototypesAction = ['show', 'enable', 'required'];

						return prototypesAction.indexOf(actionType) !== -1;
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderActionFactory = FormBuilderActionFactory;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-render-template', 'liferay-ddm-form-renderer-field']
	}
);