define([
    'marionette',
    'views/FilterButtonCollectionView',
    'views/PartCompositeView'
], function (Marionette, FilterButtonCollectionView, PartCompositeView) {
    'use strict';

    var PartFilterLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/PartFiltersLayout.ejs'],

        regions: {
            filters: '#filters-container',
            parts: '#parts-list-container'
        },

        filterButtonCollectionView: null,

        partCompositeView: null,

        onSelectedFiltersChanged: function() {
            this.partCompositeView.setFilters(this.filterButtonCollectionView.collection.selectedFilters);
        },

        onShowAllClick: function() {
            this.clearFilters();
            return false;
        },

        showPartFilters: function(filterCollection, partCollection) {
            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: filterCollection,  });
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.filters.show(this.filterButtonCollectionView);

            this.partCompositeView = new PartCompositeView({ collection: partCollection });
            this.listenTo(this.filterButtonCollectionView, 'onShowAllClick', this.onShowAllClick);
            this.parts.show(this.partCompositeView);
        },

        clearFilters: function() {
            this.filterButtonCollectionView.clearSelectedFilters();
            this.partCompositeView.setFilters(['*']);
        }
    });

    return PartFilterLayout;
});