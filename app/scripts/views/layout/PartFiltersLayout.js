define([
    'marionette',
    'views/FilterButtonCollectionView',
    'views/PartsCollectionView'
], function (Marionette, FilterButtonCollectionView, PartsCollectionView) {
    'use strict';

    var PartFiltersLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/PartFiltersLayout.ejs'],

        regions: {
            filters: '#filters-container',
            parts: '#parts-list-container'
        },

        filterButtonCollectionView: null,

        partsCollectionView: null,

        onSelectedFiltersChanged: function() {
            console.log('PartFiltersLayout.onSelectedFiltersChanged: ' + this.filterButtonCollectionView.collection.selectedFilters);
        },

        showPartFilters: function(filterCollection, partCollection) {
            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: filterCollection,  });
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.filters.show(this.filterButtonCollectionView);

            this.partsCollectionView = new PartsCollectionView({ collection: partCollection });
            this.parts.show(this.partsCollectionView);
        }
    });

    return PartFiltersLayout;
});