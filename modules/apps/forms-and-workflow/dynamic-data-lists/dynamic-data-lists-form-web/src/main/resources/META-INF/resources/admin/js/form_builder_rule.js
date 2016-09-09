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
				label: Liferay.Language.get('is-email-address'),
				value: 'is-email-address'
			},
			{
				label: Liferay.Language.get('is-url'),
				value: 'is-url'
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
					},

					bindUI: function() {
						var instance = this;

						instance.get('contentBox').delegate('click',
							A.bind(instance._handleSaveClick, instance), '.form-builder-rule-settings-save');
						instance.get('contentBox').delegate('click',
							A.bind(instance._handleCancelClick, instance), '.form-builder-rule-settings-cancel');

						instance.get('contentBox').delegate('click',
							A.bind(instance._handleDeleteConditionClick, instance), '.condition-card-delete');
						instance.get('contentBox').delegate('click',
							A.bind(instance._handleDeleteActionClick, instance), '.action-card-delete');

						instance.get('contentBox').delegate('click',
							A.bind(instance._handleAddConditionClick, instance), '.form-builder-rule-add-condition');
						instance.get('contentBox').delegate('click',
							A.bind(instance._handleAddActionClick, instance), '.form-builder-rule-add-action');

						instance.on('*:valueChanged', A.bind(instance._handleSelectValueChanged, instance));
					},

					renderInicialState: function() {

					},

					_renderActions: function() {

					},

					renderRule: function(rule) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.setHTML(instance._getRuleContainerTemplate(rule));

						instance._conditionsQuant = 0;
						instance._actionsQuant = 0;

						instance._renderConditions(rule.conditions);
						instance._renderActions(rule.actions);
					},

					_renderConditions: function(conditions) {
						var instance = this;

						var conditionsQuant = conditions.length;

						for (var i = 0; i < conditionsQuant; i++) {
							instance._addCondition(i, conditions[i]);
						}

						if (instance._conditionsQuant === 0) {
							instance._addCondition(i, conditions[i]);
						}
					},

					_addCondition: function(index, condition) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance._createFirstOperandField(index, condition).render(contentBox.one('.condition-if-' + index));

						instance._createOperatorField(index, condition).render(contentBox.one('.condition-operator-' + index));

						instance._createSecondOperandTypeField(index, condition).render(contentBox.one('.condition-the-' + index));

						instance._createSecondOperandInputField(index, condition).render(contentBox.one('.condition-type-value-' + index));

						instance._createSecondOperandSelectElementField(index, condition).render(contentBox.one('.condition-type-value-' + index));

						instance._createSecondOperandSelectOptionsField(index, condition).render(contentBox.one('.condition-type-value-options-' + index));

						instance._conditionsQuant++;
					},

					_createFirstOperandField: function(index, condition) {
						var instance = this;

						var conditionIf;

						var value;

						if (condition) {
							value = condition.operands[0].value;
						}

						conditionIf = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							showLabel: true,
							label: Liferay.Language.get('if'),
							options: instance.get('fields'),
							visible: true,
							fieldName: index + '-condition-first-operand',
							value: value
						});

						instance._conditions[index + '-condition-first-operand'] = conditionIf;

						return conditionIf;
					},

					_createOperatorField: function(index, condition) {
						var instance = this;

						var conditionOperator;

						var value;

						if (condition) {
							value = condition['operator'];
						}

						conditionOperator = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							showLabel: true,
							label: Liferay.Language.get('state'),
							options: textOperators,
							visible: true,
							fieldName: index + '-condition-operator',
							value: value
						});

						instance._conditions[index + '-condition-operator'] = conditionOperator;

						return conditionOperator;
					},

					_createSecondOperandTypeField: function(index, condition) {
						var instance = this;

						var conditionThe;

						var value;
//aeeeee
						if (condition) {
							value = condition.operands[1].type;
						}

						conditionThe = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							showLabel: true,
							label: Liferay.Language.get('the'),
							options: [
								{
									label: Liferay.Language.get('value'),
									value: 'constant'
								},
								{
									label: Liferay.Language.get('other-field'),
									value: 'field'
								}
							],
							fieldName: index + '-condition-second-operand-type',
							value: value,
							visible: false
						});

						instance._conditions[index + '-condition-second-operand-type'] = conditionThe;

						return conditionThe;
					},

					_createSecondOperandSelectElementField: function(index, condition) {
						var instance = this;

						var conditionType;

						var value;

						if (condition) {
							value = condition.operands[1].value;
						}

						conditionType = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							fieldName: index + '-condition-second-operand-select',
							options: instance.get('fields'),
							showLabel: false,
							value: value,
							visible: false
						});

						instance._conditions[index + '-condition-second-operand-select'] = conditionType;

						return conditionType;
					},

					_createSecondOperandSelectOptionsField: function(index, condition) {
						var instance = this;

						var conditionType;

						var value;

						if (condition) {
							value = condition.operands[1].value;
						}

						conditionType = new Liferay.DDM.Field.Select({
							bubbleTargets: [instance],
							fieldName: index + '-condition-second-operand-options-select',
							showLabel: false,
							value: value,
							visible: false
						});

						instance._conditions[index + '-condition-second-operand-options-select'] = conditionType;

						return conditionType;
					},

					_createSecondOperandInputField: function(index, condition) {
						var instance = this;

						var conditionType;

						var value;

						if (condition) {
							value = condition.operands[1].value;
						}

						conditionType = new Liferay.DDM.Field.Text({
							bubbleTargets: [instance],
							strings: {},
							options: [],
							fieldName: index + '-condition-second-operand-input',
							showLabel: false,
							value: value,
							visible: false
						});

						instance._conditions[index + '-condition-second-operand-input'] = conditionType;

						return conditionType;
					},

					_isUnaryCondition: function(index) {
						var instance = this;

						var value = instance._conditions[index + '-condition-operator'].getValue();

						return value === 'is-email-address' || value === 'is-url';
					},

					_getRuleContainerTemplate: function(rule) {
						var instance = this;

						var ruleSettingsContainer;

						ruleSettingsContainer = ddl.rule.settings({
							actions: rule ? rule.actions : [],
							cancelLabel: Liferay.Language.get('cancel'),
							conditions: rule ? rule.conditions : [],
							deleteIcon: Liferay.Util.getLexiconIconTpl('trash', 'icon-monospaced'),
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

					_getActions: function() {
					},

					_getConditions: function() {
						var instance = this;

						var conditions = [];

						for (var i = 0; i < instance._conditionsQuant; i++) {
							var condition = {
								'logic-operator': 'OR',
								'operands': [
									{
										type: 'field',
										value: instance._conditions[i + '-condition-first-operand'].getValue()
									}
								],
								operator: instance._conditions[i + '-condition-operator'].getValue()
							};

							if (instance._conditions[i + '-condition-second-operand-type'].get('visible')) {
								if (instance._conditions[i + '-condition-second-operand-type'].getValue() === 'constant') {
									condition.operands.push({
										type: 'constant',
										value: instance._conditions[i + '-condition-second-operand-input'].getValue() ||
											instance._conditions[i + '-condition-second-operand-options-select'].getValue()
									});
								}
								else {
									condition.operands.push({
										type: 'field',
										value: instance._conditions[i + '-condition-second-operand-select'].getValue()
									});
								}
							}

							conditions.push(condition);
						}

						return conditions;
					},

					_handleAddActionClick: function() {},

					_setConditionSecondOperandVisibility: function(index) {
						var instance = this;

						if (instance._conditions[index + '-condition-second-operand-type'].get('visible')) {
							if (instance._conditions[index + '-condition-second-operand-type'].get('value') === 'value') {
								if (instance._conditions[index + '-condition-first-operand'].get('options') &&
									instance._conditions[index + '-condition-first-operand'].get('type') !== 'text') {

								}
							}
							else {
								instance._conditions[index + '-condition-second-operand-select'].set('visible', true);
								instance._conditions[index + '-condition-second-operand-input'].set('visible', false);
							}
						}
					},

					_handleSelectValueChanged: function(event) {
						var instance = this;

						var field = event.field;

						var condition = field.get('fieldName');

						var index = field.get('fieldName').split('-')[0];

						if (condition.match('-condition-operator')) {
							if (instance._isUnaryCondition(index)) {//field.getValue() === 'is-email-address' || field.getValue() === 'is-url') {
								instance._conditions[index + '-condition-second-operand-type'].set('value', null);
								instance._conditions[index + '-condition-second-operand-type'].set('visible', false);

								instance._hideSecondOperandField(index);

								instance._conditions[index + '-condition-second-operand-select'].set('value', null);
								instance._conditions[index + '-condition-second-operand-input'].set('value', null);
								instance._conditions[index + '-condition-second-operand-options-select'].set('value', null);
							}
							else {
								instance._conditions[index + '-condition-second-operand-type'].set('visible', true);
							}
						}
						else if (condition.match('-condition-second-operand-type')) {
							instance._conditions[index + '-condition-second-operand-select'].set('value', null);
							instance._conditions[index + '-condition-second-operand-input'].set('value', null);
							instance._conditions[index + '-condition-second-operand-options-select'].set('value', null);
							if (field.getValue() === 'field') {
								instance._hideSecondOperandField(index);

								instance._conditions[index + '-condition-second-operand-select'].set('visible', true);
							}
							else {//constant
								if (instance._getFieldOptions(instance._conditions[index + '-condition-first-operand'].getValue()).length > 0 &&
									instance._conditions[index + '-condition-first-operand'].get('type') !== 'text') {
									instance._hideSecondOperandField(index);

									instance._conditions[index + '-condition-second-operand-options-select'].set('options', 
										instance._getFieldOptions(instance._conditions[index + '-condition-first-operand'].getValue()));

									instance._conditions[index + '-condition-second-operand-options-select'].set('visible', true);
								}
								else {
									instance._hideSecondOperandField(index);

									instance._conditions[index + '-condition-second-operand-input'].set('visible', true);
								}
							}
						}
					},

					_hideSecondOperandField: function(index) {
						var instance = this;

						// instance._conditions[index + '-condition-second-operand-select'].set('value', null);
						// instance._conditions[index + '-condition-second-operand-input'].set('value', null);
						// instance._conditions[index + '-condition-second-operand-options-select'].set('value', null);

						instance._conditions[index + '-condition-second-operand-select'].set('visible', false);
						instance._conditions[index + '-condition-second-operand-input'].set('visible', false);
						instance._conditions[index + '-condition-second-operand-options-select'].set('visible', false);
					},

					_getFieldOptions: function(fieldName) {
						var instance = this;

						var fields = instance.get('fields');

						var options = [];

						for (var i = 0; i < fields.length; i++) {
							if (fields[i].label === fieldName) {
								options = fields[i].options;

								break;
							}
						}

						return options;
					},

					_handleAddConditionClick: function() {
						var instance = this;

						var conditionListNode = instance.get('contentBox').one('.form-builder-rule-condition-list');

						conditionListNode.append(ddl.rule.condition({
							index: instance._conditionsQuant,
							deleteIcon: Liferay.Util.getLexiconIconTpl('trash', 'icon-monospaced')
						}));

						instance._addCondition(instance._conditionsQuant);
					},

					_handleCancelClick: function() {
						var instance = this;

						instance.fire('cancelRule');
					},

					_handleDeleteConditionClick: function(event) {
						var instance = this;

						var index = event.currentTarget.getData('card-id');

						if (instance._conditionsQuant > 1) {
							event.currentTarget.ancestor('.form-builder-rule-condition-container').hide();

							delete instance._conditions[index + '-condition-first-operand'];
							delete instance._conditions[index + '-condition-operator'];
							delete instance._conditions[index + '-condition-second-operand-type'];
							delete instance._conditions[index + '-condition-second-operand-select'];
							delete instance._conditions[index + '-condition-second-operand-input'];

							instance._conditionsQuant--;
						}
					},

					_handleDeleteActionClick: function(event) {
						var instance = this;

						var index = event.currentTarget.getData('card-id');

						if (instance._actionsQuant > 1) {
							event.currentTarget.ancestor('.form-builder-rule-action-container').hide();

							delete instance._actions[index + '-action-ble'];
							delete instance._actions[index + '-action-bla'];

							instance._actionsQuant--;
						}
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