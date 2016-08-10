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
					renderUI: function() {
						var instance = this;

						FormBuilderRuleVisibility.superclass.renderUI.apply(instance, arguments);

						var actionsQuant = instance.get('value').actions.length;

						for (var j = 0; j <= actionsQuant; j++) {
							instance._addAction(j);
						}

						instance._actionsQuant = j;
					},

					renderInicialState: function() {

					},

					_addAction: function(index) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance._createActionDoSelect(index).render(contentBox.one('.action-do-' + index));

						instance._createActionTheSelect(index).render(contentBox.one('.action-the-' + index));
					},

					_createActionDoSelect: function(index) {
						var instance = this;

						var actionDo;

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
							visible: true
						});

						instance._actions[index + '-action-the'] = actionDo;

						return actionDo;
					},

					_createActionTheSelect: function(index) {
						var instance = this;

						var actionThe = new Liferay.DDM.Field.Select({
							fieldName: index + '-action-do',
							showLabel: true,
							label: Liferay.Language.get('the'),
							options: instance.get('fields'),
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
								do: instance._actions[i + '-action-do'].getValue(),
								the: instance._actions[i + '-action-the'].getValue()
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
							kebab: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced')
						}));

						instance._addAction(instance._actionsQuant);

						instance._actionsQuant++;
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