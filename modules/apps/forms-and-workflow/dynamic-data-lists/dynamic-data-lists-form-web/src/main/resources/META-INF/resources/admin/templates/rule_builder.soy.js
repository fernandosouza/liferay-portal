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
  var ruleList102 = opt_data.rules;
  var ruleListLen102 = ruleList102.length;
  if (ruleListLen102 > 0) {
    for (var ruleIndex102 = 0; ruleIndex102 < ruleListLen102; ruleIndex102++) {
      var ruleData102 = ruleList102[ruleIndex102];
      output += '<div class="card card-horizontal card-rule"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><h4>' + soy.$$escapeHtml(ruleData102.type) + '</h4><p>' + soy.$$escapeHtml(ruleData102.description) + '</p></div><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="rule-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex102) + '" data-rule-type=' + soy.$$escapeHtmlAttributeNospace(ruleData102.type) + '><a href="javascript:;">Edit</a></li><li class="rule-card-delete"  data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex102) + '"><a href="javascript:;">Delete</a></li></ul></div></div></div></div>';
    }
  } else {
    output += soy.$$escapeHtml(opt_data.emptyListText);
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}
