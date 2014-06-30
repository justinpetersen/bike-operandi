define([
    'marionette',
    'views/PartListItemView'
], function (Marionette, PartListItemView) {
    'use strict';

    var PartsCollectionView = Marionette.CollectionView.extend({
    	tagName: 'table',

    	attributes: { 'class': 'table table-condensed' },

        itemView: PartListItemView
    });

    return PartsCollectionView;
});