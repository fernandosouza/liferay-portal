// This file was automatically generated from select.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ddm.
 * @hassoydeltemplate {ddm.field}
 * @public
 */

if (typeof ddm == 'undefined') { var ddm = {}; }


ddm.__deltemplate_s2_2dbfb377 = function(opt_data, opt_ignored) {
  return '' + ddm.select(opt_data);
};
if (goog.DEBUG) {
  ddm.__deltemplate_s2_2dbfb377.soyTemplateName = 'ddm.__deltemplate_s2_2dbfb377';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ddm.field'), 'select', 0, ddm.__deltemplate_s2_2dbfb377);


ddm.select = function(opt_data, opt_ignored) {
  var output = '<div class="form-group' + soy.$$escapeHtmlAttribute(opt_data.visible ? '' : ' hide') + '" data-fieldname="' + soy.$$escapeHtmlAttribute(opt_data.name) + '"><div class="input-select-wrapper">' + ((opt_data.showLabel) ? '<label class="control-label" for="' + soy.$$escapeHtmlAttribute(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.label) + ((opt_data.required) ? '<span class="icon-asterisk text-warning"></span>' : '') + '</label>' + ((opt_data.tip) ? '<p class="liferay-ddm-form-field-tip">' + soy.$$escapeHtml(opt_data.tip) + '</p>' : '') : '') + '<div class="input-group-container form-builder-select-field">';
  var selectedValue__soy26 = '' + ((! opt_data.readOnly) ? soy.$$escapeHtml(opt_data.strings.chooseAnOption) : (opt_data.options.length) ? soy.$$escapeHtml(opt_data.options[0].value) : '');
  output += (! opt_data.multiple) ? '<a class="select-field-single-chosen" href="javascript:;" dir="' + soy.$$escapeHtmlAttribute(opt_data.dir) + '" id="' + soy.$$escapeHtmlAttribute(opt_data.name) + '" name="' + soy.$$escapeHtmlAttribute(opt_data.name) + '"><span class="option-selected">' + soy.$$escapeHtml(selectedValue__soy26) + '</span></a>' : '';
  if (! opt_data.readOnly) {
    output += '<div class="drop-chosen hide"><div class="search-chosen"><div class="select-search-container">' + ((opt_data.selecteSearchIcon) ? '<a class="" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.selecteSearchIcon) + '</a>' : '') + '</div><input placeholder="Search" class="drop-chosen-search" type="text" autocomplete="off"></div><ul class="results-chosen">';
    var optionList69 = opt_data.options;
    var optionListLen69 = optionList69.length;
    for (var optionIndex69 = 0; optionIndex69 < optionListLen69; optionIndex69++) {
      var optionData69 = optionList69[optionIndex69];
      var selected__soy56 = '';
      var currentValueList60 = opt_data.value;
      var currentValueListLen60 = currentValueList60.length;
      for (var currentValueIndex60 = 0; currentValueIndex60 < currentValueListLen60; currentValueIndex60++) {
        var currentValueData60 = currentValueList60[currentValueIndex60];
        selected__soy56 += (currentValueData60 == optionData69.value) ? 'selected' : '';
      }
      output += '<li class="' + soy.$$escapeHtmlAttribute(selected__soy56 ? 'option-selected' : '') + '" data-option-index="' + soy.$$escapeHtmlAttribute(optionIndex69) + '">' + soy.$$escapeHtml(optionData69.value) + '</li>';
    }
    output += '</ul></div>';
  }
  output += '<select class="form-control hide" dir="' + soy.$$escapeHtmlAttribute(opt_data.dir) + '" ' + ((opt_data.readOnly) ? 'disabled' : '') + ' id="' + soy.$$escapeHtmlAttribute(opt_data.name) + '" name="' + soy.$$escapeHtmlAttribute(opt_data.name) + '" ' + ((opt_data.multiple) ? 'multiple size="' + soy.$$escapeHtmlAttribute(opt_data.options.length) + '"' : '') + '>' + ((! opt_data.readOnly) ? '<option dir="' + soy.$$escapeHtmlAttribute(opt_data.dir) + '" disabled ' + ((opt_data.value.length == 0) ? 'selected' : '') + ' value="">' + soy.$$escapeHtml(opt_data.strings.chooseAnOption) + '</option>' : '');
  var optionList115 = opt_data.options;
  var optionListLen115 = optionList115.length;
  for (var optionIndex115 = 0; optionIndex115 < optionListLen115; optionIndex115++) {
    var optionData115 = optionList115[optionIndex115];
    var selected__soy100 = '';
    var currentValueList104 = opt_data.value;
    var currentValueListLen104 = currentValueList104.length;
    for (var currentValueIndex104 = 0; currentValueIndex104 < currentValueListLen104; currentValueIndex104++) {
      var currentValueData104 = currentValueList104[currentValueIndex104];
      selected__soy100 += (currentValueData104 == optionData115.value) ? 'selected' : '';
    }
    output += '<option dir="' + soy.$$escapeHtmlAttribute(opt_data.dir) + '" ' + soy.$$filterHtmlAttributes(selected__soy100) + ' value="' + soy.$$escapeHtmlAttribute(optionData115.value) + '">' + soy.$$escapeHtml(optionData115.label) + '</option>';
  }
  output += '</select>' + ((opt_data.selecteAngleDownIcon) ? '<a class="select-arrow-down-container" href="javascript:;">' + soy.$$filterNoAutoescape(opt_data.selecteAngleDownIcon) + '</a>' : '') + '</div>' + ((opt_data.childElementsHTML) ? soy.$$filterNoAutoescape(opt_data.childElementsHTML) : '') + '</div></div>';
  return output;
};
if (goog.DEBUG) {
  ddm.select.soyTemplateName = 'ddm.select';
}
