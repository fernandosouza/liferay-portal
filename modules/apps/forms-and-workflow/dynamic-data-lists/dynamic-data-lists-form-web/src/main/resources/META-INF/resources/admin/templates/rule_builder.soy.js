// This file was automatically generated from rule_builder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }


ddl.rule_builder = function(opt_data, opt_ignored) {
  return '<div class="form-builder-rule-builder-container"><h1 class="form-builder-section-title text-default">Rules Builder</h1><div class="liferay-ddl-form-rule-rules-list-container"></div><div class="form-builder-rule-builder-add-rule-container"><div class="btn-action-secondary btn-bottom-right dropdown form-builder-rule-builder-add-rule-button"><button class="btn btn-primary form-builder-rule-builder-add-rule-button-icon" type="button">' + soy.$$filterNoAutoescape(opt_data.plusIcon) + '</button></div></div></div><div class="form-builder-rule-settings-container"></div>';
};
if (goog.DEBUG) {
  ddl.rule_builder.soyTemplateName = 'ddl.rule_builder';
}


ddl.rule_list = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.rules.length > 0) {
    output += '<ul class="ddl-form-body-content liferay-ddl-form-rule-rules-list tabular-list-group">';
    var ruleList138 = opt_data.rules;
    var ruleListLen138 = ruleList138.length;
    for (var ruleIndex138 = 0; ruleIndex138 < ruleListLen138; ruleIndex138++) {
      var ruleData138 = ruleList138[ruleIndex138];
      output += '<li class="list-group-item"><div class="list-group-item-field"><h4 class="liferay-ddl-form-rule-rules-list-type text-left">' + soy.$$escapeHtml(ruleData138.type) + '</h4></div><div class="clamp-horizontal list-group-item-content"><p class="text-default">If ' + ddl.condition({content: ruleData138.conditions[0].operands[0].type + ' ' + ruleData138.conditions[0].operands[0].value}) + '<em> is ' + soy.$$escapeHtml(ruleData138.conditions[0].operator) + ', </em>' + ddl.condition({content: ruleData138.conditions[0].operands[1].value}) + '<br />' + ddl.action({rule: ruleData138}) + '</p></div><div class="list-group-item-field"><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="#1">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="rule-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex138) + '" data-rule-type=' + soy.$$escapeHtmlAttributeNospace(ruleData138.type) + '><a href="javascript:;">Edit</a></li><li class="rule-card-delete"  data-card-id="' + soy.$$escapeHtmlAttribute(ruleIndex138) + '"><a href="javascript:;">Delete</a></li></ul></div></div></div></li>';
    }
    output += '</ul>';
  } else {
    output += ddl.empty_list({message: opt_data.emptyListText});
  }
  return output;
};
if (goog.DEBUG) {
  ddl.rule_list.soyTemplateName = 'ddl.rule_list';
}


ddl.empty_list = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="main-content-body"><div class="card main-content-card taglib-empty-result-message"><div class="card-row card-row-padded"><div class="taglib-empty-result-message-header-has-plus-btn"></div>' + ((opt_data.message) ? '<div class="text-center text-muted"><p class="text-default">' + soy.$$escapeHtml(opt_data.message) + '</p></div>' : '') + '</div></div></div>';
};
if (goog.DEBUG) {
  ddl.empty_list.soyTemplateName = 'ddl.empty_list';
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
