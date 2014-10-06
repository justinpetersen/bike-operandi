define([
    'jquery',
    'marionette',
    'collections/BikeCollection'
], function ($, Marionette, BikeCollection) {
    'use strict';

    var AddBikeLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/AddBikeLayout.ejs'],

        bikeCollection: null,

        queueEditBike: false,

        triggers: {
            'click #bike-add-save-button': 'onSaveClick',
            'click #bike-add-cancel-button': 'onCancelClick'
        },

        onSaveClick: function() {
            this.saveFormValues();

            this.queueEditBike = true;
            this.$el.find('#add-bike-modal').modal('hide');
        },

        onCancelClick: function() {
            this.$el.find('#add-bike-modal').modal('hide');
        },

        onRender: function() {
            this.$el.find('#add-bike-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');

            if (this.queueEditBike) {
                this.trigger('onBikeAdded', this.bikeCollection.at(this.bikeCollection.length - 1));
                this.queueEditBike = false;
            }
        },

        initialize: function() {
            this.listenTo(this, 'onSaveClick', this.onSaveClick);
            this.listenTo(this, 'onCancelClick', this.onCancelClick);
        },

        showModal: function(bikeCollection) {
            this.bikeCollection = bikeCollection;
            this.$el.find('#add-bike-modal').modal('show');
        },

        saveFormValues: function() {
            var id = parseInt(this.bikeCollection.at(this.bikeCollection.length - 1).get('id')) + 1;
            this.bikeCollection.add({
                title: this.$el.find('#input-title').val(),
                image: this.$el.find('#input-image').val(),
                id: id
            });
        }
    });

    return AddBikeLayout;
});