AUI.add(
	'liferay-ddm-form-field-datasource',
	function(A) {
		var Lang = A.Lang;

		var TPL_OPTION = '<option value="{value}">{label}</option>';

		var DatasourceField = A.Component.create(
			{
				ATTRS: {
					dataProviderURL: {
						value: '/o/ddm-data-provider'
					},

					datasources: {
						value: {}
					},

					type: {
						value: 'datasource'
					}
				},

				EXTENDS: Liferay.DDM.Renderer.Field,

				NAME: 'liferay-ddm-form-field-datasource',

				prototype: {
					initializer: function() {
						var instance = this;

						instance._eventHandlers.push(
							instance.after('datasourcesChange', instance.showDatasourcesList)
						);

						instance.loadDatasources();
					},

					getValue: function() {
						var instance = this;

						var datasource = {};

						var datasourceForm = instance.datasourceForm;

						if (datasourceForm) {
							datasource = datasourceForm.toJSON();

							var container = instance.get('container');

							var datasourcesSelectNode = container.one('.datasource-select');

							datasource.datasourceName = datasourcesSelectNode.val();
						}

						return datasource;
					},

					hideDatasourceLoader: function() {
						var instance = this;

						var container = instance.get('container');

						var datasourcesNode = container.one('.datasource-container');

						var spinnerNode = container.one('.icon-refresh');

						datasourcesNode.show();
						spinnerNode.hide();
					},

					loadDatasources: function() {
						var instance = this;

						if (!instance._loaded && !instance._loading) {
							instance.showDatasourceLoader();

							instance._loading = true;

							instance._getJSON(
								{
									cmd: 'list'
								},
								function(datasources) {
									instance.hideDatasourceLoader();

									instance.set('datasources', datasources);

									instance._loading = false;
									instance._loaded = true;
								}
							);
						}
					},

					render: function() {
						var instance = this;

						DatasourceField.superclass.render.apply(instance, arguments);

						instance.showDatasourcesList();
						instance.syncVisibility();

						return instance;
					},

					showDatasourceLoader: function() {
						var instance = this;

						var container = instance.get('container');

						var datasourcesNode = container.one('.datasource-container');

						var spinnerNode = container.one('.icon-refresh');

						datasourcesNode.hide();
						spinnerNode.show();
					},

					showDatasourcesList: function() {
						var instance = this;

						var container = instance.get('container');

						var datasources = instance.get('datasources');

						var options = [];

						if (datasources) {
							A.each(
								datasources,
								function(datasource, name) {
									options.push(
										Lang.sub(
											TPL_OPTION,
											{
												label: A.Escape.html(name),
												value: A.Escape.html(name)
											}
										)
									);
								}
							);
						}

						var datasourcesSelectNode = container.one('.datasource-select');

						datasourcesSelectNode.html(options.join(''));

						instance.showSelectedDatasourceForm(datasources);
					},

					showSelectedDatasourceForm: function(datasources) {
						var instance = this;

						var container = instance.get('container');

						var datasourcesSelectNode = container.one('.datasource-select');

						var definition = datasources[datasourcesSelectNode.val()];

						if (definition) {
							instance.datasourceForm = new Liferay.DDM.Renderer.Form(
								{
									attachFormEvents: false,
									container: container.one('.datasource-form'),
									definition: definition,
									portletNamespace: instance.get('portletNamespace'),
									templateNamespace: 'ddm.simple_form',
									values: instance._getValue()
								}
							).render();
						}
					},

					_getJSON: function(data, callback) {
						var instance = this;

						A.io.request(
							instance.get('dataProviderURL'),
							{
								data: data,
								dataType: 'JSON',
								method: 'GET',
								on: {
									failure: function() {
										callback.call(instance, null);
									},
									success: function() {
										callback.call(instance, this.get('responseData'));
									}
								}
							}
						);
					},

					_getValue: function() {
						var instance = this;

						var value = instance.get('value');

						if (value && !Lang.isObject(value)) {
							value = JSON.parse(value);
						}

						return value;
					}
				}
			}
		);

		Liferay.namespace('DDM.Field').Datasource = DatasourceField;
	},
	'',
	{
		requires: ['aui-escape', 'liferay-ddm-form-renderer-field']
	}
);