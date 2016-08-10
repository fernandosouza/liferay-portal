// This file was automatically generated from rule.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.rule.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }
if (typeof ddl.rule == 'undefined') { ddl.rule = {}; }


ddl.rule.settings = function(opt_data, opt_ignored) {
  var output = '<div class="form-builder-rule-add-condition-container"><a class="btn form-builder-rule-add-condition" href="javascript:;"><span class="form-builder-rule-add-condition-button-icon">+</span></a></div><div class="form-builder-rule-add-action-container"><a class="btn form-builder-rule-add-action" href="javascript:;"><span class="form-builder-rule-add-action-button-icon">+</span></a></div><ul class="form-builder-rule-condition-list">';
  var conditionList34 = opt_data.conditions;
  var conditionListLen34 = conditionList34.length;
  if (conditionListLen34 > 0) {
    for (var conditionIndex34 = 0; conditionIndex34 < conditionListLen34; conditionIndex34++) {
      var conditionData34 = conditionList34[conditionIndex34];
      output += ddl.rule.condition(conditionIndex34);
    }
  } else {
    output += ddl.rule.condition({index: 0, kebab: opt_data.kebab});
  }
  output += '</ul><ul class="form-builder-rule-action-list">';
  var actionList42 = opt_data.actions;
  var actionListLen42 = actionList42.length;
  if (actionListLen42 > 0) {
    for (var actionIndex42 = 0; actionIndex42 < actionListLen42; actionIndex42++) {
      var actionData42 = actionList42[actionIndex42];
      output += ddl.rule.action(actionIndex42);
    }
  } else {
    output += ddl.rule.action({index: 0, kebab: opt_data.kebab});
  }
  output += '</ul><button class="btn btn-lg ddl-button btn-primary btn-default form-builder-rule-settings-save" type="button"><span class="form-builder-rule-settings-save-label">' + soy.$$escapeHtml(opt_data.saveLabel) + '</span></button><button class="btn btn-lg btn-cancel btn-default btn-link form-builder-rule-settings-cancel"><span class="lfr-btn-label">' + soy.$$escapeHtml(opt_data.cancelLabel) + '</span></button>';
  return output;
};
if (goog.DEBUG) {
  ddl.rule.settings.soyTemplateName = 'ddl.rule.settings';
}


ddl.rule.condition = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-condition-container"><div class="card card-condition card-horizontal"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><div class="condition-if-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-operator-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-type-value-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div></div><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="condition-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="javascript:;">Edit</a></li><li class="condition-card-delete"  data-card-id="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="javascript:;">Delete</a></li></ul></div></div></div></div></div>';
};
if (goog.DEBUG) {
  ddl.rule.condition.soyTemplateName = 'ddl.rule.condition';
}
