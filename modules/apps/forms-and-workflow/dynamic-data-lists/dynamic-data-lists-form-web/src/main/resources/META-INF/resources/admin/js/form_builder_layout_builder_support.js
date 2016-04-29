AUI.add(
	'liferay-ddl-form-builder-layout-builder-support',
	function(A) {
		var CSS_FIELD = A.getClassName('form', 'builder', 'field');

		var CSS_FIELD_MOVING = A.getClassName('form', 'builder', 'field', 'moving');

		var CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target');

		var CSS_FIELD_MOVE_TARGET_INVALID = A.getClassName('form', 'builder', 'field', 'move', 'target', 'invalid');

		var FormBuilderLayoutBuilderSupport = function() {
		};

		FormBuilderLayoutBuilderSupport.ATTRS = {
		};

		FormBuilderLayoutBuilderSupport.prototype = {
			_chooseColMoveTarget: function(originalFn, cutButton, col) {
				var instance = this;

				var fieldNode = instance._getFeildBeingMovedNode() || cutButton.ancestor('.' + CSS_FIELD);

				var layout = instance.getActiveLayout();

				var movingFieldCol = col || fieldNode.ancestor('.col').getData('layout-col');

				instance._setHelperPrivateMoveFieldProperties(fieldNode, movingFieldCol);

				fieldNode.addClass(CSS_FIELD_MOVING);

				instance._setInvalidTargets(fieldNode);

				originalFn(cutButton, movingFieldCol);

				instance._addColMoveTarget(movingFieldCol);

				layout.normalizeColsHeight(layout.get('node').all('.row'));

				instance._selectFirstValidMoveTarget();

				instance._createCancelMoveFieldHandles();
			},

			_clearHelperPrivateMoveFieldProperties: function() {
				var instance = this;

				delete instance._fieldBeingMoved;

				delete instance._fieldListBeingMoved;

				delete instance._fieldBeingMovedCol;
			},

			_createCancelMoveFieldHandles: function() {
				var instance = this;

				instance._cancelMoveFieldHandles = [
					A.one(A.config.doc).on('click', A.bind(instance._onClickOutsideMoveColTarget, instance)),
					A.one(A.config.doc).on('key', A.bind(instance._onEscKeyPressMoveTarget, instance), 'down:27')
				];
			},

			_enableAddFields: function() {
				this.get('layouts').forEach(
					function(layout) {
						layout.get('rows').forEach(
							function(row) {
								row.get('cols').forEach(
									function(col) {
										var fieldList = col.get('value');

										if (fieldList) {
											fieldList.set('enableAddFields', true);
										}
									}
								);
							}
						);
					}
				);
			},

			_getFeildBeingMovedNode: function() {
				var instance = this;

				var fieldNode;

				if (instance._fieldBeingMoved) {
					fieldNode = instance._fieldBeingMoved.get('container');
				}

				return fieldNode;
			},

			_onClickOutsideMoveColTarget: function() {

			},

			_onClickOutsideMoveRowTarget: function() {

			},

			_setHelperPrivateMoveFieldProperties: function(fieldNode, col) {
				var instance = this;

				instance._fieldBeingMoved = fieldNode.getData('field-instance');

				instance._fieldListBeingMoved = col.get('value');

				instance._fieldBeingMovedCol = col;
			},

			_setInvalidTargets: function(fieldNode) {
				fieldNode.all('.' + CSS_FIELD_MOVE_TARGET).addClass(CSS_FIELD_MOVE_TARGET_INVALID);

				var targetNode = fieldNode.previous('.' + CSS_FIELD_MOVE_TARGET);

				if (targetNode) {
					targetNode.addClass(CSS_FIELD_MOVE_TARGET_INVALID);
				}

				targetNode = fieldNode.next('.' + CSS_FIELD_MOVE_TARGET);
				if (targetNode) {
					targetNode.addClass(CSS_FIELD_MOVE_TARGET_INVALID);
				}
			}
		};

		Liferay.namespace('DDL').FormBuilderLayoutBuilderSupport = FormBuilderLayoutBuilderSupport;
	},
	'',
	{
		requires: []
	}
);