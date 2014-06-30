define([
    'marionette',
    'views/PartItemView'
], function (Marionette, PartItemView) {
    'use strict';

    var PartsCollectionView = Marionette.CollectionView.extend({
        itemView: PartItemView
    });

    return PartsCollectionView;
});