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
  var ruleList169 = opt_data.rules;
  var ruleListLen169 = ruleList169.length;
  if (ruleListLen169 > 0) {
    for (var ruleIndex169 = 0; ruleIndex169 < ruleListLen169; ruleIndex169++) {
      var ruleData169 = ruleList169[ruleIndex169];
      output += '<li class="list-group-item"><div class="list-group-item-field"><h4 class="form-builder-rule-builder-rules-list-type text-left">' + soy.$$escapeHtml(ruleData169['logical-operator']) + '</h4></div><div class="clamp-horizontal list-group-item-content"><p class="text-default">If ' + ddl.condition({content: ruleData169.conditions[0].operands[0].type + ' ' + ruleData169.conditions[0].operands[0].value}) + '<em> is ' + soy.$$escapeHtml(ruleData169.conditions[0].operator) + ' </em>,' + ddl.condition({content: ruleData169.conditions[0].operands[1].type + ' ' + ruleData169.conditions[0].operands[1].value}) + '<br />' + ddl.action({rule: ruleData169}) + '</p></div><div class="list-group-item-field"><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="rule-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex169) + '"><a href="javascript:;">' + soy.$$escapeHtml(opt_data.strings.edit) + '</a></li><li class="rule-card-delete" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex169) + '"><a href="javascript:;">' + soy.$$escapeHtml(opt_data.strings['delete']) + '</a></li></ul></div></div></div></li>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.strings.emptyListText);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}
