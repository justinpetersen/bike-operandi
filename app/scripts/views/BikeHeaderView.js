define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var BikeHeaderView = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/BikeHeader.ejs'],

		triggers: {
			'click #bike-edit-button': 'onEditClick',
			'click #bike-edit-cancel-button': 'onCancelClick',
			'click #bike-edit-save-button': 'onSaveClick',
			'click #bike-edit-delete-button': 'onDeleteClick'
		},

        onRender: function() {
            if (this.getUrlVars()['edit']) {
                this.hidePartEditForm();
            }
        },

        onModelChange: function() {
        	this.render();
        },

        onEditClick: function() {
        	this.showPartEditForm();
        },

        onCancelClick: function() {
        	this.hidePartEditForm();
        },

        onSaveClick: function() {
        	this.saveFormValues();
        },

        initialize: function() {
        	this.listenTo(this, 'onEditClick', this.onEditClick);
        	this.listenTo(this, 'onCancelClick', this.onCancelClick);
        	this.listenTo(this, 'onSaveClick', this.onSaveClick);
        	this.listenTo(this.model, 'change', this.onModelChange);
        },

        showPartEditForm: function() {
        	this.$el.find('#bike-edit-button').hide();
        	this.$el.find('#bike-edit-cancel-button').show();
        	this.$el.find('#bike-title').hide();
        	this.$el.find('#bike-edit-form').show();
        },

        hidePartEditForm: function() {
        	this.$el.find('#bike-edit-button').show();
        	this.$el.find('#bike-edit-cancel-button').hide();
        	this.$el.find('#bike-title').show();
        	this.$el.find('#bike-edit-form').hide();
        },

        saveFormValues: function() {
        	this.model.set('image', this.$el.find('#input-image').val());
        	this.model.set('title', this.$el.find('#input-title').val());
        	this.hidePartEditForm();
        },

        // TODO: Move this to router
        getUrlVars: function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    });

    return BikeHeaderView;
});