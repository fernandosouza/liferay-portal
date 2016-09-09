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
  var conditionList44 = opt_data.conditions;
  var conditionListLen44 = conditionList44.length;
  if (conditionListLen44 > 0) {
    for (var conditionIndex44 = 0; conditionIndex44 < conditionListLen44; conditionIndex44++) {
      var conditionData44 = conditionList44[conditionIndex44];
      output += ddl.rule.condition({index: conditionIndex44, deleteIcon: opt_data.deleteIcon});
    }
  } else {
    output += ddl.rule.condition({index: 0, deleteIcon: opt_data.deleteIcon});
  }
  output += '</ul><ul class="form-builder-rule-action-list">';
  var actionList54 = opt_data.actions;
  var actionListLen54 = actionList54.length;
  if (actionListLen54 > 0) {
    for (var actionIndex54 = 0; actionIndex54 < actionListLen54; actionIndex54++) {
      var actionData54 = actionList54[actionIndex54];
      output += ddl.rule.action({index: actionIndex54, deleteIcon: opt_data.deleteIcon});
    }
  } else {
    output += ddl.rule.action({index: 0, deleteIcon: opt_data.deleteIcon});
  }
  output += '</ul><button class="btn btn-lg ddl-button btn-primary btn-default form-builder-rule-settings-save" type="button"><span class="form-builder-rule-settings-save-label">' + soy.$$escapeHtml(opt_data.saveLabel) + '</span></button><button class="btn btn-lg btn-cancel btn-default btn-link form-builder-rule-settings-cancel"><span class="lfr-btn-label">' + soy.$$escapeHtml(opt_data.cancelLabel) + '</span></button>';
  return output;
};
if (goog.DEBUG) {
  ddl.rule.settings.soyTemplateName = 'ddl.rule.settings';
}


ddl.rule.condition = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-condition-container"><div class="card card-condition card-horizontal"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><div class="condition-if-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-operator-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-type-value-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="condition-type-value-options-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div></div><div class="card-col-field"><div class="dropdown"><a class="condition-card-delete icon-monospaced" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.deleteIcon) + '</a></div></div></div></div></div>';
};
if (goog.DEBUG) {
  ddl.rule.condition.soyTemplateName = 'ddl.rule.condition';
}
