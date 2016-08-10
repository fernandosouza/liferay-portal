// This file was automatically generated from rule_builder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rule_builder = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rule-builder-container"><div class="form-builder-rule-builder-rules-list"></div><div class="form-builder-rule-builder-add-rule-container"><a class="btn form-builder-rule-builder-add-rule" href="javascript:;"><span class="form-builder-rule-builder-add-rule-button-icon">+</span><label class="form-builder-rule-builder-add-rule-button-label">' + soy.$$escapeHtml(opt_data.addRuleLabel) + '</label></a></div></div><div class="form-builder-rule-settings-container"></div>';
};
if (goog.DEBUG) {
  ddl.rule_builder.soyTemplateName = 'ddl.rule_builder';
}


ddl.rule_list = function(opt_data, opt_ignored) {
  var output = '';
  var ruleList86 = opt_data.rules;
  var ruleListLen86 = ruleList86.length;
  if (ruleListLen86 > 0) {
    for (var ruleIndex86 = 0; ruleIndex86 < ruleListLen86; ruleIndex86++) {
      var ruleData86 = ruleList86[ruleIndex86];
      output += '<div class="card card-horizontal card-rule"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><h4>' + soy.$$escapeHtml(ruleData86.type) + '</h4><p>' + soy.$$escapeHtml(ruleData86.description) + '</p></div><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="rule-card-edit" data-card-id=' + soy.$$escapeHtmlAttributeNospace(ruleData86.id) + '><a href="javascript:;">Edit</a></li><li class="rule-card-delete"  data-card-id=' + soy.$$escapeHtmlAttributeNospace(ruleData86.id) + '><a href="javascript:;">Delete</a></li></ul></div></div></div></div>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.emptyListText);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}
