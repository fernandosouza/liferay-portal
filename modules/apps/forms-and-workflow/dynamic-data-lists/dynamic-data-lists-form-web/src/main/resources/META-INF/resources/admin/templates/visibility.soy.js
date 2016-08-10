// This file was automatically generated from visibility.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddl.rule.
 * @public
 */

if (typeof ddl == 'undefined') { var ddl = {}; }
if (typeof ddl.rule == 'undefined') { ddl.rule = {}; }


ddl.rule.action = function(opt_data, opt_ignored) {
  return '<li class="form-builder-rule-action-container"><div class="card card-action card-horizontal"><div class="card-row card-row-padded"><div class="card-col-content card-col-gutters"><div class="action-do-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div><div class="action-the-' + soy.$$escapeHtmlAttribute(opt_data.index) + '"></div></div></div><div class="card-col-field"><div class="dropdown"><a class="dropdown-toggle icon-monospaced" data-toggle="dropdown" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.kebab) + '</a><ul class="dropdown-menu dropdown-menu-right"><li class="action-card-edit" data-card-id="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="javascript:;">Edit</a></li><li class="action-card-delete"  data-card-id="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="javascript:;">Delete</a></li></ul></div></div></div></div>';
};
if (goog.DEBUG) {
  ddl.rule.action.soyTemplateName = 'ddl.rule.action';
}
