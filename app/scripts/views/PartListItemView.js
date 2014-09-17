define([
    'views/PartItemView'
], function (PartItemView) {
    'use strict';

    var PartListItemView = PartItemView.extend({
        attributes: { 'class': 'part-container part-container-sm col-xs-12' },

        hidePartEditForm: function() {
        	this.$el.find('#part-add-button').show();
        	this.$el.find('#part-title').show();
        },

		triggers: {
			'click #part-add-button': 'onAddClick'
		}
    });

    return PartListItemView;
});