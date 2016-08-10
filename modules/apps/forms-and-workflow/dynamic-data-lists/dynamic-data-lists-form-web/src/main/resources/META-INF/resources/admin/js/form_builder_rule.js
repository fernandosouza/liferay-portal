AUI.add(
	'liferay-ddl-form-builder-rule',
	function(A) {
		var textOperators = [
			{
				label: Liferay.Language.get('equals-to'),
				value: 'equals-to'
			},
			{
				label: Liferay.Language.get('not-equals-to'),
				value: 'not-equals-to'
			},
			{
				label: Liferay.Language.get('contains'),
				value: 'contains'
			},
			{
				label: Liferay.Language.get('not-contains'),
				value: 'not-contains'
			},
			{
				label: Liferay.Language.get('starts-with'),
				value: 'starts-with'
			},
			{
				label: Liferay.Language.get('not-starts-with'),
				value: 'not-starts-with'
			},
			{
				label: Liferay.Language.get('ends-with'),
				value: 'ends-with'
			},
			{
				label: Liferay.Language.get('empty'),
				value: 'empty'
			},
			{
				label: Liferay.Language.get('not-empty'),
				value: 'not-empty'
			}
		];

		var FormBuilderRule = A.Component.create(
			{
				ATTRS: {
					description: {
						value: ''
					},
					fields: {
						value: []
					},
					value: {
						value: {
							actions: [],
							conditions: []
						}
					},
					title: {
						value: ''
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-rule',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._conditions = {};
						instance._actions = {};
					},

					renderUI: function() {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.setHTML(instance._getRuleContainerTemplate());

						var conditionsQuant = instance.get('value').conditions.length;

						for (var i = 0; i <= conditionsQuant; i++) {
							instance._addCondition(i);
						}

						instance._conditionsQuant  = i;
					},

					bindUI: function() {
						var instance = this;

						instance.get('contentBox').delegate('click',
							A.bind(instance._handleSaveClick, instance), '.form-builder-rule-settings-save');
						instance.get('contentBox').delegate('click',
							A.bind(instance._handleCancelClick, instance), '.form-builder-rule-settings-cancel');

						instance.get('contentBox').one('.form-builder-rule-add-condition').on('click',
							A.bind(instance._handleAddConditionClick, instance));
						instance.get('contentBox').one('.form-builder-rule-add-action').on('click',
							A.bind(instance._handleAddActionClick, instance));

						instance.on('*:valueChanged', A.bind(instance._handleSelectValueChanged, instance));
					},

					renderInicialState: function() {

					},

					_addCondition: function(cardIndex) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance._createConditionIfSelect(cardIndex).render(contentBox.one('.condition-if-' + cardIndex));

						instance._createConditionOperatorSelect(cardIndex).render(contentBox.one('.condition-operator-' + cardIndex));

						instance._createConditionTheSelect(cardIndex).render(contentBox.one('.condition-the-' + cardIndex));

						instance._createConditionTypeText(cardIndex).render(contentBox.one('.condition-type-value-' + cardIndex));

						instance._createConditionTypeSelect(cardIndex).render(contentBox.one('.condition-type-value-' + cardIndex));
					},

					_createConditionIfSelect: function(cardIndex) {
						var instance = this;

						var conditionIf;

						conditionIf = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							showLabel: true,
							label: Liferay.Language.get('if'),
							options: instance.get('fields'),
							visible: true,
							fieldName: cardIndex + '-condition-if'
						});

						instance._conditions[cardIndex + '-condition-if'] = conditionIf;

						return conditionIf;
					},

					_createConditionOperatorSelect: function(cardIndex) {
						var instance = this;

						var conditionOperator;

						conditionOperator = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							showLabel: true,
							label: Liferay.Language.get('state'),
							options: textOperators,
							visible: true,
							fieldName: cardIndex + '-condition-operator'
						});

						instance._conditions[cardIndex + '-condition-operator'] = conditionOperator;

						return conditionOperator;
					},

					_createConditionTheSelect: function(cardIndex) {
						var instance = this;

						var conditionThe;

						conditionThe = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							showLabel: true,
							label: Liferay.Language.get('the'),
							options: [
								{
									label: Liferay.Language.get('value'),
									value: 'value'
								},
								{
									label: Liferay.Language.get('other-field'),
									value: 'other-field'
								}
							],
							fieldName: cardIndex + '-condition-the',
							visible: false
						});

						instance._conditions[cardIndex + '-condition-the'] = conditionThe;

						return conditionThe;
					},

					_createConditionTypeSelect: function(cardIndex) {
						var instance = this;

						var conditionType;

						conditionType = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							fieldName: cardIndex + '-condition-type-select',
							options: instance.get('fields'),
							showLabel: false,
							visible: false
						});

						instance._conditions[cardIndex + '-condition-type-select'] = conditionType;

						return conditionType;
					},

					_createConditionTypeText: function(cardIndex) {
						var instance = this;

						var conditionType;

						conditionType = new Liferay.DDM.Field.Text({
							bubbleTargets: [instance],
							strings: {},
							options: [],
							fieldName: cardIndex + '-condition-type-text',
							showLabel: false,
							visible: false
						});

						instance._conditions[cardIndex + '-condition-type-text'] = conditionType;

						return conditionType;
					},

					_getRuleContainerTemplate: function() {
						var instance = this;

						var ruleSettingsContainer;

						ruleSettingsContainer = ddl.rule.settings({
							actions: instance.get('value').actions,
							cancelLabel: Liferay.Language.get('cancel'),
							conditions: instance.get('value').conditions,
							kebab: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced'),
							saveLabel: Liferay.Language.get('save')
						});

						return ruleSettingsContainer;
					},

					_getRuleTemplate: function() {
						return '';
					},

					_getRuleType: function() {
						return '';
					},

					_handleAddActionClick: function() {},

					_handleSelectValueChanged: function(event) {
						var instance = this;

						var field = event.field;

						var condition = field.get('fieldName').split('-');

						if (condition[2] === 'the') {
							if (field.getValue() === 'other-field') {
								instance._conditions[condition[0] + '-condition-type-select'].set('visible', true);
								instance._conditions[condition[0] + '-condition-type-text'].set('visible', false);
							}
							else {
								instance._conditions[condition[0] + '-condition-type-select'].set('visible', false);
								instance._conditions[condition[0] + '-condition-type-text'].set('visible', true);
							}
						}

						if (condition[2] === 'operator') {
							if (field.getValue() === 'empty' || field.getValue() === 'not-empty') {
								instance._conditions[condition[0] + '-condition-the'].set('visible', false);
							}
							else {
								instance._conditions[condition[0] + '-condition-the'].set('visible', true);
							}
						}
					},

					_handleAddConditionClick: function() {
						var instance = this;

						var conditionListNode = instance.get('contentBox').one('.form-builder-rule-condition-list');

						conditionListNode.append(ddl.rule.condition({
							index: instance._conditionsQuant,
							kebab: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced')
						}));

						instance._addCondition(instance._conditionsQuant);

						instance._conditionsQuant++;
					},

					_handleCancelClick: function() {
						var instance = this;

						instance.fire('cancelRule');
					},

					_getActions: function() {
					},

					_getConditions: function() {
						var instance = this;

						var conditions = [];

						for (var i = 0; i < instance._conditionsQuant; i++) {
							var condition = {
								if: instance._conditions[i + '-condition-if'].getValue(),
								operator: instance._conditions[i + '-condition-operator'].getValue()
							};

							if (instance._conditions[i + '-condition-the'].get('visible')) {
								condition.the = instance._conditions[i + '-condition-the'].getValue();

								if (instance._conditions[i + '-condition-the'].getValue() === 'value') {
									condition.value = instance._conditions[i + '-condition-type-text'].getValue();
								}
								else {
									condition.value = instance._conditions[i + '-condition-type-select'].getValue();
								}
							}

							conditions.push(condition);
						}

						return conditions;
					},

					_handleSaveClick: function() {
						var instance = this;

						instance.fire('saveRule', {
							condition: instance._getConditions(),
							actions: instance._getActions()
						});
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderRule = FormBuilderRule;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-rule-template', 'liferay-ddm-form-renderer-field']
	}
);