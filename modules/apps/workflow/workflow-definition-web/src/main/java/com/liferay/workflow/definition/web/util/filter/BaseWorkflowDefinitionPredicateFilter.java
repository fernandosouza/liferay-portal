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

package com.liferay.workflow.definition.web.util.filter;

import com.liferay.portal.kernel.util.PredicateFilter;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.workflow.WorkflowDefinition;

/**
 * @author Marcellus Tavares
 */
public abstract class BaseWorkflowDefinitionPredicateFilter
	implements PredicateFilter<WorkflowDefinition> {

	protected boolean containsIgnoreCase(String s1, String s2) {
		if ((s1 == null) || (s2 == null)) {
			return false;
		}

		s1 = normalize(s1);
		s2 = normalize(s2);

		for (String sequence : StringUtil.split(s2, StringPool.SPACE)) {
			if (s1.contains(sequence)) {
				return true;
			}
		}

		return false;
	}

	protected String normalize(String s) {
		s = StringUtil.trim(s);
		s = StringUtil.toLowerCase(s);

		return s;
	}

}