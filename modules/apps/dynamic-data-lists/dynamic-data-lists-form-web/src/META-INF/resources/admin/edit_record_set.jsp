<%--
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
--%>

<%@ include file="/admin/init.jsp" %>

<%
String redirect = ParamUtil.getString(request, "redirect");

DDLRecordSet recordSet = ddlFormAdminDisplayContext.getRecordSet();

long recordSetId = BeanParamUtil.getLong(recordSet, request, "recordSetId");
long groupId = BeanParamUtil.getLong(recordSet, request, "groupId", scopeGroupId);
long ddmStructureId = BeanParamUtil.getLong(recordSet, request, "DDMStructureId");
String name = BeanParamUtil.getString(recordSet, request, "name");
String description = BeanParamUtil.getString(recordSet, request, "description");
%>

<portlet:actionURL name="addRecordSet" var="addRecordSetURL">
	<portlet:param name="mvcPath" value="/admin/edit_record_set.jsp" />
</portlet:actionURL>

<portlet:actionURL name="updateRecordSet" var="updateRecordSetURL">
	<portlet:param name="mvcPath" value="/admin/edit_record_set.jsp" />
</portlet:actionURL>

<c:if test="<%= (recordSet != null) && Validator.isNotNull(recordSet.getPublishedURL()) %>">
	<div class="alert alert-info">
		Form published at: <a href="<%= recordSet.getPublishedURL() %>" target="_PARENT"><%= recordSet.getPublishedURL() %></a>
		<span class="icon-external-link"></span>
	</div>
</c:if>

<div class="portlet-forms" id="<portlet:namespace />formContainer">
	<aui:form action="<%= (recordSet == null) ? addRecordSetURL : updateRecordSetURL %>" cssClass="ddl-form-builder-form" method="post" name="editForm">
		<aui:input name="redirect" type="hidden" value="<%= redirect %>" />
		<aui:input name="recordSetId" type="hidden" value="<%= recordSetId %>" />
		<aui:input name="groupId" type="hidden" value="<%= groupId %>" />
		<aui:input name="ddmStructureId" type="hidden" value="<%= ddmStructureId %>" />
		<aui:input name="TypeSettingsProperties--singlePortletApplication--" type="hidden" value="<%= new PortletInstance(DDLFormPortletKeys.DYNAMIC_DATA_LISTS_FORM).toString() %>" />
		<aui:input name="publish" type="hidden" value="false" />

		<liferay-ui:error exception="<%= RecordSetNameException.class %>" message="please-enter-a-valid-form-name" />
		<liferay-ui:error exception="<%= StructureDefinitionException .class %>" message="please-enter-a-valid-form-definition" />
		<liferay-ui:error exception="<%= StructureLayoutException .class %>" message="please-enter-a-valid-form-layout" />

		<aui:fieldset cssClass="ddl-form-basic-info">
			<div class="container-fluid-1280">
				<h1>
					<liferay-ui:input-editor contents="<%= HtmlUtil.escape(LocalizationUtil.getLocalization(name, themeDisplay.getLanguageId())) %>" cssClass="ddl-form-name" editorName="alloyeditor" name="nameEditor" placeholder="name" showSource="<%= false %>" />
				</h1>

				<aui:input name="name" type="hidden" />

				<h2>
					<liferay-ui:input-editor contents="<%= HtmlUtil.escape(LocalizationUtil.getLocalization(description, themeDisplay.getLanguageId())) %>" cssClass="ddl-form-description" editorName="alloyeditor" name="descriptionEditor" placeholder="description" showSource="<%= false %>" />
				</h2>

				<aui:input name="description" type="hidden" />
			</div>
		</aui:fieldset>

		<aui:fieldset cssClass="container-fluid-1280 ddl-form-builder-app">
			<aui:input name="definition" type="hidden" />
			<aui:input name="layout" type="hidden" />

			<div id="<portlet:namespace />formBuilder">
				<span class="icon-refresh icon-spin" id="<portlet:namespace />loader"></span>
			</div>
		</aui:fieldset>

		<div class="container-fluid-1280">
			<aui:button-row cssClass="ddl-form-builder-buttons">
				<aui:button cssClass="btn-lg" id="submit" onClick='<%= renderResponse.getNamespace() + "save(false);" %>' primary="<%= true %>" value='<%= LanguageUtil.get(request, "save") %>' />

				<aui:button cssClass="btn-lg" onClick='<%= renderResponse.getNamespace() + "save(true);" %>' value='<%= LanguageUtil.get(request, "saveAndPublish") %>' />

				<aui:button cssClass="btn-lg" href="<%= redirect %>" name="cancelButton" type="cancel" />
			</aui:button-row>
		</div>
		<aui:script>
			var initHandler = Liferay.after(
				'form:registered',
				function(event) {
					if (event.formName === '<portlet:namespace />editForm') {
						var fieldTypes = <%= ddlFormAdminDisplayContext.getDDMFormFieldTypesJSONArray() %>;

						var fieldModules = _.map(
							fieldTypes,
							function(item) {
								return item.javaScriptModule;
							}
						);

						Liferay.provide(
							window,
							'<portlet:namespace />init',
							function() {
								Liferay.DDM.Renderer.FieldTypes.register(fieldTypes);

								new Liferay.DDL.Portlet(
									{
										definition: <%= ddlFormAdminDisplayContext.getSerializedDDMForm() %>,
										layout: <%= ddlFormAdminDisplayContext.getSerializedDDMFormLayout() %>,
										namespace: '<portlet:namespace />'
									}
								);
							},
							['liferay-ddl-portlet'].concat(fieldModules)
						);

						<portlet:namespace />init();
					}
				}
			);

			var clearPortletHandlers = function(event) {
				if (event.portletId === '<%= portletDisplay.getRootPortletId() %>') {
					initHandler.detach();

					Liferay.detach('destroyPortlet', clearPortletHandlers);
				}
			};

			Liferay.on('destroyPortlet', clearPortletHandlers);
		</aui:script>
	</aui:form>
</div>
<aui:script>
	function <portlet:namespace />save(publish) {
		if (publish) {
			<portlet:namespace />editForm.<portlet:namespace />publish.value = 'true';
		}
		else {
			<portlet:namespace />editForm.<portlet:namespace />publish.value = 'false';
		}

		<portlet:namespace />editForm.submit();
	}
</aui:script>