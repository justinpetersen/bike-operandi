define([
    'marionette',
    'views/PartListItemView'
], function (Marionette, PartListItemView) {
    'use strict';

    var PartsCollectionView = Marionette.CollectionView.extend({
    	itemView: PartListItemView
    });

    return PartsCollectionView;
});