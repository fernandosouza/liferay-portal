// This file was automatically generated from rule_builder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rule_builder = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rule-builder-container"><h1 class="form-builder-section-title text-default">Rules Builder</h1><ul class="ddl-form-body-content form-builder-rule-builder-rules-list tabular-list-group"></ul><div class="form-builder-rule-builder-add-rule-container"><div class="btn-action-secondary btn-bottom-right dropdown form-builder-rule-builder-add-rule-button"><button class="btn btn-primary form-builder-rule-builder-add-rule-button-icon" type="button">' + soy.$$filterNoAutoescape(opt_data.plusIcon) + '</button></div></div></div>';
};
if (goog.DEBUG) {
  ddl.rule_builder.soyTemplateName = 'ddl.rule_builder';
}


ddl.rule_list = function(opt_data, opt_ignored) {
  var output = '';
  var ruleList161 = opt_data.rules;
  var ruleListLen161 = ruleList161.length;
  if (ruleListLen161 > 0) {
    for (var ruleIndex161 = 0; ruleIndex161 < ruleListLen161; ruleIndex161++) {
      var ruleData161 = ruleList161[ruleIndex161];
      output += '<li class="list-group-item"><div class="list-group-item-field"><h4 class="form-builder-rule-builder-rules-list-type text-left">' + soy.$$escapeHtml(ruleData161.type) + '</h4></div><div class="clamp-horizontal list-group-item-content"><p class="text-default">If ' + ddl.condition({content: ruleData161.conditions[0].operands[0].type + ' ' + ruleData161.conditions[0].operands[0].value}) + '<em> is ' + soy.$$escapeHtml(ruleData161.conditions[0].operator) + ' </em>,' + ddl.condition({content: ruleData161.conditions[0].operands[1].type + ' ' + ruleData161.conditions[0].operands[1].value}) + '<br />' + ddl.action({rule: ruleData161}) + '</p></div><div class="list-group-item-field"><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="rule-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex161) + '"><a href="javascript:;">Edit</a></li><li class="rule-card-delete" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex161) + '"><a href="javascript:;">Delete</a></li></ul></div></div></div></li>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.strings.emptyListText);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}


ddl.rule_types = function(opt_data, opt_ignored) {
  return '<ul class="dropdown-menu"><li><a href="javascript:;" data-rule-type="visibility">' + soy.$$escapeHtml(opt_data.strings.showHide) + '</a><a href="javascript:;" data-rule-type="readonly">' + soy.$$escapeHtml(opt_data.strings.enableDisable) + '</a><a href="javascript:;" data-rule-type="require">' + soy.$$escapeHtml(opt_data.strings.require) + '</a></li></ul>';
};
if (goog.DEBUG) {
  ddl.rule_types.soyTemplateName = 'ddl.rule_types';
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
