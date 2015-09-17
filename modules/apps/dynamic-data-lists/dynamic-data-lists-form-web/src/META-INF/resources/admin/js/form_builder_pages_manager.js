AUI.add(
	'liferay-ddl-form-builder-pages-manager',
	function(A) {
		var Renderer = Liferay.DDM.Renderer;

		var CSS_FORM_BUILDER_CONTENT = A.getClassName('form', 'builder', 'content');

		var CSS_FORM_BUILDER_PAGE_CONTROLS = A.getClassName('form', 'builder', 'page', 'controls');

		var CSS_FORM_BUILDER_PAGE_MANAGER_ADD_PAGE_LAST_POSITION = A.getClassName('form', 'builder', 'page', 'manager', 'add', 'last', 'position');

		var CSS_FORM_BUILDER_PAGE_MANAGER_DELETE_PAGE = A.getClassName('form', 'builder', 'page', 'manager', 'delete', 'page');

		var CSS_FORM_BUILDER_PAGE_MANAGER_SWITCH_MODE = A.getClassName('form', 'builder', 'page', 'manager', 'switch', 'mode');

		var CSS_FORM_BUILDER_PAGES_CONTENT = A.getClassName('form', 'builder', 'page', 'manager', 'content');

		var CSS_FORM_BUILDER_PAGINATION = A.getClassName('form', 'builder', 'pagination');

		var CSS_FORM_BUILDER_SWITCH_VIEW = A.getClassName('form', 'builder', 'controls', 'trigger');

		var CSS_FORM_BUILDER_TABVIEW = A.getClassName('form', 'builder', 'tabview');

		var CSS_PAGE_HEADER = A.getClassName('form', 'builder', 'page', 'header');

		var FormBuilderPagesManager = A.Component.create(
			{
				ATTRS: {
					builder: {
					},

					mode: {
						validator: '_validateMode',
						value: 'pagination'
					}
				},

				CSS_PREFIX: 'form-builder-page-manager',

				NAME: 'liferay-ddl-form-builder-pages-manager',

				EXTENDS: A.FormBuilderPageManager,

				prototype: {
					TPL_PAGES: '<div class="' + CSS_FORM_BUILDER_PAGES_CONTENT + '">' +
						'<div class="' + CSS_FORM_BUILDER_PAGINATION + '">' +
							'<div class="' + CSS_FORM_BUILDER_PAGE_CONTROLS + '"></div>' +
						'</div></div>',

					TPL_PAGE_CONTROL_TRIGGER:
						'<a href="javascript:;" data-position="{position}" class="' + CSS_FORM_BUILDER_SWITCH_VIEW + '">' +
							'<span class="icon-ellipsis-vertical icon-monospaced"></span>' +
						'</a>',

					initializer: function() {
						var instance = this;

						instance.after('titlesChange', A.bind('_afterTitlesChange', instance));
					},

					_addWizardPage: function() {
						var instance = this;

						var activePageNumber = instance.get('activePageNumber');

						var wizard = instance._getWizard();

						wizard.set('selected', activePageNumber - 1);
					},

					_afterPagesQuantityChange: function(event) {
						var instance = this;

						FormBuilderPagesManager.superclass._afterPagesQuantityChange.apply(instance, arguments);

						instance._uiSetMode(instance.get('mode'));

						var pageHeader = instance.get('pageHeader');

						var switchViewNode = pageHeader.one('.' + CSS_FORM_BUILDER_SWITCH_VIEW);

						switchViewNode.toggle(event.newVal <= 1);
					},

					_afterTitlesChange: function(event) {
						var instance = this;

						instance._syncWizardItems();
					},

					_afterWizardSelectionChange: function() {
						var instance = this;

						var selectedWizard = instance._getWizard().get('selected');

						if (selectedWizard > -1) {
							var pagination = instance._getPagination();

							pagination.set('page', selectedWizard + 1);

							instance.set('activePageNumber', selectedWizard + 1);
						}
					},

					_createPopover: function() {
						var instance = this;

						var strings = instance.get('strings');

						var popover = new A.Popover(
							{
								bodyContent: A.Lang.sub(
									instance.TPL_POPOVER_CONTENT,
									{
										addPageLastPosition: strings.addPageLastPosition,
										addPageNextPosition: strings.addPageNextPosition,
										deleteCurrentPage: strings.deleteCurrentPage,
										switchMode: strings.switchMode
									}
								),
								constrain: true,
								cssClass: 'form-builder-page-manager-popover-header',
								visible: false,
								zIndex: 50
							}
						).render();

						var popoverBoundingBox = popover.get('boundingBox');

						popoverBoundingBox.one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_ADD_PAGE_LAST_POSITION).on('click', A.bind('_onAddLastPageClick', instance));
						popoverBoundingBox.one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_DELETE_PAGE).on('click', A.bind('_onRemovePageClick', instance));
						popoverBoundingBox.one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_SWITCH_MODE).on('click', A.bind('_onSwitchViewClick', instance));

						instance._createPopoverTriggers(popover);

						return popover;
					},

					_createPopoverTriggers: function(popover) {
						var instance = this;

						var builder = instance.get('builder');

						var boundingBox = builder.get('boundingBox');

						var topControlTrigger = A.Lang.sub(
							instance.TPL_PAGE_CONTROL_TRIGGER,
							{
								position: 'top'
							}
						);

						boundingBox.one('.' + CSS_FORM_BUILDER_TABVIEW).append(topControlTrigger);

						var leftControlTrigger = A.Lang.sub(
							instance.TPL_PAGE_CONTROL_TRIGGER,
							{
								position: 'left'
							}
						);

						boundingBox.one('.' + CSS_FORM_BUILDER_PAGE_CONTROLS).append(leftControlTrigger);

						instance.get('pageHeader').one('.' + CSS_PAGE_HEADER).append(leftControlTrigger);

						boundingBox.delegate('click', A.bind(instance._onPageControlOptionClick, instance), '.' + CSS_FORM_BUILDER_SWITCH_VIEW);

						boundingBox.all('.' + CSS_FORM_BUILDER_SWITCH_VIEW).on('clickoutside', popover.hide, popover);
					},

					_createWizardItems: function() {
						var instance = this;

						var activePageNumber = instance.get('activePageNumber');

						var items = [];

						var pages = instance.get('pagesQuantity');

						var titles = instance.get('titles');

						for (var i = 1; i <= pages; i++) {
							var title = titles[i - 1];

							if (!title) {
								title = instance._createUntitledPageLabel(i, pages);
							}

							items.push(
								{
									state: (activePageNumber === i) ? 'active' : '',
									title: title
								}
							);
						}

						return items;
					},

					_getWizard: function() {
						var instance = this;

						if (!instance.wizard) {
							var builder = instance.get('builder');

							var wizardNode = builder.get('boundingBox').one('.' + CSS_FORM_BUILDER_TABVIEW);

							instance.wizard = new Renderer.Wizard(
								{
									after: {
										selectedChange: A.bind(instance._afterWizardSelectionChange, instance)
									},
									allowNavigation: true,
									boundingBox: wizardNode,
									items: instance._createWizardItems(),
									srcNode: wizardNode.one('> ul')
								}
							).render();
						}

						return instance.wizard;
					},

					_onAddLastPageClick: function() {
						var instance = this;

						instance._addPage();
						instance._addWizardPage();

						instance._getPopover().hide();
					},

					_onAddPageClick: function() {
						var instance = this;

						instance._addPage();
						instance._addWizardPage();
					},

					_onPageControlOptionClick: function(event) {
						var popover = this._getPopover();

						event.stopPropagation();

						popover.set(
							'align',
							{
								node: event.currentTarget,
								points: [A.WidgetPositionAlign.RC, A.WidgetPositionAlign.TC]
							}
						);

						popover.set('position', event.currentTarget.getData('position'));

						popover.toggle();
					},

					_onRemovePageClick: function() {
						var instance = this;

						var activePageNumber = instance.get('activePageNumber');

						var pagination = instance._getPagination();

						pagination.prev();

						instance.set('pagesQuantity', instance.get('pagesQuantity') - 1);

						instance.fire(
							'remove',
							{
								removedIndex: activePageNumber - 1
							}
						);

						var page = Math.max(1, activePageNumber - 1);

						pagination.getItem(page).addClass('active');

						var titles = instance.get('titles');

						titles.splice(activePageNumber - 1, 1);

						instance.set('titles', titles);
						instance.set('activePageNumber', page);

						instance._removeWizardPage(activePageNumber - 1);

						if (!instance.get('pagesQuantity')) {
							instance._addPage();
							instance._addWizardPage();

							instance._getWizard().activate(0);
						}
					},

					_onSwitchViewClick: function() {
						var instance = this;

						instance._getPopover().hide();

						if (instance.get('mode') === 'pagination') {
							instance.set('mode', 'wizard');
						}
						else {
							instance.set('mode', 'pagination');
						}
					},

					_onTitleInputValueChange: function(event) {
						var instance = this;

						var activePageNumber = instance.get('activePageNumber');

						var title = event.newVal.trim();

						var titles = instance.get('titles');

						titles[activePageNumber - 1] = title;

						if (!title) {
							var pagesQuantity = instance.get('pagesQuantity');

							title = instance._createUntitledPageLabel(activePageNumber, pagesQuantity);
						}

						instance.set('titles', titles);
					},

					_removeWizardPage: function(index) {
						var instance = this;

						var wizard = instance._getWizard();

						wizard._removeItem(index);

						instance._syncWizardItems();
					},

					_renderTopPagination: function() {
						var instance = this;

						instance._getWizard();
					},

					_syncWizardItems: function() {
						var instance = this;

						var wizard = instance._getWizard();

						wizard.set('selected', instance.get('activePageNumber') - 1);
						wizard.set('items', instance._createWizardItems());
					},

					_uiSetMode: function(type) {
						var instance = this;

						var pagination = instance._getPagination();
						var wizard = instance._getWizard();

						var paginationBoundingBox = pagination.get('boundingBox');
						var wizardBoundingBox = wizard.get('boundingBox');

						if (instance.get('pagesQuantity') > 1) {
							if (type === 'wizard') {
								paginationBoundingBox.hide();
								wizardBoundingBox.show();

								instance._syncWizardItems();
							}
							else if (type === 'pagination') {
								paginationBoundingBox.show();
								wizardBoundingBox.hide();

								pagination.set('page', instance.get('activePageNumber'));
							}
						}
						else {
							paginationBoundingBox.hide();
							wizardBoundingBox.hide();
						}
					},

					_validateMode: function(mode) {
						return (mode === 'pagination' || mode === 'wizard');
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderPagesManager = FormBuilderPagesManager;
	},
	'',
	{
		requires: ['aui-form-builder-page-manager', 'liferay-ddm-form-renderer-wizard']
	}
);