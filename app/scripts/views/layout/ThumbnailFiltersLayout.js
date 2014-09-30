define([
    'marionette',
    'views/FilterButtonCollectionView',
    'views/ThumbnailsCompositeView',
    'collections/ButtonCollection',
    'views/ButtonCompositeView'
], function (Marionette, FilterButtonCollectionView, ThumbnailsCompositeView, ButtonCollection, ButtonCompositeView) {
    'use strict';

    var ThumbnailFiltersLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/ThumbnailFiltersLayout.ejs'],

        regions: {
            filters: '#filters-container',
            operations: '#operations-container',
            thumbnails: '#thumbnails-container'
        },

        filterButtonCollectionView: null,

        operationButtonCompositeView: null,

        thumbnailsCompositeView: null,

        onRender: function() {
            if (this.getUrlVars()['edit']) {
                this.showEditButtons();
            }
        },

        onSelectedFiltersChanged: function() {
            this.thumbnailsCompositeView.setFilters(this.filterButtonCollectionView.collection.selectedFilters);
        },

        onShowAllClick: function() {
            this.clearFilters();
            return false;
        },

        onThumbnailClick: function(itemView) {
            this.trigger('onThumbnailClick', itemView);
        },

        onOperationsButtonClick: function(event) {
            this.trigger('onOperationsButtonClick', event);
        },

        showThumbnailFilters: function(bikeFilterCollection, bikeCollection) {
            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: bikeFilterCollection });
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.filters.show(this.filterButtonCollectionView);

            this.thumbnailsCompositeView = new ThumbnailsCompositeView({ collection: bikeCollection });
            this.listenTo(this.thumbnailsCompositeView, 'onThumbnailClick', this.onThumbnailClick);
            this.thumbnails.show(this.thumbnailsCompositeView);

            this.showOperations();
        },

        showOperations: function() {
            var operationsCollection = new ButtonCollection([
                { label: 'Add New', value: 'add' }
            ]);
            this.operationButtonCompositeView = new ButtonCompositeView({ collection: operationsCollection });
            this.listenTo(this.operationButtonCompositeView, 'onButtonClick', this.onOperationsButtonClick);
            this.operations.show(this.operationButtonCompositeView);
        },

        clearFilters: function() {
            this.filterButtonCollectionView.clearSelectedFilters();
            this.thumbnailsCompositeView.setFilters(['*']);
        },

        showEditButtons: function() {
            this.$el.find('#operations-container').show();
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

    return ThumbnailFiltersLayout;
});