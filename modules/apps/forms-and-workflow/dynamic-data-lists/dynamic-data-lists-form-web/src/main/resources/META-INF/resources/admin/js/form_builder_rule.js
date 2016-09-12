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
					logicOperator: {
						value: 'OR'
					},
					title: {
						value: ''
					},
					type: {
						value: 'RULE'
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

						var contentBox = instance.get('contentBox');

						contentBox.delegate('click', A.bind(instance._handleSaveClick, instance), '.form-builder-rule-settings-save');
						contentBox.delegate('click', A.bind(instance._handleCancelClick, instance), '.form-builder-rule-settings-cancel');

						contentBox.delegate('click', A.bind(instance._handleDeleteConditionClick, instance), '.condition-card-delete');
						contentBox.delegate('click', A.bind(instance._handleDeleteActionClick, instance), '.action-card-delete');

						contentBox.delegate('click', A.bind(instance._handleAddConditionClick, instance), '.form-builder-rule-add-condition');
						contentBox.delegate('click', A.bind(instance._handleAddActionClick, instance), '.form-builder-rule-add-action');

						instance.on('*:valueChanged', A.bind(instance._handleFieldValueChanged, instance));
					},

					renderRule: function(rule) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.setHTML(instance._getRuleContainerTemplate(rule));

						instance._conditionsIndexes = [];
						instance._actionsIndexes = [];

						instance._renderConditions(rule.conditions);
						instance._renderActions(rule.actions);
					},

					_addCondition: function(index, condition) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance._renderFirstOperand(index, condition, contentBox.one('.condition-if-' + index));
						instance._renderOperator(index, condition, contentBox.one('.condition-operator-' + index));
						instance._renderSecondOperandType(index, condition, contentBox.one('.condition-the-' + index));
						instance._renderSecondOperandInput(index, condition, contentBox.one('.condition-type-value-' + index));
						instance._renderSecondOperandSelectField(index, condition, contentBox.one('.condition-type-value-' + index));
						instance._renderSecondOperandSelectOptions(index, condition, contentBox.one('.condition-type-value-options-' + index));

						instance._conditionsIndexes.push(Number(index));
					},

					_getActions: function() {
					},

					_getConditions: function() {
						var instance = this;

						var conditions = [];

						for (var i = instance._conditionsIndexes.length - 1; i >= 0; i--) {
							var index = instance._conditionsIndexes[i];

							var condition = {
								'operands': [
									{
										type: 'field',
										value: instance._getFirstOperandValue(index)
									}
								],
								operator: instance._getOperatorValue(index)
							};

							if (index > 0) {
								condition['logic-operator'] = instance.get('logicOperator');
							}
							if (instance._getSecondOperandType(index).get('visible')) {
								if (instance._getSecondOperandTypeValue(index) === 'constant') {
									condition.operands.push(
										{
											type: 'constant',
											value: instance._getSecondOperandValue(index, 'input') || instance._getSecondOperandValue(index, 'fields')
										}
									);
								}
								else {
									condition.operands.push(
										{
											type: 'field',
											value: instance._getSecondOperandValue(index, 'fields')
										}
									);
								}
							}

							conditions.push(condition);
						}

						return conditions;
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

					_getFirstOperand: function(index) {
						var instance = this;

						return instance._conditions[index + '-condition-first-operand'];
					},

					_getFirstOperandValue: function(index) {
						var instance = this;

						return instance._getFirstOperand(index).getValue();
					},

					_getOperator: function(index) {
						var instance = this;

						return instance._conditions[index + '-condition-operator'];
					},

					_getOperatorValue: function(index) {
						var instance = this;

						return instance._getOperator(index).getValue();
					},

					_getRuleContainerTemplate: function(rule) {
						var instance = this;

						var ruleSettingsContainer;

						ruleSettingsContainer = ddl.rule.settings(
							{
								actions: rule ? rule.actions : [],
								cancelLabel: Liferay.Language.get('cancel'),
								conditions: rule ? rule.conditions : [],
								deleteIcon: Liferay.Util.getLexiconIconTpl('trash', 'icon-monospaced'),
								saveLabel: Liferay.Language.get('save')
							}
						);

						return ruleSettingsContainer;
					},

					_getSecondOperand: function(index, type) {
						var instance = this;

						switch (type) {
							case 'fields':
								return instance._conditions[index + '-condition-second-operand-select'];
							case 'options':
								return instance._conditions[index + '-condition-second-operand-options-select'];
							default:
								return instance._conditions[index + '-condition-second-operand-input'];
						}
					},

					_getSecondOperandType: function(index) {
						var instance = this;

						return instance._conditions[index + '-condition-second-operand-type'];
					},

					_getSecondOperandTypeValue: function(index) {
						var instance = this;

						return instance._getSecondOperandType(index).getValue();
					},

					_getSecondOperandValue: function(index) {
						var instance = this;

						return instance._getSecondOperand(index).getValue();
					},

					_handleAddActionClick: function() {},

					_handleAddConditionClick: function() {
						var instance = this;

						var conditionListNode = instance.get('contentBox').one('.form-builder-rule-condition-list');

						var index = instance._conditionsIndexes[instance._conditionsIndexes.length - 1] + 1;

						conditionListNode.append(
							ddl.rule.condition(
								{
									deleteIcon: Liferay.Util.getLexiconIconTpl('trash', 'icon-monospaced'),
									index: index
								}
							)
						);

						instance._addCondition(index);
					},

					_handleCancelClick: function() {
						var instance = this;

						instance.fire(
							'cancelRule'
						);
					},

					_handleDeleteActionClick: function(event) {
						var instance = this;

						var index = event.currentTarget.getData('card-id');

						if (instance.instance._actionsIndexes.length > 1) {
							instance._actions[index + '-action-do'].destroy();
							instance._actions[index + '-action-the'].destroy();

							delete instance._actions[index + '-action-do'];
							delete instance._actions[index + '-action-the'];

							instance.get('contentBox').one('.form-builder-rule-action-container-' + index).remove(true);

							var actionIndex = instance._actionsIndexes.indexOf(Number(index));

							if (actionIndex > -1) {
								instance._actionsIndexes.splice(actionIndex, 1);
							}
						}
					},

					_handleDeleteConditionClick: function(event) {
						var instance = this;

						var index = event.currentTarget.getData('card-id');

						if (instance._conditionsIndexes.length > 1) {
							instance._conditions[index + '-condition-first-operand'].destroy();
							instance._conditions[index + '-condition-operator'].destroy();
							instance._conditions[index + '-condition-second-operand-type'].destroy();
							instance._conditions[index + '-condition-second-operand-select'].destroy();
							instance._conditions[index + '-condition-second-operand-input'].destroy();

							delete instance._conditions[index + '-condition-first-operand'];
							delete instance._conditions[index + '-condition-operator'];
							delete instance._conditions[index + '-condition-second-operand-type'];
							delete instance._conditions[index + '-condition-second-operand-select'];
							delete instance._conditions[index + '-condition-second-operand-input'];

							instance.get('contentBox').one('.form-builder-rule-condition-container-' + index).remove(true);

							var conditionIndex = instance._conditionsIndexes.indexOf(Number(index));

							if (conditionIndex > -1) {
								instance._conditionsIndexes.splice(conditionIndex, 1);
							}
						}
					},

					_handleFieldValueChanged: function(event) {
						var instance = this;

						var field = event.field;

						var condition = field.get('fieldName');

						var index = field.get('fieldName').split('-')[0];

						if (condition.match('-condition-first-operand')) {
							instance._updateSecondOperandFieldVisibility(index);
						}
						else if (condition.match('-condition-operator')) {
							instance._updateTypeFieldVisibility(index);
							instance._updateSecondOperandFieldVisibility(index);
						}
						else if (condition.match('-condition-second-operand-type')) {
							instance._updateSecondOperandFieldVisibility(index);
						}
					},

					_handleSaveClick: function() {
						var instance = this;

						instance.fire(
							'saveRule',
							{
								actions: instance._getActions(),
								condition: instance._getConditions(),
								type: instance.get('type')
							}
						);
					},

					_hideSecondOperandField: function(index) {
						var instance = this;

						instance._getSecondOperand(index, 'fields').set('visible', false);
						instance._getSecondOperand(index, 'options').set('visible', false);
						instance._getSecondOperand(index, 'input').set('visible', false);
					},

					_isBinaryCondition: function(index) {
						var instance = this;

						var value = instance._getOperatorValue(index);

						return value === 'equals-to' || value === 'not-equals-to' || value === 'contains' || value === 'not-contains';
					},

					_isUnaryCondition: function(index) {
						var instance = this;

						var value = instance._getOperatorValue(index);

						return value === 'is-email-address' || value === 'is-url';
					},

					_renderActions: function() {

					},

					_renderConditions: function(conditions) {
						var instance = this;

						var conditionsQuant = conditions.length;

						for (var i = 0; i < conditionsQuant; i++) {
							instance._addCondition(i, conditions[i]);
						}

						if (instance._conditionsIndexes.length === 0) {
							instance._addCondition(0);
						}
					},

					_renderFirstOperand: function(index, condition, container) {
						var instance = this;

						var value;

						if (condition) {
							value = condition.operands[0].value;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								bubbleTargets: [instance],
								fieldName: index + '-condition-first-operand',
								label: Liferay.Language.get('if'),
								options: instance.get('fields'),
								showLabel: true,
								value: value,
								visible: true
							}
						);

						field.render(container);

						instance._conditions[index + '-condition-first-operand'] = field;
					},

					_renderOperator: function(index, condition, container) {
						var instance = this;

						var value;

						if (condition) {
							value = condition.operator;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								bubbleTargets: [instance],
								fieldName: index + '-condition-operator',
								label: Liferay.Language.get('state'),
								options: textOperators,
								showLabel: true,
								value: value,
								visible: true
							}
						);

						field.render(container);

						instance._conditions[index + '-condition-operator'] = field;
					},

					_renderSecondOperandInput: function(index, condition, container) {
						var instance = this;

						var value;

						if (condition && instance._isBinaryCondition(index)) {
							value = condition.operands[1].value;
						}

						var field = new Liferay.DDM.Field.Text(
							{
								bubbleTargets: [instance],
								fieldName: index + '-condition-second-operand-input',
								options: [],
								showLabel: false,
								strings: {},
								value: value,
								visible: instance._getSecondOperandTypeValue(index) === 'constant' &&
									(instance._getFirstOperand(index).get('type') === 'text' ||
									!!instance._getFieldOptions(instance._getFirstOperandValue(index)))
							}
						);

						field.render(container);

						instance._conditions[index + '-condition-second-operand-input'] = field;
					},

					_renderSecondOperandSelectField: function(index, condition, container) {
						var instance = this;

						var value;

						if (condition && instance._isBinaryCondition(index)) {
							value = condition.operands[1].value;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								bubbleTargets: [instance],
								fieldName: index + '-condition-second-operand-select',
								options: instance.get('fields'),
								showLabel: false,
								value: value,
								visible: instance._getSecondOperandTypeValue(index) === 'other-field'
							}
						);

						field.render(container);

						instance._conditions[index + '-condition-second-operand-select'] = field;
					},

					_renderSecondOperandSelectOptions: function(index, condition, container) {
						var instance = this;

						var value;

						if (condition && instance._isBinaryCondition(index)) {
							value = condition.operands[1].value;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								bubbleTargets: [instance],
								fieldName: index + '-condition-second-operand-options-select',
								showLabel: false,
								value: value,
								visible: instance._getSecondOperandTypeValue(index) === 'constant' &&
									instance._getFieldOptions(instance._getFirstOperandValue(index)).length > 0 &&
									instance._getFirstOperand(index).get('type') !== 'text'
							}
						);

						field.render(container);

						instance._conditions[index + '-condition-second-operand-options-select'] = field;
					},

					_renderSecondOperandType: function(index, condition, container) {
						var instance = this;

						var value;

						if (condition && instance._isBinaryCondition(index)) {
							value = condition.operands[1].type;
						}

						var field = new Liferay.DDM.Field.Select(
							{
								bubbleTargets: [instance],
								fieldName: index + '-condition-second-operand-type',
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
								showLabel: true,
								value: value,
								visible: instance._isBinaryCondition(index)
							}
						);

						field.render(container);

						instance._conditions[index + '-condition-second-operand-type'] = field;
					},

					_updateSecondOperandFieldVisibility: function(index) {
						var instance = this;

						instance._hideSecondOperandField(index);

						if (instance._getSecondOperandType(index).get('visible') && instance._getSecondOperandTypeValue(index)) {
							if (instance._getSecondOperandTypeValue(index) === 'field') {
								instance._getSecondOperand(index, 'fields').set('visible', true);

								instance._getSecondOperand(index, 'options').cleanSelect();
							}
							else {
								var options = instance._getFieldOptions(instance._getFirstOperandValue(index));

								if (options.length > 0 && instance._getFirstOperand(index).get('type') !== 'text') {
									instance._getSecondOperand(index, 'options').set('options', options);
									instance._getSecondOperand(index, 'options').set('visible', true);

									instance._getSecondOperand(index, 'fields').cleanSelect();
								}
								else {
									instance._getSecondOperand(index, 'input').set('visible', true);

									instance._getSecondOperand(index, 'fields').cleanSelect();
									instance._getSecondOperand(index, 'options').cleanSelect();
								}
							}
						}
					},

					_updateTypeFieldVisibility: function(index) {
						var instance = this;

						if (instance._getFirstOperandValue(index) && instance._getOperatorValue(index) && !instance._isUnaryCondition(index)) {
							instance._getSecondOperandType(index).set('visible', true);
						}
						else {
							instance._getSecondOperand(index, 'fields').set('value', '');
							instance._getSecondOperandType(index).set('visible', false);
						}
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