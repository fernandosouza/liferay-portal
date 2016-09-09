// This file was automatically generated from visibility.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.rule.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }
if (typeof ddl.rule == 'undefined') { ddl.rule = {}; }


ddl.rule.action = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-action-container-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><div class="card card-action card-horizontal"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><div class="action-do-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="action-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div></div></div><div class="card-col-field"><div class="dropdown"><a class="action-card-delete icon-monospaced" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.deleteIcon) + '</a></div></div></div></div>';
};
if (goog.DEBUG) {
  ddl.rule.action.soyTemplateName = 'ddl.rule.action';
}
