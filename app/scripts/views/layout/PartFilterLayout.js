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

        operationButtonCollectionView: null,

        partCompositeView: null,

        onSelectedFiltersChanged: function() {
            this.partCompositeView.setFilters(this.filterButtonCollectionView.collection.selectedFilters);
        },

        onShowAllClick: function() {
            this.clearFilters();
            return false;
        },

        showPartFilters: function(filterCollection, partCollection) {
            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: filterCollection });
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.filters.show(this.filterButtonCollectionView);

            this.partCompositeView = new PartCompositeView({ collection: partCollection });
            this.listenTo(this.partCompositeView, 'onShowAllClick', this.onShowAllClick);
            this.parts.show(this.partCompositeView);

            this.showOperations();
        },

        showOperations: function() {
            var operationsCollection = new ButtonCollection([
                { label: 'Add New', value: 'add' }
            ]);
            this.operationButtonCompositeView = new ButtonCompositeView({ collection: operationsCollection });
            this.operations.show(this.operationButtonCompositeView);
        },

        clearFilters: function() {
            this.filterButtonCollectionView.clearSelectedFilters();
            this.partCompositeView.setFilters(['*']);
        }
    });

    return PartFilterLayout;
});