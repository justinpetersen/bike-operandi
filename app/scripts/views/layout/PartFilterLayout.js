define([
    'marionette',
    'views/FilterButtonCollectionView',
    'views/PartCompositeView',
    'collections/ButtonCollection',
    'views/ButtonCompositeView'
], function (Marionette, FilterButtonCollectionView, PartCompositeView, ButtonCollection, ButtonCompositeView) {
    'use strict';

    var PartFilterLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/PartFiltersLayout.ejs'],

        regions: {
            filters: '#filters-container',
            operations: '#operations-container',
            parts: '#parts-list-container'
        },

        filterButtonCollectionView: null,

        operationButtonCompositeView: null,

        partCompositeView: null,

        onRender: function() {
            if (this.getUrlVars()['edit']) {
                this.showEditButtons();
            }
        },

        onSelectedFiltersChanged: function() {
            this.partCompositeView.setFilters(this.filterButtonCollectionView.collection.selectedFilters);
        },

        onShowAllClick: function() {
            this.clearFilters();
            return false;
        },

        onOperationsButtonClick: function(event) {
            this.trigger('onOperationsButtonClick', event);
        },

        showPartFilters: function(filterCollection, partCollection) {
            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: filterCollection });
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.filters.show(this.filterButtonCollectionView);

            this.partCompositeView = new PartCompositeView({ collection: partCollection });
            this.parts.show(this.partCompositeView);

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
            this.partCompositeView.setFilters(['*']);
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

    return PartFilterLayout;
});