AUI.add(
	'liferay-ddl-form-builder-rule-visibility',
	function(A) {
		var FormBuilderRuleVisibility = A.Component.create(
			{
				ATTRS: {
					title: {
						value: Liferay.Language.get('visibility')
					}
				},

				EXTENDS: Liferay.DDL.FormBuilderRule,

				NAME: 'liferay-ddl-form-builder-rule-visibility',

				prototype: {
					_renderActions: function(actions) {
						var instance = this;

						var actionsQuant = actions.length;

						for (var i = 0; i < actionsQuant; i++) {
							instance._addAction(i, actions[i]);
						}

						if (instance._actionsQuant === 0) {
							instance._addAction(0);
						}
					},

					_addAction: function(index, action) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance._createActionSelect(index, action).render(contentBox.one('.action-do-' + index));

						instance._createTargetSelect(index, action).render(contentBox.one('.action-the-' + index));

						instance._actionsQuant++;
					},

					_createActionSelect: function(index, action) {
						var instance = this;

						var actionDo;

						var value;

						if (action) {
							value = action['action'];
						}

						actionDo = new Liferay.DDM.Field.Select({
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
						});

						instance._actions[index + '-action-the'] = actionDo;

						return actionDo;
					},

					_createTargetSelect: function(index, action) {
						var instance = this;

						var value;

						if (action) {
							value = action['target'];
						}

						var actionThe = new Liferay.DDM.Field.Select({
							fieldName: index + '-action-do',
							showLabel: true,
							label: Liferay.Language.get('the'),
							options: instance.get('fields'),
							value: value,
							visible: true
						});

						instance._actions[index + '-action-do'] = actionThe;

						return actionThe;
					},

					_getActions: function() {
						var instance = this;

						var actions = [];

						for (var i = 0; i < instance._actionsQuant; i++) {
							var action = {
								target: instance._actions[i + '-action-do'].getValue(),
								action: instance._actions[i + '-action-the'].getValue()
							};

							actions.push(action);
						}

						return actions;
					},

					_getRuleTemplate: function() {
						return '';
					},

					_getRuleType: function() {
						return '';
					},

					_handleAddActionClick: function() {
						var instance = this;

						var actionListNode = instance.get('contentBox').one('.form-builder-rule-action-list');

						actionListNode.append(ddl.rule.action({
							index: instance._actionsQuant,
							deleteIcon: Liferay.Util.getLexiconIconTpl('trash', 'icon-monospaced')
						}));

						instance._addAction(instance._actionsQuant);
					}
				}
			}
		);

		Liferay.namespace('DDL.Rules').visibility = FormBuilderRuleVisibility;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-rule-visibility-template', 'liferay-ddl-form-builder-rule']
	}
);