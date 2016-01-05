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

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.liferay.portal.kernel.workflow.WorkflowDefinition;
import com.liferay.portal.util.PortalImpl;
import com.liferay.portal.util.PortalUtil;
import com.liferay.portlet.RenderRequestImpl;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * @author Marcellus Tavares
 */
public class WorkflowDefinitionDisplayContextTest {

	@Before
	public void setUp() {
		setUpPortalUtil();
		setUpWorkflowDefinitionDisplayContext();
		setUpWorkflowDefinitions();
	}

	@Test
	public void testFilterByKeyword1() {
		String keyword = "Single";

		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, keyword, keyword, false);

		Assert.assertEquals(1, workflowDefinitions.size());

		assertWorkflowDefinitionName(
			"Single Approver", workflowDefinitions.get(0));
	}

	@Test
	public void testFilterByKeyword2() {
		String keyword = "definition";

		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, keyword, keyword, false);

		Assert.assertEquals(2, workflowDefinitions.size());

		assertWorkflowDefinitionName(
			"Single Approver", workflowDefinitions.get(0));
		assertWorkflowDefinitionName(
			"Legal Approver", workflowDefinitions.get(1));
	}

	@Test
	public void testFilterByKeyword3() {
		String keyword = "Single legal";

		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, keyword, keyword, false);

		Assert.assertEquals(2, workflowDefinitions.size());

		assertWorkflowDefinitionName(
			"Single Approver", workflowDefinitions.get(0));
		assertWorkflowDefinitionName(
			"Legal Approver", workflowDefinitions.get(1));
	}

	@Test
	public void testFilterByKeyword4() {
		String keyword = "Not Found";

		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, keyword, keyword, false);

		Assert.assertTrue(workflowDefinitions.isEmpty());
	}

	@Test
	public void testFilterByNameAndTitle1() {
		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, "Single", "Legal", true);

		Assert.assertTrue(workflowDefinitions.isEmpty());
	}

	@Test
	public void testFilterByNameAndTitle2() {
		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, "Single", "definition", true);

		Assert.assertEquals(1, workflowDefinitions.size());

		assertWorkflowDefinitionName(
			"Single Approver", workflowDefinitions.get(0));
	}

	@Test
	public void testFilterByNameAndTitle3() {
		List<WorkflowDefinition >workflowDefinitions =
			_workflowDefinitionDisplayContext.filterWorkflowDefinitions(
				_workflowDefinitions, "Single Legal", "", true);

		Assert.assertEquals(2, workflowDefinitions.size());

		assertWorkflowDefinitionName(
			"Single Approver", workflowDefinitions.get(0));
		assertWorkflowDefinitionName(
			"Legal Approver", workflowDefinitions.get(1));
	}

	protected void assertWorkflowDefinitionName(
		String expectedWorkflowDefinitionName,
		WorkflowDefinition workflowDefinition) {

		Assert.assertEquals(
			expectedWorkflowDefinitionName, workflowDefinition.getName());
	}

	protected WorkflowDefinition createWorkflowDefinition(
		String name, String title) {

		WorkflowDefinition workflowDefinition = mock(WorkflowDefinition.class);

		whenWorkflowDefinitionGetNameThenReturn(workflowDefinition, name);
		whenWorkflowDefinitionGetTitleThenReturn(workflowDefinition, title);

		return workflowDefinition;
	}

	protected void setUpPortalUtil() {
		PortalUtil portalUtil = new PortalUtil();

		portalUtil.setPortal(new PortalImpl());
	}

	protected void setUpWorkflowDefinitionDisplayContext() {
		_workflowDefinitionDisplayContext =
			new WorkflowDefinitionDisplayContext(new RenderRequestImpl());
	}

	protected void setUpWorkflowDefinitions() {
		_workflowDefinitions = new ArrayList<>();

		_workflowDefinitions.add(
			createWorkflowDefinition("Single Approver", "Simple Definition"));
		_workflowDefinitions.add(
			createWorkflowDefinition("Legal Approver", "Legal Definition"));
	}

	protected void whenWorkflowDefinitionGetNameThenReturn(
		WorkflowDefinition workflowDefinition, String returnName) {

		when(
			workflowDefinition.getName()
		).thenReturn(
			returnName
		);
	}

	protected void whenWorkflowDefinitionGetTitleThenReturn(
		WorkflowDefinition workflowDefinition, String returnTitle) {

		when(
			workflowDefinition.getTitle()
		).thenReturn(
			returnTitle
		);
	}

	private WorkflowDefinitionDisplayContext _workflowDefinitionDisplayContext;
	private List<WorkflowDefinition> _workflowDefinitions;

}