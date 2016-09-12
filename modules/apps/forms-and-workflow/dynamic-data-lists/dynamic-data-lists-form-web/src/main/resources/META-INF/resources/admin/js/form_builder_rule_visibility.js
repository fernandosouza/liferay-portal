AUI.add(
	'liferay-ddl-form-builder-rule-visibility',
	function(A) {
		var FormBuilderRuleVisibility = A.Component.create(
			{
				ATTRS: {
					title: {
						value: Liferay.Language.get('visibility')
					},
					type: {
						value: 'VISIBILITY'
					}
				},

				EXTENDS: Liferay.DDL.FormBuilderRule,

				NAME: 'liferay-ddl-form-builder-rule-visibility',

				prototype: {
					_addAction: function(index, action) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance._createActionSelect(index, action, contentBox.one('.action-do-' + index));
						instance._createTargetSelect(index, action, contentBox.one('.action-the-' + index));

						instance._actionsIndexes.push(Number(index));
					},

					_createActionSelect: function(index, action, container) {
						var instance = this;

						var value;

						if (action && action.action) {
							value = action.action;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								fieldName: index + '-action-the',
								options: [
									{
										label: Liferay.Language.get('show'),
										value: 'show'
									},
									{
										label: Liferay.Language.get('hide'),
										value: 'hide'
									}
								],
								value: value,
								visible: true
							}
						);

						field.render(container);

						instance._actions[index + '-action-the'] = field;
					},

					_createTargetSelect: function(index, action, container) {
						var instance = this;

						var value;

						if (action && action.target) {
							value = action.target;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								fieldName: index + '-action-do',
								label: Liferay.Language.get('the'),
								options: instance.get('fields'),
								showLabel: true,
								value: value,
								visible: true
							}
						);

						field.render(container);

						instance._actions[index + '-action-do'] = field;
					},

					_getActions: function() {
						var instance = this;

						var actions = [];

						for (var i = instance._actionsIndexes.length - 1; i >= 0; i--) {
							var index = instance._actionsIndexes[i];

							var action = {
								action: instance._actions[index + '-action-the'].getValue(),
								target: instance._actions[index + '-action-do'].getValue()
							};

							actions.push(action);
						}

						return actions;
					},

					_handleAddActionClick: function() {
						var instance = this;

						var actionListNode = instance.get('contentBox').one('.form-builder-rule-action-list');

						var index = instance._actionsIndexes[instance._actionsIndexes.length - 1] + 1;

						actionListNode.append(
							ddl.rule.action(
								{
									deleteIcon: Liferay.Util.getLexiconIconTpl('trash', 'icon-monospaced'),
									index: index
								}
							)
						);

						instance._addAction(index);
					},

					_renderActions: function(actions) {
						var instance = this;

						var actionsQuant = actions.length;

						for (var i = 0; i < actionsQuant; i++) {
							instance._addAction(i, actions[i]);
						}

						if (instance._actionsIndexes.length === 0) {
							instance._addAction(0);
						}
					}
				}
			}
		);

		Liferay.namespace('DDL.Rules').visibility = FormBuilderRuleVisibility;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-rule', 'liferay-ddl-form-builder-rule-visibility-template']
	}
);