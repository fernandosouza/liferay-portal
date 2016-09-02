AUI.add(
	'liferay-ddl-form-builder-rule-builder',
	function(A) {
			var TPL_POPOVER = '<ul class="dropdown-menu">' +
					'<li>' +
						'<a href="javascript:;" data-rule-type="visibility">' + Liferay.Language.get('visibility') + '</a>' +
					'</li>' +
				'</ul>';

		var FormBuilderRuleBuilder = A.Component.create(
			{
				ATTRS: {
					formBuilder: {
						value: null
					},
					rules: {
						value: []
					}
				},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-rule-builder',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._ruleClasses = {};
					},

					renderUI: function() {
						var instance = this;

						var rulesBuilder = ddl.rule_builder({
							plusIcon: Liferay.Util.getLexiconIconTpl('plus', 'icon-monospaced')
						})

						instance.get('contentBox').setHTML(rulesBuilder);

						instance._renderPopover();

						instance._renderRules(instance.get('rules'));
					},

					bindUI: function() {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance.on('rulesChange', A.bind(instance._onRulesChange, instance));
						instance.on('*:saveRule', A.bind(instance._handleSaveRule, instance));
						instance.on('*:cancelRule', A.bind(instance._handleCancelRule, instance));

						contentBox.delegate('click', A.bind(instance._handleEditCardClick, instance), '.rule-card-edit');
						contentBox.delegate('click', A.bind(instance._handleDeleteCardClick, instance), '.rule-card-delete');
					},

					getFields: function() {
						var instance = this;

						var fields = [];

						instance.get('formBuilder').eachFields(function(field) {
							fields.push({
								label: field.get('label'),
								value: field.get('fieldName'),
								options: field.get('options')
							});
						});

						return fields;
					},

					_renderRuleSettings: function(ruleType, rule) {
						var instance = this;

						var ruleClassInstance = instance._ruleClasses[ruleType];

						if (!ruleClassInstance) {
							ruleClassInstance = new Liferay.DDL.Rules[ruleType]({
								boundingBox: instance.get('contentBox').one('.form-builder-rule-settings-container'),
								bubbleTargets: [instance],
								fields: instance.getFields()
							}).render();

							instance._ruleClasses[ruleType] = ruleClassInstance;
						}

						if (rule) {
							ruleClassInstance.renderRule(rule);
						}
						else {
							ruleClassInstance.renderRule({conditions: [], actions: []});
						}
					},

					_handlePopoverClick: function(event) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.one('.form-builder-rule-builder-container').hide();

						instance._renderRuleSettings(event.currentTarget.getData('rule-type'));

						contentBox.one('.form-builder-rule-settings-container').show();
					},

					_handleCancelRule: function(event) {
						var instance = this;

						instance._showRuleList();
					},

					_handleEditCardClick: function(event) {
						var instance = this;

						var contentBox = instance.get('contentBox');

						var target = event.currentTarget;

						var ruleId = target.getData('card-id');

						var ruleType = target.getData('rule-type').toLowerCase();

						contentBox.one('.form-builder-rule-builder-container').hide();

						instance._editingField = ruleId;

						instance._renderRuleSettings(ruleType, instance.get('rules')[ruleId]);

						contentBox.one('.form-builder-rule-settings-container').show();
					},

					_handleDeleteCardClick: function(event) {
						var instance = this;

						var rules = instance.get('rules');

						rules.splice(event.currentTarget.getData('card-id'), 1);

						instance.set('rules', rules);
					},

					_handleSaveRule: function(event) {
						var instance = this;

						var rules = instance.get('rules');

						var rule = {
							actions: event.actions,
							conditions: event.condition,
							type: event.type
						};

						if (instance._editingField) {
							rules[instance._editingField] = rule;
						}
						else {
							rules.push(rule);
						}

						instance.set('rules', rules);

						instance._editingField = false;

						instance._showRuleList();
					},

					_renderPopover: function() {
						var instance = this;

						var popover = new A.Popover({
							align: {
								node: '.form-builder-rule-builder-add-rule-button'
							},
							cssClass: 'form-builder-rulles-builder-popover',
							animated: true,
							bodyContent: TPL_POPOVER,
							constrain: true,
							duration: 0.25,
							trigger: '.form-builder-rule-builder-add-rule-button',
							position: 'top',
							zIndex: Liferay.zIndex.TOOLTIP,
							visible: false,
							hideOn: [{
								node: A.one(document),
								eventName: 'click'
							}]
						}).render();

						popover.get('contentBox').delegate('click', A.bind(instance._handlePopoverClick, instance), 'a');
					},

					_renderRules: function(rules) {
						var instance = this;

						var rulesList = instance.get('contentBox').one('.form-builder-rule-builder-rules-list');

						var emptyListText = Liferay.Language.get('there-are-no-rules-yet-click-on-plus-icon-bellow-to-add-the-first');

						rulesList.setHTML(ddl.rule_list({rules: rules, emptyListText: emptyListText, kebab: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced')}));
					},

					_showRuleList: function() {
						var instance = this;

						var contentBox = instance.get('contentBox');

						contentBox.one('.form-builder-rule-builder-container').show();
						contentBox.one('.form-builder-rule-settings-container').hide();
					},

					_onRulesChange: function(val) {
						var instance = this;

						instance._renderRules(val.newVal);
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderRuleBuilder = FormBuilderRuleBuilder;
	},
	'',
	{
		requires: ['aui-popover', 'event-outside', 'liferay-ddl-form-builder-rule']
	}
);