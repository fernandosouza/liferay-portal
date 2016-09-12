// This file was automatically generated from rule.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.rule.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }
if (typeof ddl.rule == 'undefined') { ddl.rule = {}; }


ddl.rule.settings = function(opt_data, opt_ignored) {
  var output = '<div class="top-informations"><h2 class="text-default">Apply Show and Hide Rule</h2><h4 class="text-default">Define here a condition to show or hide fields and elements from your current form.</h4></div><ul class="liferay-ddl-form-rule-builder-timeline liferay-ddl-form-rule-builder-condition-list timeline">' + ddl.rule.rulesHeader({title: 'Condition'});
  var conditionList47 = opt_data.conditions;
  var conditionListLen47 = conditionList47.length;
  if (conditionListLen47 > 0) {
    for (var conditionIndex47 = 0; conditionIndex47 < conditionListLen47; conditionIndex47++) {
      var conditionData47 = conditionList47[conditionIndex47];
      output += ddl.rule.condition({index: conditionIndex47, deleteIcon: opt_data.deleteIcon, type: conditionData47.type});
    }
  } else {
    output += ddl.rule.condition({index: 0, deleteIcon: opt_data.deleteIcon});
  }
  output += '</ul>' + ddl.rule.btnAddNewTimelineItem({plusIcon: opt_data.plusIcon, cssClass: 'form-builder-rule-add-condition'}) + '<ul class="action-list liferay-ddl-form-rule-builder-timeline liferay-ddl-form-rule-builder-action-list timeline">' + ddl.rule.rulesHeader({title: 'Actions'});
  var actionList63 = opt_data.actions;
  var actionListLen63 = actionList63.length;
  if (actionListLen63 > 0) {
    for (var actionIndex63 = 0; actionIndex63 < actionListLen63; actionIndex63++) {
      var actionData63 = actionList63[actionIndex63];
      output += ddl.rule.action({index: actionIndex63, deleteIcon: opt_data.deleteIcon});
    }
  } else {
    output += ddl.rule.action({index: 0, deleteIcon: opt_data.deleteIcon});
  }
  output += '</ul>' + ddl.rule.btnAddNewTimelineItem({plusIcon: opt_data.plusIcon, cssClass: 'form-builder-rule-add-action'}) + '<div class="liferay-ddl-form-rule-builder-footer"><button class="btn btn-lg ddl-button btn-primary btn-default form-builder-rule-settings-save" type="button"><span class="form-builder-rule-settings-save-label">' + soy.$$escapeHtml(opt_data.saveLabel) + '</span></button><button type="button" class="btn btn-lg btn-cancel btn-default btn-link form-builder-rule-settings-cancel"><span class="lfr-btn-label">' + soy.$$escapeHtml(opt_data.cancelLabel) + '</span></button></div>';
  return output;
};
if (goog.DEBUG) {
  ddl.rule.settings.soyTemplateName = 'ddl.rule.settings';
}


ddl.rule.condition = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-condition-container-' + soy.$$escapeHtmlAttribute(opt_data.index) + ' timeline-item"><div class="panel panel-default"><div class="panel-body flex-container"><h4>If</h4><div class="form-group condition-if-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-operator-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-type-value-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group condition-type-value-options-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="timeline-increment-icon"><span class="timeline-icon"></span></div></div></div><div class="operator panel panel-default panel-inline"><div class="panel-body text-uppercase">Or ' + soy.$$escapeHtml(opt_data.type) + ' (Fixed value)</div></div><div class="container__trash"><button class="btn btn-link condition-card-delete icon-monospaced" data-card-id="' + soy.$$escapeHtmlAttribute(opt_data.index) + '" href="javascript:;" type="button">' + soy.$$filterNoAutoescape(opt_data.deleteIcon) + '</button></div></li>';
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="timeline-item"><div class="panel panel-default"><div class="panel-body flex-container"><div class="h4 panel-title">' + soy.$$escapeHtml(opt_data.title) + '</div><div class="btn-group dropdown" style="block"><button class="btn btn-default dropdown-toggle text-uppercase" data-toggle="dropdown" type="button">or <span class="caret"></span></button><ul class="dropdown-menu"><li class="logic-operator text-uppercase"><a>or</a></li><li class="divider"></li><li class="logic-operator text-uppercase"><a>and</a></li></ul></div><div class="timeline-increment-icon"><span class="timeline-icon"></span></div></div></div></li>');
};
if (goog.DEBUG) {
  ddl.rule.rulesHeader.soyTemplateName = 'ddl.rule.rulesHeader';
}
