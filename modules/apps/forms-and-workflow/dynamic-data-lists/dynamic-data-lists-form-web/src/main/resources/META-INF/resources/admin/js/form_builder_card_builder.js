AUI.add(
	'liferay-ddl-form-builder-rule-builder',
	function(A) {
			var TPL_POPOVER = '<ul class="dropdown-menu">' +
					'<li>' +
						'<a href="javascript:;" data-rule-type="autocomplete">' + Liferay.Language.get('autocomplete') + '</a>' +
					'</li>' +
				'</ul>';

		var FormBuilderRuleBuilder = A.Component.create(
			{
				ATTRS: {},

				AUGMENTS: [],

				NAME: 'liferay-ddl-form-builder-rule-builder',

				prototype: {
					renderUI: function() {
						var instance = this;

						instance.get('contentBox').setHTML(ddl.rule_builder({addRuleLabel: Liferay.Language.get('add-rule')}));


						instance._renderRule(instance.get('rules'));
					},

					bindUI: function() {
						var instance = this;

						var contentBox = instance.get('contentBox');

						instance.one('#rulesToggler').on('click', function(){console.log('ae');});
						instance.on('*:saveRule', A.bind(instance._handleSaveRule, instance));
						instance.on('*:cancelRule', A.bind(instance._handleCancelRule, instance));

						contentBox.delegate('click', A.bind(instance._handleEditCardClick, instance), '.rule-card-edit');
					},

					_handleCancelRule: function(event) {
						var instance = this;

						instance._showRuleList();
					},

					_handleEditCardClick: function(event) {
						console.log(event.currentTarget, event.target);
					},

					_handleSaveRule: function(event) {
						var instance = this;

						// fire save card
					},

					_renderRule: function(rules) {
						var instance = this;

						var rulesList = instance.get('contentBox').one('.form-builder-rule-builder-rules-list');

						var emptyListText = Liferay.Language.get('there-are-no-rules-yet-click-on-plus-icon-bellow-to-add-the-first');

						rulesList.setHTML(ddl.rule_list({rules: rules, emptyListText: emptyListText, kebab: Liferay.Util.getLexiconIconTpl('ellipsis-v', 'icon-monospaced')}));
					},

					_onRulesChange: function(val) {
						var instance = this;

						instance._renderRule(val.newVal);
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