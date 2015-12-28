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

package com.liferay.workflow.definition.web.display.context;

import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.dao.search.SearchContainer;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.HtmlUtil;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.portal.kernel.util.OrderByComparator;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.PredicateFilter;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.workflow.WorkflowDefinition;
import com.liferay.portal.kernel.workflow.WorkflowDefinitionManagerUtil;
import com.liferay.portal.theme.ThemeDisplay;
import com.liferay.workflow.definition.web.display.context.util.WorkflowDefinitionRequestHelper;
import com.liferay.workflow.definition.web.search.WorkflowDefinitionSearchTerms;
import com.liferay.workflow.definition.web.util.WorkflowDefinitionPortletUtil;
import com.liferay.workflow.definition.web.util.filter.WorkflowDefinitionNameAndTitlePredicateFilter;
import com.liferay.workflow.definition.web.util.filter.WorkflowDefinitionNameOrTitlePredicateFilter;
import com.liferay.workflow.definition.web.util.filter.WorkflowDefinitionNamePredicateFilter;
import com.liferay.workflow.definition.web.util.filter.WorkflowDefinitionTitlePredicateFilter;

import java.util.List;

import javax.portlet.RenderRequest;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Leonardo Barros
 */
public class WorkflowDefinitionDisplayContext {

	public WorkflowDefinitionDisplayContext(RenderRequest renderRequest) {
		_workflowDefinitionRequestHelper = new WorkflowDefinitionRequestHelper(
			renderRequest);
	}

	public String getActive(WorkflowDefinition workflowDefinition) {
		HttpServletRequest request =
			_workflowDefinitionRequestHelper.getRequest();

		if (workflowDefinition.isActive()) {
			return LanguageUtil.get(request, "yes");
		}

		return LanguageUtil.get(request, "no");
	}

	public String getName(WorkflowDefinition workflowDefinition) {
		return HtmlUtil.escape(workflowDefinition.getName());
	}

	public List<WorkflowDefinition> getSearchContainerResults(
			SearchContainer<WorkflowDefinition> searchContainer)
		throws PortalException {

		List<WorkflowDefinition> workflowDefinitions =
			WorkflowDefinitionManagerUtil.getWorkflowDefinitions(
				_workflowDefinitionRequestHelper.getCompanyId(),
				QueryUtil.ALL_POS, QueryUtil.ALL_POS, getOrderByComparator());

		WorkflowDefinitionSearchTerms searchTerms =
			(WorkflowDefinitionSearchTerms)searchContainer.getSearchTerms();

		workflowDefinitions = filterWorkflowDefinitions(
			workflowDefinitions, searchTerms);

		searchContainer.setTotal(workflowDefinitions.size());

		return workflowDefinitions;
	}

	public String getTitle(WorkflowDefinition workflowDefinition) {
		ThemeDisplay themeDisplay =
			_workflowDefinitionRequestHelper.getThemeDisplay();

		return HtmlUtil.escape(
			workflowDefinition.getTitle(themeDisplay.getLanguageId()));
	}

	public String getVersion(WorkflowDefinition workflowDefinition) {
		return String.valueOf(workflowDefinition.getVersion());
	}

	protected PredicateFilter<WorkflowDefinition>
		createWorkflowDefinitionPredicateFilter(
			String name, String title, boolean andOperator) {

		if (Validator.isNotNull(name) && Validator.isNotNull(title)) {
			if (andOperator) {
				return new WorkflowDefinitionNameAndTitlePredicateFilter(
					name, title);
			}
			else {
				return new WorkflowDefinitionNameOrTitlePredicateFilter(
					name, title);
			}
		}
		else if (Validator.isNotNull(name)) {
			return new WorkflowDefinitionNamePredicateFilter(name);
		}
		else {
			return new WorkflowDefinitionTitlePredicateFilter(title);
		}
	}

	protected List<WorkflowDefinition> filterWorkflowDefinitions(
		List<WorkflowDefinition> workflowDefinitions, String name, String title,
		boolean andOperator) {

		if (Validator.isNull(name) && Validator.isNull(title)) {
			return workflowDefinitions;
		}

		PredicateFilter<WorkflowDefinition> predicateFilter =
			createWorkflowDefinitionPredicateFilter(name, title, andOperator);

		return ListUtil.filter(workflowDefinitions, predicateFilter);
	}

	protected List<WorkflowDefinition> filterWorkflowDefinitions(
		List<WorkflowDefinition> workflowDefinitions,
		WorkflowDefinitionSearchTerms searchTerms) {

		if (searchTerms.isAdvancedSearch()) {
			return filterWorkflowDefinitions(
				workflowDefinitions, searchTerms.getName(),
				searchTerms.getTitle(), searchTerms.isAndOperator());
		}
		else {
			return filterWorkflowDefinitions(
				workflowDefinitions, searchTerms.getKeywords(),
				searchTerms.getKeywords(), searchTerms.isAndOperator());
		}
	}

	protected OrderByComparator<WorkflowDefinition> getOrderByComparator() {
		HttpServletRequest request =
			_workflowDefinitionRequestHelper.getRequest();

		String orderByCol = ParamUtil.getString(request, "orderByCol", "name");
		String orderByType = ParamUtil.getString(request, "orderByType", "asc");

		return WorkflowDefinitionPortletUtil.
			getWorkflowDefitionOrderByComparator(
				orderByCol, orderByType,
				_workflowDefinitionRequestHelper.getLocale());
	}

	private final WorkflowDefinitionRequestHelper
		_workflowDefinitionRequestHelper;

}