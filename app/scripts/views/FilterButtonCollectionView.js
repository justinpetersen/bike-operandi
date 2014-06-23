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

        getItemView: function(item) {
            var view = item.children ? this.itemView : this.nodeItemView;
            return view;
        }
    });

    return FilterButtonCollectionView;
});