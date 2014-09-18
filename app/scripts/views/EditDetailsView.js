define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var EditDetailsView = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/EditDetails.ejs'],

		triggers: {
			'click #bike-edit-save-button': 'onSaveClick',
            'click #bike-edit-cancel-button': 'onCancelClick'
		},

        onModelChange: function() {
        	this.render();
        },

        onCancelClick: function() {
            this.trigger('onCancel');
        },

        onSaveClick: function() {
        	this.saveFormValues();

            this.trigger('onSave');
        },

        initialize: function() {
        	this.listenTo(this, 'onCancelClick', this.onCancelClick);
        	this.listenTo(this, 'onSaveClick', this.onSaveClick);
        	this.listenTo(this.model, 'change', this.onModelChange);
        },

        saveFormValues: function() {
        	this.model.set('image', this.$el.find('#input-image').val());
        	this.model.set('title', this.$el.find('#input-title').val());
        }
    });

    return EditDetailsView;
});