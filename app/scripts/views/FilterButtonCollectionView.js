define([
    'marionette',
    'views/FilterButtonItemView'
], function (Marionette, FilterButtonItemView) {
    'use strict';

    var FilterButtonCollectionView = Marionette.CollectionView.extend({
        attributes: { 'class': 'btn-group' },

        itemView: FilterButtonItemView
    });

    return FilterButtonCollectionView;
});