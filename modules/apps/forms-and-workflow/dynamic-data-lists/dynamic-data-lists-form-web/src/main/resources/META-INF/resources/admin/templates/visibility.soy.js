// This file was automatically generated from visibility.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.rule.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }
if (typeof ddl.rule == 'undefined') { ddl.rule = {}; }


ddl.rule.action = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-action-container timeline-item"><div class="panel panel-default"><div class="panel-body flex-container"><h4>Do</h4><div class="form-group action-do-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="form-group action-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="timeline-increment-icon"><span class="timeline-icon"></span></div></div></div><div class="container__trash"><button type="button" class="btn btn-link action-card-delete icon-monospaced" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.deleteIcon) + '</button></div></li>';
};
if (goog.DEBUG) {
  ddl.rule.action.soyTemplateName = 'ddl.rule.action';
}
