/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.dynamic.data.mapping.type.select;

import com.liferay.dynamic.data.mapping.model.DDMFormField;
import com.liferay.dynamic.data.mapping.model.DDMFormFieldOptions;
import com.liferay.dynamic.data.mapping.model.LocalizedValue;
import com.liferay.dynamic.data.mapping.registry.DDMFormFieldValueRenderer;
import com.liferay.dynamic.data.mapping.storage.DDMFormFieldValue;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.Validator;

import java.util.Locale;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Renato Rego
 */
@Component(immediate = true, property = "ddm.form.field.type.name=select")
public class SelectDDMFormFieldValueRenderer
	implements DDMFormFieldValueRenderer {

	@Override
	public String render(DDMFormFieldValue ddmFormFieldValue, Locale locale) {
		DDMFormField ddmFormField = ddmFormFieldValue.getDDMFormField();

		String datasourceType = (String)ddmFormField.getProperty(
			"datasourceType");

		JSONArray optionsValuesJSONArray =
			_selectDDMFormFieldValueAccessor.getValue(
				ddmFormFieldValue, locale);

		DDMFormFieldOptions ddmFormFieldOptions = getDDMFormFieldOptions(
			ddmFormFieldValue);

		StringBundler sb = new StringBundler(
			optionsValuesJSONArray.length() * 2);

		for (int i = 0; i < optionsValuesJSONArray.length(); i++) {
			if (i > 0) {
				sb.append(StringPool.COMMA_AND_SPACE);
			}

			String optionValue = optionsValuesJSONArray.getString(i);

			if (Validator.equals(datasourceType, "manually")) {
				LocalizedValue optionLabel =
					ddmFormFieldOptions.getOptionLabels(
						optionValue);

				sb.append(optionLabel.getString(locale));
			}
			else {
				sb.append(optionValue);
			}
		}

		return sb.toString();
	}

	protected DDMFormFieldOptions getDDMFormFieldOptions(
		DDMFormFieldValue ddmFormFieldValue) {

		DDMFormField ddmFormField = ddmFormFieldValue.getDDMFormField();

		return ddmFormField.getDDMFormFieldOptions();
	}

	@Reference
	protected void setSelectDDMFormFieldValueAccessor(
		SelectDDMFormFieldValueAccessor selectDDMFormFieldValueAccessor) {

		_selectDDMFormFieldValueAccessor = selectDDMFormFieldValueAccessor;
	}

	private SelectDDMFormFieldValueAccessor _selectDDMFormFieldValueAccessor;

}