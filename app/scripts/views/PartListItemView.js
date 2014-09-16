define([
    'views/PartItemView'
], function (PartItemView) {
    'use strict';

    var PartListItemView = PartItemView.extend({
        attributes: { 'class': 'part-container part-container-sm col-xs-12' },

        hidePartEditForm: function() {
        	// this.$el.find('#part-edit-button').show();
        	this.$el.find('#part-edit-cancel-button').hide();
        	this.$el.find('#part-title').show();
        	this.$el.find('#part-edit-form').hide();
        },
    });

    return PartListItemView;
});