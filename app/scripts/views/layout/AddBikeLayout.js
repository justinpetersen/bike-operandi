define([
    'jquery',
    'marionette',
    'views/FilterButtonCollectionView',
    'collections/BikeCollection'
], function ($, Marionette, FilterButtonCollectionView, BikeCollection) {
    'use strict';

    var AddBikeLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/AddBikeLayout.ejs'],

        regions: {
            filters: '#filters-container'
        },

        bikeCollection: null,

        queueEditBike: false,

        filterButtonCollectionView: null,

        triggers: {
            'click #bike-add-save-button': 'onSaveClick',
            'click #bike-add-cancel-button': 'onCancelClick'
        },

        onSaveClick: function() {
            if (this.saveFormValues()) {
                this.queueEditBike = true;
                this.$el.find('#add-bike-modal').modal('hide');
            }
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

        showModal: function(bikeFilterCollection, bikeCollection) {
            this.bikeCollection = bikeCollection;
            this.$el.find('#add-bike-modal').modal('show');

            this.showBikeFilters(bikeFilterCollection);
        },

        showBikeFilters: function(bikeFilterCollection) {
            var prunedBikeFilterCollection = bikeFilterCollection.pruneShowAll();
            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: prunedBikeFilterCollection });
            this.filters.show(this.filterButtonCollectionView);
        },

        saveFormValues: function() {
            if (!this.validateFormValues()) {
                return false;
            }

            var id = parseInt(this.bikeCollection.at(this.bikeCollection.length - 1).get('id')) + 1;
            var tags = this.filterButtonCollectionView.collection.selectedFilters.join(',');
            this.bikeCollection.add({
                title: this.$el.find('#input-title').val(),
                image: this.$el.find('#input-image').val(),
                tags: tags,
                id: id
            });

            return true;
        },

        validateFormValues: function() {
            if (this.$el.find('#input-title').val().length == 0) {
                return false;
            }
            
            if (this.$el.find('#input-image').val().length == 0) {
                return false;
            }

            return true;
        }
    });

    return AddBikeLayout;
});