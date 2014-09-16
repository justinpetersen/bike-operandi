define([
    'marionette',
    'views/PartListItemView'
], function (Marionette, PartListItemView) {
    'use strict';

    var PartListCollectionView = Marionette.CollectionView.extend({
    	itemView: PartListItemView
    });

    return PartListCollectionView;
});