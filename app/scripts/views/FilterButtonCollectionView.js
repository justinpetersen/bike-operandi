define([
    'marionette',
    'views/FilterButtonCompositeView',
    'views/FilterButtonItemView'
], function (Marionette, FilterButtonCompositeView, FilterButtonItemView) {
    'use strict';

    var FilterButtonCollectionView = Marionette.CollectionView.extend({

        attributes: { 'class': 'btn-group' },

        itemView: FilterButtonCompositeView,

        nodeItemView: FilterButtonItemView,

        events: {
            'click .btn': 'onFilterClick'
        },

        onFilterClick: function(event) {
            // TODO: Use the BikeFilterModel or a button ID to access filter value instead of textContent
            var filter = event.currentTarget.textContent;
            this.trigger('onFilterClick', [filter]);
        },

        getItemView: function(item) {
            var view = item.children ? this.itemView : this.nodeItemView;
            return view;
        }
    });

    return FilterButtonCollectionView;
});