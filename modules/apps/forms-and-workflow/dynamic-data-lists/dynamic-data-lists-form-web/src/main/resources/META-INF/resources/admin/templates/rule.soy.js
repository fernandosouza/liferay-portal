// This file was automatically generated from rule.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.rule.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }
if (typeof ddl.rule == 'undefined') { ddl.rule = {}; }


ddl.rule.settings = function(opt_data, opt_ignored) {
  var output = '<div class="top-informations"><h2 class="text-default">Apply Show and Hide Rule</h2><h4 class="text-default">Define here a condition to show or hide fields and elements from your current form.</h4></div><ul class="timeline form-builder-rule-condition-list rules-list">' + ddl.rule.rulesHeader({title: 'Condition'});
  var conditionList46 = opt_data.conditions;
  var conditionListLen46 = conditionList46.length;
  if (conditionListLen46 > 0) {
    for (var conditionIndex46 = 0; conditionIndex46 < conditionListLen46; conditionIndex46++) {
      var conditionData46 = conditionList46[conditionIndex46];
      output += ddl.rule.condition({index: conditionIndex46, deleteIcon: opt_data.deleteIcon});
    }
  } else {
    output += ddl.rule.condition({index: 0, deleteIcon: opt_data.deleteIcon});
  }
  output += '</ul>' + ddl.rule.btnAddNewTimelineItem({plusIcon: opt_data.plusIcon, cssClass: 'form-builder-rule-add-condition'}) + '<ul class="form-builder-rule-action-list timeline action-list">' + ddl.rule.rulesHeader({title: 'Actions'});
  var actionList62 = opt_data.actions;
  var actionListLen62 = actionList62.length;
  if (actionListLen62 > 0) {
    for (var actionIndex62 = 0; actionIndex62 < actionListLen62; actionIndex62++) {
      var actionData62 = actionList62[actionIndex62];
      output += ddl.rule.action({index: actionIndex62, deleteIcon: opt_data.deleteIcon});
    }
  } else {
    output += ddl.rule.action({index: 0, deleteIcon: opt_data.deleteIcon});
  }
  output += '</ul>' + ddl.rule.btnAddNewTimelineItem({plusIcon: opt_data.plusIcon, cssClass: 'form-builder-rule-add-action'}) + '<div class="form-builder-rule-builder-footer"><button class="btn btn-lg ddl-button btn-primary btn-default form-builder-rule-settings-save" type="button"><span class="form-builder-rule-settings-save-label">' + soy.$$escapeHtml(opt_data.saveLabel) + '</span></button><button type="button" class="btn btn-lg btn-cancel btn-default btn-link form-builder-rule-settings-cancel"><span class="lfr-btn-label">' + soy.$$escapeHtml(opt_data.cancelLabel) + '</span></button></div>';
  return output;
};
if (goog.DEBUG) {
  ddl.rule.settings.soyTemplateName = 'ddl.rule.settings';
}


ddl.rule.condition = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-condition-container timeline-item"><div class="panel panel-default"><div class="panel-body flex-container"><h4>If</h4><div class="form-group condition-if-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-operator-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-type-value-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-type-value-options-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="timeline-increment-icon"><span class="timeline-icon"></span></div></div></div><div class="operator panel panel-default panel-inline"><div class="panel-body text-uppercase">Or (Fixed value)</div></div><div class="container__trash"><button type="button" class="btn btn-link condition-card-delete icon-monospaced" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.deleteIcon) + '</button></div></li>';
};
if (goog.DEBUG) {
  ddl.rule.condition.soyTemplateName = 'ddl.rule.condition';
}


ddl.rule.btnAddNewTimelineItem = function(opt_data, opt_ignored) {
  return '<div class="addbutton-timeline-item"><div class="timeline-increment-icon add-condition"><a href="javascript:;" aria-role="button" class="btn btn-xs btn-primary form-builder-timeline-add-item ' + soy.$$escapeHtmlAttribute(opt_data.cssClass || '') + '">' + soy.$$filterNoAutoescape(opt_data.plusIcon) + '</a></div></div>';
};
if (goog.DEBUG) {
  ddl.rule.btnAddNewTimelineItem.soyTemplateName = 'ddl.rule.btnAddNewTimelineItem';
}


ddl.rule.rulesHeader = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="timeline-item"><div class="panel panel-default"><div class="panel-body flex-container"><div class="h4 panel-title">' + soy.$$escapeHtml(opt_data.title) + '</div><div class="btn-group dropdown" style="block"><button class="btn btn-default dropdown-toggle text-uppercase" data-toggle="dropdown" type="button">or <span class="caret"></span></button><ul class="dropdown-menu"><li class="operation-item text-uppercase"><a>or</a></li><li class="divider"></li><li class="operation-item text-uppercase"><a>and</a></li></ul></div><div class="timeline-increment-icon"><span class="timeline-icon"></span></div></div></div></li>');
};
if (goog.DEBUG) {
  ddl.rule.rulesHeader.soyTemplateName = 'ddl.rule.rulesHeader';
}
