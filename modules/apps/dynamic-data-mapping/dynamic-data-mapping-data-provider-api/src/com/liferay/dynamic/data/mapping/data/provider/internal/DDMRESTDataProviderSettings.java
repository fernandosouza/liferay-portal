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

package com.liferay.dynamic.data.mapping.data.provider.internal;

import com.liferay.dynamic.data.mapping.data.provider.DDMDataProviderSettings;
import com.liferay.dynamic.data.mapping.registry.annotations.DDMForm;
import com.liferay.dynamic.data.mapping.registry.annotations.DDMFormField;

import org.osgi.service.component.annotations.Component;

/**
 * @author Marcellus Tavares
 */
@Component(immediate = true, property = "ddm.data.provider.name=rest")
public class DDMRESTDataProviderSettings implements DDMDataProviderSettings {

	@Override
	public Class<?> getSettings() {
		return RESTSettings.class;
	}

	@DDMForm
	public interface RESTSettings {

		@DDMFormField(label="Service URL")
		public String url();

		@DDMFormField(label = "Auth Login")
		public String username();

		@DDMFormField(label="Auth Password")
		public String password();

		@DDMFormField(
			label = "Value",
			tip = "Which key do you want to display in the array of objects the JSON service returns?"
		)
		public String value();

	}

}