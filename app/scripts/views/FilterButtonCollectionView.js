define([
    'marionette',
    'views/FilterButtonItemView'
], function (Marionette, FilterButtonItemView) {
    'use strict';

    var FilterButtonCollectionView = Marionette.CollectionView.extend({
        attributes: { 'class': 'btn-group' },

        events: {
            'click .btn': 'onFilterClick'
        },

        itemView: FilterButtonItemView,

        onFilterClick: function(event) {
            // TODO: Use the BikeFilterModel or a button ID to access filter value instead of textContent
            var filter = event.currentTarget.textContent;
            this.trigger('onFilterClick', [filter]);
        }
    });

    return FilterButtonCollectionView;
});