// This file was automatically generated from rule_builder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rule_builder = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rule-builder-container"><h1 class="text-default form-builder-section-title">Rules Builder</h1><ul class="ddl-form-body-content liferay-ddl-form-rule-rules-list tabular-list-group"></ul><div class="form-builder-rule-builder-add-rule-container"><div class="btn-action-secondary btn-bottom-right form-builder-rule-builder-add-rule-button dropdown"><button class="btn btn-primary form-builder-rule-builder-add-rule-button-icon" type="button">' + soy.$$filterNoAutoescape(opt_data.plusIcon) + '</button></div></div></div><div class="form-builder-rule-settings-container"></div>';
};
if (goog.DEBUG) {
  ddl.rule_builder.soyTemplateName = 'ddl.rule_builder';
}


ddl.rule_list = function(opt_data, opt_ignored) {
  var output = '';
  var ruleList146 = opt_data.rules;
  var ruleListLen146 = ruleList146.length;
  if (ruleListLen146 > 0) {
    for (var ruleIndex146 = 0; ruleIndex146 < ruleListLen146; ruleIndex146++) {
      var ruleData146 = ruleList146[ruleIndex146];
      output += '<li class="list-group-item"><div class="list-group-item-field"><h4 class="liferay-ddl-form-rule-rules-list-type text-left">' + soy.$$escapeHtml(ruleData146.type) + '</h4></div><div class="clamp-horizontal list-group-item-content"><p class="text-default">If ' + ddl.condition({content: ruleData146.conditions[0].operands[0].type + ' ' + ruleData146.conditions[0].operands[0].value}) + '<em> is ' + soy.$$escapeHtml(ruleData146.conditions[0].operator) + ' </em>,' + ddl.condition({content: ruleData146.conditions[0].operands[1].type + ' ' + ruleData146.conditions[0].operands[1].value}) + '<br />' + ddl.action({rule: ruleData146}) + '</p></div><div class="list-group-item-field"><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="rule-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex146) + '" data-rule-type=' + soy.$$escapeHtmlAttributeNospace(ruleData146.type) + '><a href="javascript:;">Edit</a></li><li class="rule-card-delete"  data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex146) + '"><a href="javascript:;">Delete</a></li></ul></div></div></div></li>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.emptyListText);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}


ddl.badge = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<span class="badge badge-default badge-sm">' + soy.$$escapeHtml(opt_data.content) + '</span>';
};
if (goog.DEBUG) {
  ddl.badge.soyTemplateName = 'ddl.badge';
}


ddl.condition = function(opt_data, opt_ignored) {
  return '' + ddl.badge(opt_data);
};
if (goog.DEBUG) {
  ddl.condition.soyTemplateName = 'ddl.condition';
}


ddl.action = function(opt_data, opt_ignored) {
  return '<em>' + soy.$$escapeHtml(opt_data.rule.actions[0].action) + '</em> ' + ddl.badge({content: opt_data.rule.actions[0].target});
};
if (goog.DEBUG) {
  ddl.action.soyTemplateName = 'ddl.action';
}
